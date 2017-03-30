import Agent from '../../models/agent'
import Pkg from '../../models/pkg'

export default (req, res, next) => {
  const agentId = req.user.agentId

  Agent
    .findById(agentId, {
      _id: 0,
      companies: 1,
    })
    .then(agent => {
      Pkg
        .find({
          company: {
            $in: agent.companies,
          },
        }, {
          specialPrices: {
            $elemMatch: {
              agent: agentId,
            },
          },
          name: 1,
          priceAdult: 1,
          priceChild: 1,
        })
        .then(pkgs => {
          const resolvedPricePkgs = pkgs.map(pkg => {
            if (pkg.specialPrices.length) {
              pkg.priceAdult = pkg.specialPrices[0].priceAdult
              pkg.priceChild = pkg.specialPrices[0].priceChild
            }
            pkg.specialPrices = undefined
            return pkg
          })
          res.send(resolvedPricePkgs)
        })
    })
}
