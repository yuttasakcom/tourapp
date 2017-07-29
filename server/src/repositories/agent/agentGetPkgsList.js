const Agent = require('../../models/agent')
const Pkg = require('../../models/pkg')

module.exports = async agentId => {
  const agent = await Agent.findById(agentId, {
    _id: 0,
    companies: 1
  })

  const pkgs = await Pkg.find(
    {
      company: {
        $in: agent.companies
      }
    },
    {
      specialPrices: {
        $elemMatch: {
          agent: agentId
        }
      },
      company: 1,
      name: 1,
      priceAdult: 1,
      priceChild: 1,
      priceAdultRecommended: 1,
      priceChildRecommended: 1
    }
  ).populate({ path: 'company', select: 'email name' })
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
