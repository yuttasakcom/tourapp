const Agent = require('../../models/agent')
const Pkg = require('../../models/pkg')

module.exports = async agentId => {
  const agent = await Agent.findById(agentId, {
    _id: 0,
    companies: 1
  })

  return Pkg.find(
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
      priceChild: 1
    }
  ).populate({ path: 'company', select: 'email' })
}
