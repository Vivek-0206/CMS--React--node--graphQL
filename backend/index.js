const express = require('express')

//for database
const mongoose = require('mongoose')

// Apollo Server
const {ApolloServer} = require('apollo-server-express')
const {typeDefs} = require('./graphql/typeDefs')
const {resolvers} = require('./graphql/resolvers')

const port = 5000

const startServer = async () => {
	const app = express()

	const server = new ApolloServer({
		typeDefs,
		resolvers,
	})

	await server.start()

	server.applyMiddleware({app})

	await mongoose.connect('MONGODB_URL')

	app.listen(port, () => {
		console.log(`--> Server is listening at http://localhost:${port}`)
	})
}

try {
	startServer()
} catch (err) {
	console.log('--> Error :', err)
}
