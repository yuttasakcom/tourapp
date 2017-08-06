const moment = require('moment')

const { printer, styles } = require('../pdf')
const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const { dateStart, dateEnd } = req.query
  const companyId = req.user._id
  const bookingsSummary = await repo.companyGetBookingsSummary(
    companyId,
    dateStart,
    dateEnd
  )
  const body = []
  const headers = [
    {
      text: 'ลำดับที่',
      style: 'tableHeader',
      alignment: 'center'
    },
    {
      text: 'ชื่อแพคเกจ',
      style: 'tableHeader',
      alignment: 'center'
    },
    {
      text: 'ผู้ใหญ่',
      style: 'tableHeader',
      alignment: 'right'
    },
    {
      text: 'เด็ก',
      style: 'tableHeader',
      alignment: 'right'
    },
    {
      text: 'รวม',
      style: 'tableHeader',
      alignment: 'right'
    }
  ]
  body.push(headers)
  bookingsSummary.forEach((bookingSummary, index) => {
    body.push([
      {
        text: index + 1,
        alignment: 'center',
        style: 'tableBody'
      },
      {
        text: bookingSummary._id,
        style: 'tableBody'
      },
      {
        text: bookingSummary.totalAdult,
        alignment: 'right',
        style: 'tableBody'
      },
      {
        text: bookingSummary.totalChild,
        alignment: 'right',
        style: 'tableBody'
      },
      {
        text: bookingSummary.totalSeat,
        alignment: 'right',
        style: 'tableBody'
      }
    ])
  })
  const dateString = moment(parseInt(dateStart, 10)).format('DD/MM/YYYY')
  const dd = {
    content: [
      {
        text: `รายงานสรุปยอดการจองประจำวันที่ ${dateString}`,
        style: 'header'
      },
      {
        style: 'table',
        table: {
          widths: [40, '*', 100, 100, 100],
          body
        }
      }
    ],
    styles
  }
  const doc = printer.createPdfKitDocument(dd)
  doc.pipe(res)
  doc.end()
}
