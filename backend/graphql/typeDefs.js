const {gql} = require('apollo-server-express')

const typeDefs = gql`
	scalar Date

	type Employee {
		id: ID
		firstName: String
		lastName: String
		age: Int
		dateOfJoining: Date
		title: String
		department: String
		employeeType: String
		currentStatus: Boolean
	}

	type Query {
		hello: String
		getAllEmployee: [Employee]
	}

	input EmployeeInput {
		firstName: String
		lastName: String
		age: Int
		dateOfJoining: Date
		title: String
		department: String
		employeeType: String
		currentStatus: Boolean
	}

	type Mutation {
		createEmployee(employeeDetails: EmployeeInput): Employee
	}
`

module.exports = {typeDefs}
