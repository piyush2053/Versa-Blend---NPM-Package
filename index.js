const xml2js = require('xml2js');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}


function xml2js(xmlString) {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();
    parser.parseString(xmlString, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


async function excel2pdf(excelFilePath, pdfFilePath) {
  try {
    const existingPdfBytes = await fs.promises.readFile(excelFilePath);

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pdfPages = pdfDoc.getPages();

    const pdfPage = pdfPages[0]; // Assuming you want to add content to the first page

    pdfPage.drawText('Hello, PDF!', {
      x: 50,
      y: 50,
      size: 30,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    await fs.promises.writeFile(pdfFilePath, pdfBytes);
  } catch (err) {
    console.error(err);
  }
}


// Export the functions
module.exports = {
  sum,
  multiply,
  xml2js,
  excel2pdf,
  // Add more functions here as needed
};
