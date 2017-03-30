import Pkg from '../../models/pkg'

export default (req, res, next) => {
  const pkgId = req.params.id

  Pkg.remove({ _id: pkgId })
    .then(() => {
      res.send({ message: 'Delete package completed' })
    })
}
