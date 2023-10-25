require('dotenv').config()
const xml2js = require('xml2js');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const OpenAI = require('openai');
const zlib = require('zlib');
const { loadImage } = require('canvas');

function xml_to_js(xmlString) {
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

    const pdfPage = pdfPages[0]; 

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




async function compressFile(inputFilePath, compressedFilePath) {
  try {
    const inputBuffer = await fs.promises.readFile(inputFilePath);
    const compressedBuffer = zlib.deflateSync(inputBuffer);
    await fs.promises.writeFile(compressedFilePath, compressedBuffer);
  } catch (err) {
    console.error(err);
  }
}
const Ajv = require('ajv');

function validateJson(jsonObject, jsonSchema) {
  const ajv = new Ajv();
  const validate = ajv.compile(jsonSchema);
  const isValid = validate(jsonObject);

  if (!isValid) {
    console.error('JSON validation error: ', validate.errors);
    return false;
  }

  return true;
}


async function imageToPdf(imageFilePath, pdfFilePath) {
  try {
    const image = await loadImage(imageFilePath);
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });

    const pdfBytes = await pdfDoc.save();
    await fs.promises.writeFile(pdfFilePath, pdfBytes);
  } catch (err) {
    console.error(err);
  }
}
const json2csv = require('json2csv').parse;

function jsonToCsv(jsonObject, csvFilePath) {
  try {
    const csv = json2csv(jsonObject);
    fs.writeFileSync(csvFilePath, csv);
  } catch (err) {
    console.error(err);
  }
}
const csv = require('csvtojson');

async function csvToJson(csvFilePath) {
  try {
    const jsonArray = await csv().fromFile(csvFilePath);
    return jsonArray;
  } catch (err) {
    console.error(err);
  }
}
//AI functions
console.log(process.env.APIKEY)
const apiKey = process.env.APIKEY
if (!apiKey) {
  console.log("------------------------------");
  process.exit(1); // Exit the application
}

const openai = new OpenAI({ apiKey: apiKey });


async function chatWithGPT(question) {
  try {
    const response = await openai.completions.create({
      engine: 'text-davinci-002',
      prompt: question,
      max_tokens: 150,
    });

    return response.choices[0].text;
  } catch (error) {
    console.error('Error communicating with ChatGPT:', error);
    return 'An error occurred while talking to ChatGPT.';
  }
}

const userQuestion = "What is the capital of France?";
chatWithGPT(userQuestion)
  .then(response => {
    console.log('ChatGPT response:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });


module.exports = {
  xml_to_js,
  excel2pdf,
  compressFile,
  validateJson,
  imageToPdf,
  jsonToCsv,
  csvToJson
};
