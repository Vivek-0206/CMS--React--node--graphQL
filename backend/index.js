const express = require('express')
//for database
const mongoose = require('mongoose')

//connect to database
//mongodb database
mongoose
	.connect(
		'mongodb+srv://admin:admin@cluster1.rgcl4jk.mongodb.net/Employee?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
		}
	)
	.then(() => console.log('--> MongoDB Connected'))
	.catch((error) => console.log('--> ERROR: ', error))

const app = express()
const port = 5000

//middleware
app.use(express.json())

//routes
// app.use('/api/employee', require('./routes/employee'))

app.listen(port, () => {
	console.log(`--> Server is listening at http://localhost:${port}`)
})
