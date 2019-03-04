const csv = require('csv-parser');
const fs = require('fs');
const request = require('request');
const results = [];


function loadCSV(csvFile) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFile)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                // console.log(results);
                resolve(results);
                // [
                //   { NAME: 'Daffy Duck', AGE: '24' },
                //   { NAME: 'Bugs Bunny', AGE: '22' }
                // ]
            });
    })
}

function download(url, fileName) {
    return new Promise((resolve, reject) => {
        request.head(url, (err, res, body) => {
            request(url)
                .pipe(fs.createWriteStream(fileName))
                .on('close', resolve)
                .on('error', reject)
        });
    })
};

module.exports = {
    loadCSV,
    download
}
