const Company = require('../../models/company')

module.exports = (companyId, busPathProps) =>
  Company.update(
    { _id: companyId, 'busPaths.name': { $ne: busPathProps.name } },
    {
      $push: {
        busPaths: busPathProps
      }
    }
  )
