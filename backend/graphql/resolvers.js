const Employee = require('../models/employee')

const resolvers = {
	Query: {
		hello: () => 'Hello World',
		getAllEmployee: async () => {
			try {
				return await Employee.find()
			} catch (err) {
				console.log('--> Error :', err)
			}
		},

		getEmployeeById: async (parent, args, context, info) => {
			try {
				return await Employee.findById(args.employeeId)
			} catch (err) {
				console.log('--> Error :', err)
			}
		},

		getEmployeeByEmployeeType: async (parent, args, context, info) => {
			try {
				return await Employee.find({
					employeeType: args.employeeType,
				})
			} catch (err) {
				console.log('--> Error :', err)
			}
		},
	},
	Mutation: {
		// Create Employee
		createEmployee: async (parent, args, context, info) => {
			try {
				const {dateOfJoining} = args.employeeDetails
				const employee = new Employee({
					...args.employeeDetails,
					dateOfJoining: new Date(dateOfJoining),
				})
				return await employee.save()
			} catch (err) {
				console.log('--> Error :', err)
			}
		},
		// Update Employee
		updateEmployee: async (parent, args, context, info) => {
			try {
				const employee = await Employee.findByIdAndUpdate(
					args.employeeId,
					{
						...args.employeeDetails,
					},
					{new: true}
				)
				return employee
			} catch (err) {
				console.log('--> Error :', err)
			}
		},
		// Delete Employee
		deleteEmployee: async (parent, args, context, info) => {
			try {
				const employee = await Employee.findByIdAndDelete(
					args.employeeId
				)
				return employee
			} catch (err) {
				console.log('--> Error :', err)
			}
		},
	},
}

module.exports = {resolvers}
