const axios = require("axios");

(async () => {
    const res = await axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php?name=A Cell Incubator");
    console.log(res.data.data[0].card_images[0].image_url_small);
})();