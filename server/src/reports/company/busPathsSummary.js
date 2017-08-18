const moment = require('moment')
const { map, forEach, size } = require('lodash')

const { printer, styles } = require('../pdf')
const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const companyId = req.user._id
  const { date } = req.params
  const busPathsSummary = await repo.companyGetBusPathsSummary(companyId, date)
  const dateString = moment(parseInt(date, 10)).format('DD/MM/YYYY')
  let index = 0
  const busPathsCount = size(busPathsSummary)
  const dd = {
    content: map(busPathsSummary, (tourists, busPathName) => {
      index += 1
      const body = []
      const headers = [
        {
          text: 'ลำดับที่',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'ห้อง',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'โรงแรม',
          style: 'tableHeader'
        },
        {
          text: 'ชื่อ',
          style: 'tableHeader'
        },
        {
          text: 'โทรศัพท์',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'ผู้ใหญ่',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'เด็ก',
          style: 'tableHeader',
          alignment: 'center'
        },
        {
          text: 'สัญชาติ',
          style: 'tableHeader',
          alignment: 'center'
        }
      ]
      body.push(headers)
      forEach(tourists, (tourist, i) => {
        body.push([
          {
            text: i + 1,
            style: 'tableBody'
          },
          {
            text: tourist.roomNumber,
            style: 'tableBody'
          },
          {
            text: tourist.hotel.name,
            style: 'tableBody',
            alignment: 'left'
          },
          {
            text: tourist.name,
            style: 'tableBody',
            alignment: 'left'
          },
          {
            text: tourist.phoneNumber,
            style: 'tableBody'
          },
          {
            text: tourist.adult,
            style: 'tableBody'
          },
          {
            text: tourist.child,
            style: 'tableBody'
          },
          {
            text: tourist.nationality,
            style: 'tableBody'
          }
        ])
      })
      return [
        {
          text: `${busPathName === 'undefined'
            ? 'ตกหล่น (ยังไม่ได้จัดรถ)'
            : busPathName} ${dateString}`,
          style: 'header'
        },
        {
          style: 'table',
          table: {
            widths: [40, 40, 150, '*', 100, 40, 40, 60],
            body
          },
          pageBreak: busPathsCount === index ? false : 'after'
        }
      ]
    }),
    pageOrientation: 'landscape',
    styles
  }
  const doc = printer.createPdfKitDocument(dd)
  doc.pipe(res)
  doc.end()
}
