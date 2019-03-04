// const csv = require('csv-parser');
// const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
// const results = [];


function suggestImgs(term) {
    // console.log('term', term.trim())
    var api = `http://www.istockphoto.com/il/photos/${term}`;
    return axios.get(api).then(res => res.data);
    // return axios.get(api)
    //     .then(res => {
    //         const $ = cheerio.load(res.data);
    //         return $('img.srp-asset-image').attr('src');
    //     });
}

module.exports = {
    suggestImgs,
}
