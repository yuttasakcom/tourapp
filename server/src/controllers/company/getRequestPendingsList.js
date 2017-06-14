import Company from '../../models/company'

export const getRequestPendingsList = async (req, res, next) => {
  const companyId = req.user._id

  const requestPendings = await Company.findById(companyId, {
    _id: 0,
    requestPendings: 1
  })
  return res.send(requestPendings)
}
