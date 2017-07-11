const Pkg = require('../../models/pkg')

module.exports = async (pkgId, specialPriceProps) => {
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
  return Pkg.update(find, update)
}
