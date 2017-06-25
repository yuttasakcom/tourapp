import Company from '../../models/company'

export const getRequestPendingsList = async (req, res, next) => {
  const companyId = req.user._id

  const requestPendings = await Company.findById(companyId, {
    _id: 0,
    requestPendings: 1
  }).populate('requestPendings', 'email')
  return res.send(requestPendings)
}
