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

export const GET_EMPLOYEE_DETAILS_QUERY = gql`
	query Query($employeeId: String) {
		getEmployeeDetails(employeeId: $employeeId) {
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