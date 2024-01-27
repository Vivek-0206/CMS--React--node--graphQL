import {Col, Form, Row} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import moment from 'moment'
import React, {useState, useEffect} from 'react'

import {GET_EMPLOYEE_LIST_QUERY} from '../graphql/Queries'
import Cards from './Cards'
import LoadingSpinner from './LoadingSpinner'

const EmployeeDirectory = () => {
	const navigate = useNavigate()
	// Get all employees
	const [employeeList, setEmployeeList] = useState([])
	const {loading, error, data} = useQuery(GET_EMPLOYEE_LIST_QUERY)

	const [searchType, setSearchType] = useState('All')
	const [searchText, setSearchText] = useState('')

	const handleTypeChange = (event) => {
		setSearchType(event.target.value)
		if (event.target.value === 'All') {
			setEmployeeList(data.getAllEmployee)
		} else if (event.target.value === 'upcoming-retirement') {
			// eslint-disable-next-line array-callback-return
			const newEmployee = data.getAllEmployee.filter((employee) => {
				const dateOfJoining = moment(
					moment(employee.dateOfJoining.split('T')[0]).format(
						'YYYY/MM/DD'
					)
				)
				const todaysDate = moment(moment().format('YYYY/MM/DD'))

				const currentAge =
					todaysDate.diff(dateOfJoining, 'year') + employee.age

				if (currentAge >= 59) {
					return employee
				}
			})
			setEmployeeList(newEmployee)
		} else {
			setEmployeeList(
				data.getAllEmployee.filter(
					(employee) => employee.employeeType === event.target.value
				)
			)
		}
	}

	const handleSearch = (event) => {
		setSearchText(event.target.value)
		if (event.target.value === '') {
			setEmployeeList(data.getAllEmployee)
		} else {
			setEmployeeList(
				data.getAllEmployee.filter(
					(employee) =>
						employee.firstName
							.toLowerCase()
							.includes(event.target.value.toLowerCase()) ||
						employee.lastName
							.toLowerCase()
							.includes(event.target.value.toLowerCase())
				)
			)
		}
	}

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
			<Row>
				<Col xs={12} md={6}>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Search</Form.Label>
						<Form.Control
							type='text'
							placeholder='Search for Employee by name'
							value={searchText}
							onChange={handleSearch}
						/>
					</Form.Group>
				</Col>
				<Col xs={12} md={6}>
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Select Employee Type:</Form.Label>
						<Form.Select
							aria-label='Default select example'
							value={searchType}
							onChange={handleTypeChange}
						>
							<option value='All'>All Employees</option>
							<option value='Full-time'>
								Full Time Employees
							</option>
							<option value='Part-time'>
								Part Time Employees
							</option>
							<option value='Contract'>Contract Employees</option>
							<option value='Seasonal'>Seasonal Employees</option>
							<option value='upcoming-retirement'>
								Upcoming Retirement
							</option>
						</Form.Select>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				{employeeList.length > 0 ? (
					employeeList.map((employee) => (
						<Col
							xs={12}
							md={6}
							lg={4}
							key={employee.id}
							onClick={() => {
								navigate(`/employee-list/${employee.id}`)
							}}
						>
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
