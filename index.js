const app = require('./app')
const logger = require('morgan')

app.use(logger('dev'))

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log('API listening on port:', port)
})
