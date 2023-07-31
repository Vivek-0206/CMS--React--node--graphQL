// Crete component for edit employee
import {gql} from '@apollo/client'
import {useMutation} from '@apollo/client'
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import React, {useState, useEffect} from 'react'
import Toast from 'react-bootstrap/Toast'

import {GET_EMPLOYEE_BY_ID} from '../graphql/Queries'
import {UPDATE_EMPLOYEE_MUTATION} from '../graphql/Mutations'
import LoadingSpinner from './LoadingSpinner'

const EmployeeEdit = () => {
	const navigate = useNavigate()
	// For form validation
	const [formErrors, setFormErrors] = useState(null)
	const [isSuccess, setIsSuccess] = useState(false)

	const [department, setDepartment] = useState('')
	const [title, setTitle] = useState('')
	const [currentStatus, setCurrentStatus] = useState(false)

	// For Toast messages
	const [toastSuccess, setToastSuccess] = useState(true)

	// Update employee mutation
	const [updateEmployee] = useMutation(UPDATE_EMPLOYEE_MUTATION)

	// get id from url
	const {id} = useParams()
	// get employee details by id
	const {loading, error, data} = useQuery(GET_EMPLOYEE_BY_ID, {
		variables: {employeeId: id},
	})

	// set employee details to state
	const [employeeDetails, setEmployeeDetails] = useState({})

	useEffect(() => {
		if (data) {
			setDepartment(data.getEmployeeById.department)
			setTitle(data.getEmployeeById.title)
			setCurrentStatus(data.getEmployeeById.currentStatus)
			setEmployeeDetails(data.getEmployeeById)
		}
	}, [data])
	if (loading) return <LoadingSpinner />
	if (error) {
		console.log('--> Error :', error)
	}

	// Handle form submit
	const handleSubmit = (event) => {
		event.preventDefault()

		const formErrors = {
			department: department ? '' : 'department is required',
			title: title ? '' : 'title is required',
			currentStatus: currentStatus === '' ? 'status is required' : '',
		}
		setIsSuccess(false)

		// set form errors
		setFormErrors({...formErrors})
		if (Object.values(formErrors).some((v) => v)) return

		let employeeDetails = {
			id,
			department,
			title,
			currentStatus,
		}

		updateEmployee({
			variables: {
				employeeId: id,
				employeeDetails,
			},

			// update the employee list cache
			update: (cache, {data: {updateEmployee}}) => {
				cache.modify({
					fields: {
						getAllEmployee(existingEmployeeRefs = [], {readField}) {
							existingEmployeeRefs = existingEmployeeRefs.filter(
								(ref) =>
									updateEmployee.id !== readField('id', ref)
							)
							const newEmployeeRef = cache.writeFragment({
								data: updateEmployee,
								fragment: gql`
									fragment NewEmployee on Employee {
										id
										department
										title
										currentStatus
									}
								`,
							})
							return [...existingEmployeeRefs, newEmployeeRef]
						},
					},
				})
			},

			// on success
			onCompleted: () => {
				setIsSuccess(true)
				setToastSuccess(true)
				// reset form
				setEmployeeDetails({})
				setDepartment('')
				setTitle('')
				setCurrentStatus('')

				// reset form errors
				setFormErrors(null)

				// redirect to admin page
				// navigate('/admin')
			},

			// on error
			onError: (error) => {
				console.log('--> Error :', error)
			},
		})
	}

	return (
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
						Employee Updated Successfully.
					</Toast.Body>
				</Toast>
			)}
			<h1 className='text-center'>
				Update {employeeDetails.firstName} {employeeDetails.lastName}{' '}
				Details!!
			</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='formBasicFirstName'>
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type='text'
						value={employeeDetails.firstName}
						disabled
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicLastName'>
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type='text'
						value={employeeDetails.lastName}
						disabled
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicAge'>
					<Form.Label>Age</Form.Label>
					<Form.Control
						type='number'
						disabled
						value={employeeDetails.age}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicTitle'>
					<Form.Label>Title</Form.Label>
					<Form.Select
						aria-label='Default select example'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					>
						<option value=''>Open this select menu</option>
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
				<Form.Group className='mb-3' controlId='formBasicDepartment'>
					<Form.Label>Department</Form.Label>
					<Form.Select
						aria-label='Default select example'
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
					>
						<option value=''>Open this select menu</option>
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
				<Form.Group className='mb-3' controlId='formBasicType'>
					<Form.Label>Type</Form.Label>
					<Form.Select
						aria-label='Default select example'
						value={employeeDetails.employeeType}
						disabled
					>
						<option>Open this select menu</option>
						<option value='Full-time'>Full-Time</option>
						<option value='Part-time'>Part-Time</option>
						<option value='Contract'>Contract</option>
						<option value='Seasonal'>Seasonal</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicCurrentStatus'>
					<Form.Label>Current Status</Form.Label>
					<Form.Select
						aria-label='Default select example'
						value={currentStatus ? 'working' : 'retired'}
						onChange={
							// Add boolean value to currentStatus
							(e) =>
								setCurrentStatus(
									e.target.value === 'working' ? true : false
								)
						}
					>
						<option value=''>Open this select menu</option>
						<option value='working'>Working</option>
						<option value='retired'>Retired</option>
					</Form.Select>

					{formErrors && formErrors.currentStatus && (
						<Form.Text className='text-danger'>
							{formErrors.currentStatus}
						</Form.Text>
					)}
				</Form.Group>
				<Button variant='primary' type='submit' onClick={handleSubmit}>
					Submit
				</Button>{' '}
				&nbsp;
				<Button variant='secondary' onClick={() => navigate('/admin')}>
					Go to Admin Page
				</Button>
			</Form>
		</Container>
	)
}

export default EmployeeEdit
