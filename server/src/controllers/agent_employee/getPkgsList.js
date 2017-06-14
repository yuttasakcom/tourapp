import Agent from '../../models/agent'
import Pkg from '../../models/pkg'

export const getPkgsList = async (req, res, next) => {
  const agentId = req.user.agentId

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
  return res.send(resolvedPricePkgs)
}
