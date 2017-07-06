const { notify } = require('../helper')

module.exports = async (socket, _id) => {
  notify(socket, 'deleteRelationship', _id)
}
