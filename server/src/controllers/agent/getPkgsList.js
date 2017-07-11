const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const agentId = req.user._id
  const pkgs = await repo.agentGetPkgsList(agentId)
  const resolvedPricePkgs = pkgs.map(pkg => {
    if (pkg.specialPrices.length) {
      pkg.priceAdult = pkg.specialPrices[0].priceAdult
      pkg.priceChild = pkg.specialPrices[0].priceChild
    }
    pkg.specialPrices = undefined
    return pkg
  })
  return res.send(resolvedPricePkgs)
}
