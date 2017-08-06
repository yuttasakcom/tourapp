const moment = require('moment')

const { printer, styles } = require('../pdf')
const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const dd = {
    content: [
      {
        text: 'TOUR VOUCHER',
        fontSize: 24,
        bold: true
      },
      {
        columns: [
          [
            { text: 'อ่าวนางทราเวล', fontSize: 20, bold: true },
            {
              text: `ที่อยู่: 320 จังหวัดกระบี่
                     อีเมล์: paiboon@gmail.com
                     เบอร์โทรศัพท์: 021234567`,
              fontSize: 16
            }
          ],
          {
            text: 'Booking Number: 4305',
            fontSize: 22,
            bold: true,
            alignment: 'right'
          }
        ]
      },
      {
        style: 'table',
        table: {
          widths: [150, 50, 50, '*'],
          body: [
            [
              {
                text: '\nวันที่/เวลา',
                rowSpan: 2,
                style: 'tableHeader'
              },
              {
                text: 'จำนวน',
                colSpan: 2,
                style: 'tableHeader'
              },
              {},
              {
                text: '\nแพ็คเกจ',
                rowSpan: 2,
                style: 'tableHeader'
              }
            ],
            [
              {},
              {
                text: 'ผู้ใหญ่',
                style: 'tableHeader'
              },
              {
                text: 'เด็ก',
                style: 'tableHeader'
              },
              {}
            ],
            [
              {
                text: '20/07/2017 13:00',
                style: 'tableBody'
              },
              {
                text: 3,
                style: 'tableBody'
              },
              {
                text: 2,
                style: 'tableBody'
              },
              {
                text: 'ทัวร์ 4 เกาะ',
                style: 'tableBody'
              }
            ]
          ]
        }
      },
      {
        text: 'ไปรับที่: โรงแรมภูเก็ต',
        fontSize: 16
      },
      {
        style: 'table',
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                text: `ออกโดย: นายไพบูลย์ อึ้งคงคาทอง
                       โทรศัพท์: 024283192
                       มือถือ: 0859979860`,
                style: 'tableBody',
                alignment: 'left'
              },
              {
                text: '\n\nออก ณ วันที่: 13/07/17',
                style: 'tableBody',
                alignment: 'right'
              }
            ]
          ]
        }
      }
    ],
    pageSize: 'a5',
    pageOrientation: 'landscape',
    styles
  }
  const doc = printer.createPdfKitDocument(dd)
  res.setHeader('Content-Type', 'application/pdf')
  doc.pipe(res)
  doc.end()
}
