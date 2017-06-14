import Company from '../../models/company'

export const getRequestPendingsList = (req, res, next) => {
  const companyId = req.user._id

  Company.findById(companyId, {
    _id: 0,
    requestPendings: 1
  }).then(requestPendings => {
    res.send(requestPendings)
  })
}
