import Pkg from '../../models/pkg'

export default (req, res, next) => {
  const pkgId = req.params.id
  const pkgProps = req.body

  Pkg
    .findByIdAndUpdate(pkgId, {
      $set: pkgProps,
    }, {
      new: true,
    })
    .then(pkg => {
      res.send(pkg)
    })
    .catch(next)
}
