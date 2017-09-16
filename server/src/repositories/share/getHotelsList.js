const Hotel = require('mongoose').model('Hotel')

module.exports = () => Hotel.find()
