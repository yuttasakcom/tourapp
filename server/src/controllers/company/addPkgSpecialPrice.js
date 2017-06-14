import Pkg from '../../models/pkg'

export const addPkgSpecialPrice = async (req, res, next) => {
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
  const exist = await Pkg.count(find)
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
  await Pkg.update(find, update)
  return res.send({
    message: 'Offer special price completed'
  })
}
