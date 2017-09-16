const Pkg = require('mongoose').model('Pkg')

module.exports = (pkgId, agentId) =>
  Pkg.update(
    { _id: pkgId },
    {
      $pull: {
        specialPrices: { agent: agentId }
      }
    }
  )
