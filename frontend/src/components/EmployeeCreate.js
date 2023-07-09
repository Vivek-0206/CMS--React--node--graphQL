import {useMutation} from '@apollo/client'
import React, {useState} from 'react'
import {ADD_EMPLOYEE_MUTATION} from '../graphql/Mutations'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'

function EmployeeCreate() {
	const [formErrors, setFormErrors] = useState(null)
	const [isSuccess, setIsSuccess] = useState(false)

	const [firstName, setfirstName] = useState('')
	const [lastName, setlastName] = useState('')
	const [age, setage] = useState('')
	const [dateOfJoining, setdateOfJoining] = useState('')
	const [department, setdepartment] = useState('')
	const [title, settitle] = useState('')
	const [employeeType, setemployeeType] = useState('')
	// default value for CurrentStatus would be 1 (working)
	const [currentStatus, setcurrentStatus] = useState(true)

	const [createEmployee, {error}] = useMutation(ADD_EMPLOYEE_MUTATION)

	const [toastSuccess, settoastSuccess] = useState(true)
	const [toastError, settoastError] = useState(true)

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
		})

		if (error) {
			console.log('Error', error)
			settoastError(true)
		} else {
			setIsSuccess(true)
			settoastSuccess(true)
			setFormErrors(null)
			setfirstName('')
			setlastName('')
			setage('')
			setdateOfJoining('')
			setdepartment('')
			settitle('')
			setemployeeType('')
			setcurrentStatus('')
		}
	}
	return (
		<>
			<Container>
				{isSuccess && (
					<Toast
						bg='dark'
						show={toastSuccess}
						onClose={() => settoastSuccess(false)}
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

				{error && (
					<Toast
						bg='dark'
						show={toastError}
						onClose={() => settoastError(false)}
						delay={3000}
						autohide
					>
						<Toast.Header>
							<strong className='me-auto'> Error </strong>
						</Toast.Header>
						<Toast.Body className='text-white'>
							Something went wrong while adding employee. Please
							try again later.
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
							onChange={(e) => setfirstName(e.target.value)}
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
							onChange={(e) => setlastName(e.target.value)}
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
							onChange={(e) => setage(e.target.value)}
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
							onChange={(e) => setdateOfJoining(e.target.value)}
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
							onChange={(e) => setdepartment(e.target.value)}
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
							onChange={(e) => settitle(e.target.value)}
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
							onChange={(e) => setemployeeType(e.target.value)}
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
							onChange={(e) => setcurrentStatus(e.target.value)}
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
