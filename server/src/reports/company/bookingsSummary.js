const PDFDocument = require('pdfkit')
const path = require('path')

const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const doc = new PDFDocument()
  doc
    .font(path.join(__dirname, '../fonts/THSarabunNew/THSarabunNew.ttf'))
    .fontSize(25)
    .text('ภาษาไทย', 100, 100)
  doc.pipe(res)
  doc.end()
}
