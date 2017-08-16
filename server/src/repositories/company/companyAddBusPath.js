const Company = require('../../models/company')

module.exports = (companyId, busPathProps) =>
  Company.findOneAndUpdate(
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
