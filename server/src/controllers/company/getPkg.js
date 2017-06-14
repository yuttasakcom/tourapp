import Pkg from '../../models/pkg'

export const getPkg = async (req, res, next) => {
  const pkgId = req.params.id

  try {
    const pkg = await Pkg.findById(pkgId)
    return res.send(pkg)
  } catch (e) {
    return next(e)
  }
}
