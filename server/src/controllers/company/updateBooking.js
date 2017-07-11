const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const bookingId = req.params.id
  const bookingProps = req.body
  await repo.companyUpdateBooking(bookingId, bookingProps)
  return res.send({ message: 'Update booking completed' })
}
