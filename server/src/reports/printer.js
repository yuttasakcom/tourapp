const PdfMakePrinter = require('pdfmake')
const path = require('path')

const fontDescriptors = {
  Roboto: {
    normal: path.join(__dirname, 'fonts/THSarabunNew/THSarabunNew.ttf'),
    bold: path.join(__dirname, 'fonts/THSarabunNew/THSarabunNew-Bold.ttf'),
    italics: path.join(__dirname, 'fonts/THSarabunNew/THSarabunNew-Italic.ttf'),
    bolditalics: path.join(
      __dirname,
      'fonts/THSarabunNew/THSarabunNew-BoldItalic.ttf'
    )
  }
}
module.exports = new PdfMakePrinter(fontDescriptors)
