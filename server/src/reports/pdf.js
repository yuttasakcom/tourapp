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
exports.printer = new PdfMakePrinter(fontDescriptors)
exports.styles = {
  header: {
    fontSize: 24,
    bold: true,
    margin: [0, 0, 0, 10]
  },
  subheader: {
    fontSize: 16,
    bold: true,
    margin: [0, 10, 0, 5]
  },
  table: {
    margin: [0, 5, 0, 15]
  },
  tableHeader: {
    bold: true,
    fontSize: 16,
    color: 'black',
    alignment: 'center'
  },
  tableBody: {
    fontSize: 14,
    alignment: 'center'
  }
}
