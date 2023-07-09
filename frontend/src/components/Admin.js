import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {GET_EMPLOYEE_LIST_QUERY} from '../graphql/Queries'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import LoadingSpinner from './LoadingSpinner'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/esm/Col'
import {useNavigate} from 'react-router-dom'

const Admin = () => {
	const navigate = useNavigate()

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

	// Return the list of employees in table format
	return (
		<>
			<Container>
				<Row>
					<Col>
						<h1>Employee Directory</h1>
					</Col>
					<Col className='text-end mt-2'>
						<Button
							variant='secondary'
							onClick={() => navigate('/add-employee')}
						>
							Add Employee
						</Button>
					</Col>
				</Row>
				<Row>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Age</th>
								<th>DateOfJoining</th>
								<th>Title</th>
								<th>Department</th>
								<th>EmployeeType</th>
								<th>CurrentStatus</th>
								<th>Edit </th>
								<th>Delete </th>
							</tr>
						</thead>
						<tbody>
							{employeeList.length > 0 ? (
								employeeList.map((employee) => (
									<tr key={employee.id}>
										<td>{employee.firstName}</td>
										<td>{employee.lastName}</td>
										<td>{employee.age}</td>
										<td>
											{
												employee.dateOfJoining.split(
													'T'
												)[0]
											}
										</td>
										<td>{employee.title}</td>
										<td>{employee.department}</td>
										<td>{employee.employeeType}</td>
										{/* If currentStatus is true then show Working*/}
										{employee.currentStatus ? (
											<td>Working</td>
										) : (
											<td>Retired</td>
										)}
										<td>
											<Button
												variant='primary'
												onClick={() =>
													navigate(
														'/edit-employee'.concat(
															'/' + employee.id
														)
													)
												}
											>
												Edit
											</Button>
										</td>
										<td>
											<Button variant='danger'>
												Delete
											</Button>
										</td>
									</tr>
								))
							) : (
								<p>No employee found</p>
							)}
						</tbody>
					</Table>
				</Row>
			</Container>
		</>
	)
}

export default Admin
