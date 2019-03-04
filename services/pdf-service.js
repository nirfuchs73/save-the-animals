const PDFDocument = require('pdfkit');
const fs = require('fs');

function buildAnimalsPDF(animals, filename = 'SaveTheAnimals.pdf') {
    // Create a document
    const doc = new PDFDocument;

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(filename));
    animals.map((animal, idx) => {
        doc.image(`imgs/${animal.name}.png`, 100, 200 * idx, {
            fit: [250, 300],
            align: 'center',
            valign: 'center'
        });
    });

    doc.end();
}

module.exports = {
    buildAnimalsPDF
}
