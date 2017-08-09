const moment = require('moment')

const { printer, styles } = require('../pdf')
const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const { bookingId } = req.query
  const booking = await repo.getBooking(bookingId)
  const dd = {
    content: [
      {
        columns: [
          [
            {
              text: 'TOUR VOUCHER',
              fontSize: 24,
              bold: true
            },
            { text: booking.agent.name, fontSize: 20, bold: true },
            {
              text: `ที่อยู่: ${booking.agent.address}
                     อีเมล์: ${booking.agent.email}
                     โทรศัพท์: ${booking.agent.phoneNumber}`,
              fontSize: 16
            }
          ],
          {
            qr: bookingId,
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
                text: moment(booking.tourist.date).format('DD/MM/YYYY HH:MM'),
                style: 'tableBody'
              },
              {
                text: booking.tourist.adult,
                style: 'tableBody'
              },
              {
                text: booking.tourist.child,
                style: 'tableBody'
              },
              {
                text: booking.pkg.name,
                style: 'tableBody'
              }
            ]
          ]
        }
      },
      {
        text: `ผู้ซื้อ: ${booking.tourist.name}
        ไปรับที่: ห้อง ${booking.tourist.roomNumber} โรงแรม ${booking.tourist
          .hotel} อยู่ที่ ${booking.tourist.address}`,
        fontSize: 16
      },
      {
        style: 'table',
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                text: `ออกโดย: ${booking.agent.adminName}
                       โทรศัพท์: ${booking.agent.adminPhoneNumber}`,
                style: 'tableBody',
                alignment: 'left'
              },
              {
                text: `\n\nออกให้ ณ วันที่: ${moment(
                  booking._id.getTimestamp()
                ).format('DD/MM/YYYY')}`,
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
