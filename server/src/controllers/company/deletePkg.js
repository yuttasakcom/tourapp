import Pkg from '../../models/pkg'

export const deletePkg = async (req, res, next) => {
  const pkgId = req.params.id

  await Pkg.remove({ _id: pkgId })
  return res.send({ message: 'Delete package completed' })
}
