const { notify } = require('../helper')

module.exports = async (socket, _id) => {
  notify(socket, 'request', _id)
}
