import Pkg from '../../models/pkg'

export const addPkg = (req, res, next) => {
  const companyId = req.user._id
  req.body.company = companyId
  const pkgProps = req.body

  Pkg.create(pkgProps).then(pkg => {
    res.status(201).send(pkg)
  })
}
