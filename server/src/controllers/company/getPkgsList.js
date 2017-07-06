const Pkg = require('../../models/pkg')

module.exports = async (req, res, next) => {
  const companyId = req.user._id

  const pkgs = await Pkg.find({ company: companyId })
  res.set('Content-Range', pkgs.length)
  return res.send(pkgs)
}
