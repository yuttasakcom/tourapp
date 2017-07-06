const Pkg = require('../../models/pkg')

module.exports = async (req, res, next) => {
  const { pkgId, agentId } = req.params
  await Pkg.update(
    { _id: pkgId },
    {
      $pull: {
        specialPrices: { agent: agentId }
      }
    }
  )
  res.send({ message: 'Reset price completed' })
}
