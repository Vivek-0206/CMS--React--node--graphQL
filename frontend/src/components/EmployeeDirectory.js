import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {GET_EMPLOYEE_LIST_QUERY} from '../graphql/Queries'
import Cards from './Cards'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingSpinner from './LoadingSpinner'
import EmployeeSearch from './EmployeeSearch'

const EmployeeDirectory = () => {
	const [employeeList, setEmployeeList] = useState([])
	const {loading, error, data} = useQuery(GET_EMPLOYEE_LIST_QUERY)

	useEffect(() => {
		if (data) {
			setEmployeeList(data.getAllEmployee)
		}
	}, [data])

	if (loading) return <LoadingSpinner />
	// If error occurs console log the error
	if (error) console.log('--> Error :', error)

	return (
		<>
			<EmployeeSearch />
			<br />
			<Row>
				{employeeList.length > 0 ? (
					employeeList.map((employee) => (
						<Col key={employee.id}>
							<Cards employee={employee} />
						</Col>
					))
				) : (
					<p>No employee found</p>
				)}
			</Row>
		</>
	)
}

export default EmployeeDirectory
