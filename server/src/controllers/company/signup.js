import Company from '../../models/company'
import generateToken from './generateToken'
import { checkEmailExist, hashPassword } from '../../helpers/authentication'

export const signup = async (req, res, next) => {
  const companyProps = req.body
  const company = new Company(companyProps)
  const validationErr = company.validateSync()

  if (validationErr) {
    const err = new Error('Must provide email and password')
    err.status = 422
    return next(err)
  }

  try {
    const exist = await checkEmailExist('Company', company.email)

    if (exist) {
      const err = new Error('Email is in use')
      err.status = 422
      return next(err)
    }

    const hash = await hashPassword(company.password)
    company.password = hash
    const resCompany = await company.save()

    return res
      .status(201)
      .send({ token: generateToken(resCompany), _id: resCompany._id })
  } catch (e) {
    return next(e)
  }
}
