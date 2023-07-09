const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
	firstName: String,
	lastName: String,
	age: Number,
	dateOfJoining: Date,
	title: String,
	department: String,
	employeeType: String,
	currentStatus: Boolean,
})

module.exports = mongoose.model('Employee', employeeSchema)
