// Create employee details component
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/esm/Container'
import ListGroup from 'react-bootstrap/ListGroup'

import {GET_EMPLOYEE_BY_ID} from '../graphql/Queries'
import LoadingSpinner from './LoadingSpinner'

import person from '../assets/avatar.png'

const EmployeeDetails = () => {
	const navigate = useNavigate()
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
			setEmployeeDetails(data.getEmployeeById)
		}
	}, [data])

	if (loading) return <LoadingSpinner />
	if (error) console.log('--> Error :', error)

	return (
		<Container>
			<Card
				style={{width: '20rem', padding: '10px', margin: '20px auto'}}
			>
				<Card.Img variant='top' src={person} />
				<Card.Body>
					<Card.Title>
						{employeeDetails.firstName} {employeeDetails.lastName}
					</Card.Title>
				</Card.Body>
				<ListGroup className='list-group-flush'>
					<ListGroup.Item>
						Department: {employeeDetails.department}
					</ListGroup.Item>
					<ListGroup.Item>
						Employee Title: {employeeDetails.title}
					</ListGroup.Item>
					<ListGroup.Item>
						Employee Current Status:{' '}
						{employeeDetails.currentStatus ? 'Working' : 'Retired'}
					</ListGroup.Item>
				</ListGroup>
				<Card.Body className='text-center'>
					<Button
						variant='primary'
						onClick={() =>
							navigate(`/edit-employee/${employeeDetails.id}`)
						}
					>
						Edit
					</Button>
					<Button
						className='ms-5'
						variant='secondary'
						onClick={() => navigate('/')}
					>
						Go Back
					</Button>
				</Card.Body>
			</Card>
		</Container>
	)
}

export default EmployeeDetails
