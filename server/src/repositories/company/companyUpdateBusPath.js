const Company = require('../../models/company')

module.exports = async (companyId, busPathProps) => {
  const company = await Company.findOneAndUpdate(
    { _id: companyId, 'busPaths._id': busPathProps._id },
    { $set: { 'busPaths.$': busPathProps } },
    {
      projection: { busPaths: { $elemMatch: { _id: busPathProps._id } } },
      new: true
    }
  )
  return company ? company.busPaths[0] : null
}
