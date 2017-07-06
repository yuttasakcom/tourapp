const jwt = require('jwt-simple')
const config = require('../../config')

module.exports = company => {
  const timestamp = new Date().getTime()
  return jwt.encode(
    {
      _id: company._id,
      sub: company.email,
      role: 'company',
      iat: timestamp
    },
    config.secret
  )
}
