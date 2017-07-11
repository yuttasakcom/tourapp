const repo = require('../../repositories')

module.exports = async (req, res, next) => {
  const { pkgId } = req.params
  const specialPriceProps = req.body
  await repo.companyAddPkgSpecialPrice(pkgId, specialPriceProps)
  return res.send({
    message: 'Offer special price completed'
  })
}
