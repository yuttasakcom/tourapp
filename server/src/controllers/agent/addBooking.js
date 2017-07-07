const Agent = require('../../classes/Agent')

module.exports = async (req, res, next) => {
  const agent = new Agent(req.user._id)
  const bookingProps = req.body

  try {
    const booking = await agent.book(bookingProps)
    return res.send(booking)
  } catch (e) {
    return next(e)
  }
}
