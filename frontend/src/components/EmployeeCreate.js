import {useMutation} from '@apollo/client'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import React, {useState} from 'react'
import Toast from 'react-bootstrap/Toast'

import {ADD_EMPLOYEE_MUTATION} from '../graphql/Mutations'
import {GET_EMPLOYEE_LIST_QUERY} from '../graphql/Queries'

function EmployeeCreate() {
	const navigate = useNavigate()
	// For form validation
	const [formErrors, setFormErrors] = useState(null)

	const [isSuccess, setIsSuccess] = useState(false)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [age, setAge] = useState('')
	const [dateOfJoining, setDateOfJoining] = useState('')
	const [department, setDepartment] = useState('')
	const [title, setTitle] = useState('')
	const [employeeType, setEmployeeType] = useState('')
	// default value for CurrentStatus would be 1 (working)
	const [currentStatus] = useState(true)

	const [createEmployee] = useMutation(ADD_EMPLOYEE_MUTATION)

	// For Toast messages
	const [toastSuccess, setToastSuccess] = useState(true)

	// For Handle Submit function
	const handleSubmit = (event) => {
		event.preventDefault()
		const formErrors = {
			firstName: firstName ? '' : 'firstName is required',
			lastName: lastName ? '' : 'lastName is required',
			age: age ? '' : 'age is required',
			dateOfJoining: dateOfJoining ? '' : 'dateOfJoining is required',
			department: department ? '' : 'department is required',
			title: title ? '' : 'title is required',
			employeeType: employeeType ? '' : 'employeeType is required',
			currentStatus: currentStatus ? '' : 'currentStatus is required',
		}

		setIsSuccess(false)
		setFormErrors({...formErrors})

		if (Object.values(formErrors).some((v) => v)) return

		let employeeDetails = {
			firstName,
			lastName,
			age: parseInt(age),
			dateOfJoining,
			department,
			title,
			employeeType,
			currentStatus,
		}

		createEmployee({
			variables: {
				employeeDetails,
			},

			// Update the cache
			update(cache, {data: {createEmployee}}) {
				const data = cache.readQuery({query: GET_EMPLOYEE_LIST_QUERY})
				cache.writeQuery({
					query: GET_EMPLOYEE_LIST_QUERY,
					data: {
						getAllEmployee: [
							createEmployee,
							...data.getAllEmployee,
						],
					},
				})
			},

			// Refetch the GET_EMPLOYEE_LIST_QUERY to update the list
			refetchQueries: [
				{
					query: GET_EMPLOYEE_LIST_QUERY,
				},
			],

			// Navigate to the list page
			onCompleted: () => {
				setIsSuccess(true)
				navigate('/')
			},

			// Error handling
			onError: (error) => {
				console.log('Error', error)
			},
		})
	}
	return (
		<>
			<Container>
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
							Employee Added Successfully
						</Toast.Body>
					</Toast>
				)}
				<h1> Add Employee </h1>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='formBasicFirstName'>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter First Name'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						{formErrors && formErrors.firstName && (
							<Form.Text className='text-danger'>
								{formErrors.firstName}
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicLastName'>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Last Name'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
						{formErrors && formErrors.lastName && (
							<Form.Text className='text-danger'>
								{formErrors.lastName}
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicAge'>
						<Form.Label>Age</Form.Label>
						<Form.Control
							type='number'
							placeholder='Enter Age'
							value={age}
							onChange={(e) => setAge(e.target.value)}
						/>
						{formErrors && formErrors.age && (
							<Form.Text className='text-danger'>
								{formErrors.age}
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicDOJ'>
						<Form.Label>Date Of Joining</Form.Label>
						<Form.Control
							type='date'
							placeholder='Enter Date Of Joining'
							value={dateOfJoining}
							onChange={(e) => setDateOfJoining(e.target.value)}
						/>
						{formErrors && formErrors.dateOfJoining && (
							<Form.Text className='text-danger'>
								{formErrors.dateOfJoining}
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group
						className='mb-3'
						controlId='formBasicDepartment'
					>
						<Form.Label>Department</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={department}
							onChange={(e) => setDepartment(e.target.value)}
						>
							<option>Open this select menu</option>
							<option value='IT'>IT</option>
							<option value='Marketing'>Marketing</option>
							<option value='HR'>HR</option>
							<option value='Engineering'>Engineering</option>
						</Form.Select>

						{formErrors && formErrors.department && (
							<Form.Text className='text-danger'>
								{formErrors.department}
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicTitle'>
						<Form.Label>Title</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						>
							<option>Open this select menu</option>
							<option value='Employee'>Employee</option>
							<option value='Manager'>Manager</option>
							<option value='Director'>Director</option>
							<option value='VP'>VP</option>
						</Form.Select>

						{formErrors && formErrors.title && (
							<Form.Text className='text-danger'>
								{formErrors.title}
							</Form.Text>
						)}
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicType'>
						<Form.Label>Type</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={employeeType}
							onChange={(e) => setEmployeeType(e.target.value)}
						>
							<option>Open this select menu</option>
							<option value='Full-time'>Full-Time</option>
							<option value='Part-time'>Part-Time</option>
							<option value='Contract'>Contract</option>
							<option value='Seasonal'>Seasonal</option>
						</Form.Select>

						{formErrors && formErrors.employeeType && (
							<Form.Text className='text-danger'>
								{formErrors.employeeType}
							</Form.Text>
						)}
					</Form.Group>

					{/* <Form.Group className="mb-3" controlId="formBasicCurrentStatus">
						<Form.Label>Current Status</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Current Status"
							value={currentStatus}
							onChange={(e) => setCurrentStatus(e.target.value)}
						/>

						{formErrors && formErrors.currentStatus && (
							<Form.Text className="text-danger">{formErrors.currentStatus}</Form.Text>
						)}
					</Form.Group> */}

					<Button
						variant='primary'
						type='submit'
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</Form>
			</Container>
		</>
	)
}

export default EmployeeCreate
