const Pkg = require('../../models/pkg')

module.exports = async (companyId, agentId) => {
  const pkgs = await Pkg.find(
    { company: companyId },
    {
      specialPrices: {
        $elemMatch: {
          agent: agentId
        }
      },
      name: 1,
      priceAdult: 1,
      priceChild: 1
    }
  )

  const resolvedPricePkgs = pkgs.map(pkg => {
    if (pkg.specialPrices.length) {
      pkg.priceAdult = pkg.specialPrices[0].priceAdult
      pkg.priceChild = pkg.specialPrices[0].priceChild
    }
    pkg.specialPrices = undefined
    return pkg
  })
  return resolvedPricePkgs
}
