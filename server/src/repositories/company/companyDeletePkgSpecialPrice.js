const Pkg = require('../../models/pkg')

module.exports = (pkgId, agentId) =>
  Pkg.update(
    { _id: pkgId },
    {
      $pull: {
        specialPrices: { agent: agentId }
      }
    }
  )
