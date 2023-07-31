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
		getEmployeeById(employeeId: ID): Employee
		getEmployeeByEmployeeType(employeeType: String): [Employee]
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

	input EmployeeUpdateInput {
		id: ID
		title: String
		department: String
		currentStatus: Boolean
	}

	type Mutation {
		createEmployee(employeeDetails: EmployeeInput): Employee
		updateEmployee(
			employeeId: ID
			employeeDetails: EmployeeUpdateInput
		): Employee
		deleteEmployee(employeeId: ID): Employee
	}
`

module.exports = {typeDefs}
