import Company from '../../models/company'

export const getAcceptPendingsList = async (req, res, next) => {
  const companyId = req.user._id

  const acceptPendings = await Company.findById(companyId, {
    _id: 0,
    acceptPendings: 1
  })
  return res.send(acceptPendings)
}
