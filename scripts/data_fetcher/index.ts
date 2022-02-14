import fs from "fs";
import { Page } from "puppeteer-core";
import PuppeteerMain from "./PuppeteerMain";

const SEARCH_MENU_SELECTOR =
  "#topmenu_set > div.menu_top > div:nth-child(1) > div > a";
const SEARCH_BUTTON_SELECTOR =
  "#search_by_keyword_and_type > table > tbody > tr > td:nth-child(5) > a";
const NEXT_BUTTON_SELECTOR =
  "#article_body > table > tbody > tr > td > div.page_num > span > a:last-child";

const fetchListRecords = async (page: Page) => {
  await page.waitForSelector("ul.box_list", { timeout: 5000 });
  const data = await page.$$eval("ul.box_list > li", (elements) => {
    return elements.map((li) => {
      const link = li.querySelector("input")?.value?.trim();
      const id = link?.substring(link?.indexOf("cid=") + 4, link?.length);
      const dl = li.querySelector("dl");

      const nameBox = dl?.querySelector(".box_card_name");
      const nameKana = nameBox?.querySelector("span")?.textContent?.trim();
      const name = nameBox
        ?.querySelector(".card_status > strong")
        ?.textContent?.trim();

      const text = dl?.querySelector(".box_card_text")?.textContent?.trim();

      const specBox = dl?.querySelector(".box_card_spec");
      const cardType = specBox
        ?.querySelector(".box_card_attribute>span")
        ?.textContent?.trim();
      if (cardType === "罠" || cardType === "魔法") {
        const effect =
          specBox
            ?.querySelector(".box_card_effect>span")
            ?.textContent?.trim() || "-";
        return [id, name, nameKana, text, cardType, effect];
      }
      const level = specBox
        ?.querySelector(".box_card_level_rank>span")
        ?.textContent?.trim();
      const speacies = specBox
        ?.querySelector(".card_info_species_and_other_item")
        ?.textContent?.trim()
        .replaceAll("\n", "")
        .replaceAll("\t", "");
      const attack = specBox?.querySelector(".atk_power")?.textContent?.trim();
      const defence = specBox?.querySelector(".def_power")?.textContent?.trim();
      return [
        id,
        name,
        nameKana,
        text,
        cardType,
        level,
        speacies,
        attack,
        defence,
      ];
    });
  });
  return data;
};

(async () => {
  const puppeteer = new PuppeteerMain();
  try {
    const page = await puppeteer.getPuppeeerPage();
    // TOPページの検索ボタンを押下
    await page.goto("https://www.db.yugioh-card.com/yugiohdb/", {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector(SEARCH_MENU_SELECTOR, { timeout: 5000 });
    await page.click(SEARCH_MENU_SELECTOR);
    // 検索ページで除外項目を指定
    await page.waitForSelector(SEARCH_BUTTON_SELECTOR, { timeout: 5000 });
    await page.click(
      "#search_by_jogai > div > div > div.search_btn > a:nth-child(5)"
    );
    await page.click(
      "#search_by_jogai > div > div > div.search_btn > a:nth-child(6)"
    );
    await page.click(
      "#search_by_jogai > div > div > div.search_btn > a:nth-child(11)"
    );
    await page.click(
      "#search_by_jogai > div > div > div.search_btn > a:nth-child(13)"
    );
    await page.click(
      "#search_by_jogai > div > div > div.search_btn > a:nth-child(14)"
    );

    // 検索ページでモンスターを指定
    // await page.waitForSelector('#dk_container_ctype > a', {timeout: 5000});
    // await page.click('#dk_container_ctype > a');
    // await page.waitForSelector('#dk_container_ctype > div > ul > li:nth-child(2) > a', {timeout: 5000});
    // await page.click('#dk_container_ctype > div > ul > li:nth-child(2) > a');

    // 検索ボタンを押下
    await page.click(SEARCH_BUTTON_SELECTOR);

    // 一覧ページで、100件表示を選択
    await page.waitForSelector("#dk_container_rp > a", { timeout: 5000 });
    await page.click("#dk_container_rp > a");
    await page.click("#dk_container_rp > div > ul > li:nth-child(3) > a");

    await page.screenshot({ path: "screenshot.png" });
    try {
      while (true) {
        const records = await fetchListRecords(page);
        const cardNames = records.map((record) =>
          record.slice(0, 2).join("\t")
        );
        // const monsters = records
        //   .filter((record) => record.length !== 6)
        //   .map((record) => record.join("\t"));
        // const others = records
        //   .filter((record) => record.length === 6)
        //   .map((record) => record.join("\t"));
        console.log(cardNames[0]);
        fs.appendFileSync(
          `scripts/data/card_en.csv`,
          cardNames.join("\n") + "\n"
        );
        // fs.appendFileSync(`scripts/data/others.csv`, others.join("\n") + "\n");
        await page.waitForSelector(NEXT_BUTTON_SELECTOR, { timeout: 5000 });
        const nextPageButtonText = await page.$eval(
          NEXT_BUTTON_SELECTOR,
          (el) => el.textContent
        );
        if (nextPageButtonText !== "»") {
          break;
        }
        await page.click(NEXT_BUTTON_SELECTOR);
      }
    } catch (e) {
      await page.screenshot({ path: "screenshot.png" });
      throw e;
    }
  } catch (e) {
    console.error(e);
  } finally {
    puppeteer.closeBrowser();
  }
})();
