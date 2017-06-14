import Pkg from '../../models/pkg'

export const addPkg = async (req, res, next) => {
  const companyId = req.user._id
  req.body.company = companyId
  const pkgProps = req.body

  const pkg = await Pkg.create(pkgProps)
  return res.status(201).send(pkg)
}
