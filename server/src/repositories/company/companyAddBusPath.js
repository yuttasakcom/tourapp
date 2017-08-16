const Company = require('../../models/company')

module.exports = async (companyId, busPathProps) => {
  const company = await Company.findOneAndUpdate(
    { _id: companyId, 'busPaths.name': { $ne: busPathProps.name } },
    {
      $push: {
        busPaths: busPathProps
      }
    },
    {
      projection: { busPaths: { $elemMatch: { name: busPathProps.name } } },
      new: true
    }
  )
  return company ? company.busPaths[0] : null
}
