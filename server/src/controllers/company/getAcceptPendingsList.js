import Company from '../../models/company'

export default (req, res, next) => {
  const companyId = req.user._id

  Company.findById(companyId, { _id: 0, acceptPendings: 1 })
    .then(acceptPendings => {
      res.send(acceptPendings)
    })
}
