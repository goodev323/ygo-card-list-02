const fs = require("fs");

const tsvToJson = (filename) => {
    const text = fs.readFileSync(`scripts/data/tsv/${filename}.tsv`, { encoding: "utf-8", flag: "r" });
    const rows = text.split("\n").map(row => row.split("\t"));
    const [keys, ...records] = rows;

    const cards = records.map(record => {
        const card = {};
        keys.forEach((key, index) => {
            const value = record[index];
            if (value != null && value !== "") {
                if (isNaN(value)) {
                    card[key] = value;
                } else {
                    card[key] = Number(value);
                }
            }
        });
        return card;
    });
    fs.writeFileSync(`src/data/${filename}.json`, JSON.stringify(cards), { encoding: "utf-8", flag: "w" });
}

tsvToJson('magics');
tsvToJson('traps');
tsvToJson('monsters');
