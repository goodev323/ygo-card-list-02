import puppeteer from "puppeteer-core";

/**
 * Puppeteerを利用するオブジェクト
 * 外部の関心毎はpuppeteer.Pageだけのため、それ以外の操作はこのクラスでラップする。
 */
export default class PuppeteerMain {
  private browser?: puppeteer.Browser;

  private page?: puppeteer.Page;

  public async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  public async getPuppeeerPage() {
    if(!process.env['PUPPETEER_EXECUTABLE_PATH']) {
      throw new Error("[PUPPETEER_EXECUTABLE_PATH]を設定してください。")
    }
    if (this.page) {
      return this.page;
    }
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        args: ["--incognito", "--no-sandbox", '--lang=en-US'],
        executablePath: process.env['PUPPETEER_EXECUTABLE_PATH'],
      });
    }
    const newPage = await this.browser.newPage();
    return newPage;
  }

  public getBrowser = () => {
    return this.browser;
  };
}
