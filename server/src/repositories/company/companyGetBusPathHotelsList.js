const { pullAllBy, flow, map, flatten } = require('lodash/fp')
const Hotel = require('../../models/hotel')
const Company = require('../../models/company')

module.exports = async (companyId, busPathId = '') => {
  const { busPaths } = await Company.findById(companyId, { busPaths: 1 })
  const managedHotels = flow(
    pullAllBy('id')([{ id: busPathId }]),
    map('hotels'),
    flatten
  )(busPaths)
  return Hotel.find({ _id: { $nin: managedHotels } })
}
