import Pkg from '../../models/pkg'

export default (req, res, next) => {
  const companyId = req.user._id

  Pkg.find({ company: companyId })
    .then(pkgs => {
      res.set('Content-Range', pkgs.length)
      res.send(pkgs)
    })
}
