import {Modal} from 'react-bootstrap'
import {useMutation} from '@apollo/client'
import {useNavigate} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import React, {useState, useEffect} from 'react'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Toast from 'react-bootstrap/Toast'

import {DELETE_EMPLOYEE_MUTATION} from '../graphql/Mutations'
import {GET_EMPLOYEE_LIST_QUERY} from '../graphql/Queries'
import LoadingSpinner from './LoadingSpinner'

const Admin = () => {
	const navigate = useNavigate()
	const [show, setShow] = useState(false)
	// State to store the employee id
	const [employeeId, setEmployeeId] = useState('')

	const [isDeletable, setIsDeletable] = useState(false)

	// State to store the success and error messages
	const [isSuccess, setIsSuccess] = useState(false)

	// For Toast messages
	const [toastSuccess, setToastSuccess] = useState(true)
	const [toastDelete, setToastDelete] = useState(true)

	// For modal open and close
	const handleClose = () => {
		setShow(false)
		setEmployeeId('')
	}
	const handleShow = (employee) => {
		if (employee.currentStatus) {
			setIsDeletable(true)
		} else {
			setShow(true)
			setEmployeeId(employee.id)
		}
	}

	// For delete employee
	const [deleteEmployee, {d_error}] = useMutation(DELETE_EMPLOYEE_MUTATION)

	// Get all employees
	const [employeeList, setEmployeeList] = useState([])
	const {loading, error, data} = useQuery(GET_EMPLOYEE_LIST_QUERY)

	// Set employee list to state
	useEffect(() => {
		if (data) {
			setEmployeeList(data.getAllEmployee)
		}
	}, [data])

	if (loading) return <LoadingSpinner />
	// If error occurs console log the error
	if (error) {
		console.log('--> Error :', error)
	}

	const handleDelete = () => {
		deleteEmployee({
			variables: {
				employeeId: employeeId,
			},

			// Update the cache to remove the employee from the list
			update(cache) {
				cache.modify({
					fields: {
						getAllEmployee(existingEmployees = [], {readField}) {
							return existingEmployees.filter(
								(employeeRef) =>
									employeeId !== readField('id', employeeRef)
							)
						},
					},
				})
			},

			// Display a success toast message
			onCompleted: () => {
				setIsSuccess(true)
				handleClose()
			},

			// Display an error toast message
			onError: (error) => {
				handleClose()
				console.log('--> Error :', error)
			},
		})

		// If error occurs console log the error
		if (d_error) {
			console.log('--> Error :', d_error)
		}
	}

	// Return the list of employees in table format
	return (
		<>
			<Container>
				{isDeletable && (
					<Toast
						bg='dark'
						show={toastDelete}
						onClose={() => setToastDelete(false)}
						delay={3000}
						autohide
					>
						<Toast.Header>
							<strong className='me-auto'>Not Allowed</strong>
						</Toast.Header>
						<Toast.Body className='text-white'>
							CAN'T DELETE EMPLOYEE - STATUS ACTIVE.
						</Toast.Body>
					</Toast>
				)}
				{isSuccess && (
					<Toast
						bg='dark'
						show={toastSuccess}
						onClose={() => setToastSuccess(false)}
						delay={3000}
						autohide
					>
						<Toast.Header>
							<strong className='me-auto'> Success </strong>
						</Toast.Header>
						<Toast.Body className='text-white'>
							Employee Deleted Successfully
						</Toast.Body>
					</Toast>
				)}
				<Modal
					show={show}
					onHide={handleClose}
					backdrop='static'
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Delete employee</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure you want to delete this employee?
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						<Button variant='primary' onClick={handleDelete}>
							Delete
						</Button>
					</Modal.Footer>
				</Modal>
				<Row>
					<Col>
						<h1>Employee Directory - admin page</h1>
						<hr />
					</Col>
				</Row>
				<Row>
					{employeeList.length > 0 ? (
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Id</th>
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
								{employeeList.map((employee) => (
									<tr key={employee.id}>
										<td>
											<Button
												variant='link'
												onClick={() =>
													navigate(
														'/employee-details'.concat(
															'/' + employee.id
														)
													)
												}
											>
												{employee.id}
											</Button>
										</td>
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
											<Button
												variant='danger'
												onClick={() =>
													handleShow(employee)
												}
											>
												Delete
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					) : (
						<Col>
							<h3>No employees found</h3>
						</Col>
					)}
				</Row>
			</Container>
		</>
	)
}

export default Admin
