import {gql} from '@apollo/client'

export const GET_EMPLOYEE_LIST_QUERY = gql`
	query Query {
		getAllEmployee {
			id
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

export const GET_EMPLOYEE_BY_ID = gql`
	query Query($employeeId: ID!) {
		getEmployeeById(employeeId: $employeeId) {
			id
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

export const GET_EMPLOYEE_BY_EMPLOYEE_TYPE = gql`
	query Query($employeeType: String!) {
		getEmployeeByEmployeeType(employeeType: $employeeType) {
			id
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