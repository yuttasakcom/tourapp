import Pkg from '../../models/pkg'

export const addPkgSpecialPrice = (req, res, next) => {
  const pkgId = req.params.pkgId
  const specialPriceProps = req.body

  let find = {
    _id: pkgId,
    'specialPrices.agent': specialPriceProps.agent
  }
  let update = {
    $set: {
      'specialPrices.$': specialPriceProps
    }
  }

  Pkg.count(find).then(exist => {
    if (!exist) {
      find = {
        _id: pkgId
      }
      update = {
        $push: {
          specialPrices: specialPriceProps
        }
      }
    }
    Pkg.update(find, update).then(() => {
      res.send({
        message: 'Offer special price completed'
      })
    })
  })
}
