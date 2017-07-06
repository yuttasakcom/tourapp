const { notify } = require('../helper')

module.exports = async (socket, _id) => {
  notify(socket, 'cancelRequest', _id)
}
