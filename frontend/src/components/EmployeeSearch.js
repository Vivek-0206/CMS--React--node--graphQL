// Create search bar for employee search

import {Button} from 'react-bootstrap'
import {Col, Form, Row} from 'react-bootstrap'
import Container from 'react-bootstrap/esm/Container'

const EmployeeSearch = () => {
	return (
		<Container>
			<Form>
				<Row>
					<Col>
						<Form.Group className='mb-3' controlId='formBasicEmail'>
							<Form.Label>Search</Form.Label>
							<Form.Control
								type='text'
								placeholder='Search for Employee by name , title , department, employee type'
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group
							className='mb-3'
							controlId='formBasicPassword'
						>
							<Form.Label>Date Of Joining</Form.Label>
							<Form.Control
								type='date'
								placeholder='Date Of Joining'
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group
							className='mb-3'
							controlId='formBasicPassword'
						>
							<Form.Label>Current Status</Form.Label>
							<Form.Select aria-label='Default select example'>
								<option>Open this select menu</option>
								<option value='true'>Working</option>
								<option value='false'>Retired</option>
							</Form.Select>
						</Form.Group>
					</Col>
				</Row>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</Container>
	)
}

export default EmployeeSearch
