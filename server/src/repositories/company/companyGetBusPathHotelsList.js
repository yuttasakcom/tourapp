const { pullAllBy, flow, map, flatten } = require('lodash/fp')
const Hotel = require('../../models/hotel')
const BusPath = require('../../models/busPath')

module.exports = async (companyId, pkgId, busPathId = '') => {
  const busPaths = await BusPath.find({ company: companyId, pkg: pkgId })
  const managedHotels = flow(
    pullAllBy('id')([{ id: busPathId }]),
    map('hotels'),
    flatten
  )(busPaths)
  return Hotel.find({ _id: { $nin: managedHotels } })
}
