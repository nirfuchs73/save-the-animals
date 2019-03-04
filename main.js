
var FileService = require('./services/file-service');
var ImgService = require('./services/img-service');
var PDFService = require('./services/pdf-service');

const cheerio = require('cheerio');

FileService.loadCSV('../rareAnimals.csv')
    .then(animals => {
        // TODO: for every animal you shoud call the ImgService.suggestImgs,
        // when you get back a response, store it in the animal object
        // then return a promise that resolved when ALL img urls are set.

        // console.log(animals);
        var prms = animals.map((animal) => {
            return ImgService.suggestImgs(animal.name);
        });

        return Promise.all(prms)
            .then(res => {
                animals.map((animal, idx) => {
                    // const $ = cheerio.load(res[idx]);
                    // var url = $('img.srp-asset-image').attr('src');
                    animal.imgUrl = res[idx];
                })
                // console.log(animals);
                return Promise.resolve(animals);
            })
    })
    .then(animalsWithImgUrls => {
        // TODO: For each animal, for each of his imgUrl, download the file
        // then return a promise that resolved when ALL imgs were downloaded.
        // console.log('animalsWithImgUrls', animalsWithImgUrls);
        var prms = animalsWithImgUrls.map((animal) => {
            return FileService.download(animal.imgUrl, `imgs/${animal.name}.png`);
        });
        return Promise.all(prms)
            .then(res => {
                // console.log(res);
                return Promise.resolve(animalsWithImgUrls);
            });

    })
    .then(animalsWithImgs => {
        // TODO: Use the PDFService to build the animals
        // console.log('animalsWithImgs', animalsWithImgs);
        PDFService.buildAnimalsPDF(animalsWithImgs);
    });