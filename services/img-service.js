const axios = require('axios');
const cheerio = require('cheerio');

function suggestImgs(term) {
    var api = `http://www.istockphoto.com/il/photos/${term}`;
    // return axios.get(api).then(res => res.data);
    return axios.get(api)
        .then(res => {
            const $ = cheerio.load(res.data);
            var imgUrl = $('img.srp-asset-image').attr('src');
            return Promise.resolve(imgUrl);
        });
}

module.exports = {
    suggestImgs,
}
