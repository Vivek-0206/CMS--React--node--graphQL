import {gql} from '@apollo/client'

// Create mutation to add a new employee
export const ADD_EMPLOYEE_MUTATION = gql`
	mutation Mutation($employeeDetails: EmployeeInput) {
		createEmployee(employeeDetails: $employeeDetails) {
			firstName
			lastName
			age
			dateOfJoining
			title
			department
			employeeType
			currentStatus
		}
	}
`

// Create mutation to update an employee
export const UPDATE_EMPLOYEE_MUTATION = gql`
	mutation Mutation($employeeId: ID, $employeeDetails: EmployeeUpdateInput) {
		updateEmployee(
			employeeId: $employeeId
			employeeDetails: $employeeDetails
		) {
			id
			title
			department
			currentStatus
		}
	}
`

// Create mutation to delete an employee
export const DELETE_EMPLOYEE_MUTATION = gql`
	mutation Mutation($employeeId: ID) {
		deleteEmployee(employeeId: $employeeId) {
			id
		}
	}
`
