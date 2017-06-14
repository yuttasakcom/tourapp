import Company from '../../models/company'
import generateToken from './generateToken'
import { checkEmailExist, hashPassword } from '../../helpers/authentication'

export const signup = (req, res, next) => {
  const companyProps = req.body
  const company = new Company(companyProps)
  const validationErr = company.validateSync()
  if (validationErr) {
    const err = new Error('Must provide email and password')
    err.status = 422
    return next(err)
  }

  return checkEmailExist('Company', company.email)
    .then(exist => {
      if (exist) {
        const err = new Error('Email is in use')
        err.status = 422
        return next(err)
      }
      return hashPassword(company.password)
        .then(hash => {
          company.password = hash
          company
            .save()
            .then(resCompany =>
              res.status(201).send({ token: generateToken(resCompany) })
            )
            .catch(next)
        })
        .catch(next)
    })
    .catch(next)
}
