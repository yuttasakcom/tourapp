import Pkg from '../../models/pkg'

export default (req, res, next) => {
  const pkgId = req.params.id

  Pkg.findById(pkgId)
    .then(pkg => {
      res.send(pkg)
    })
    .catch(next)
}
