import Card from 'react-bootstrap/Card'

const Cards = ({employee}) => {
	const style = {
		margin: '1rem',
		cursor: 'pointer',
		border: '1px solid #ccc',
		borderRadius: '15px',
		boxShadow: '0 0 10px #ccc',
	}

	return (
		<Card className='employeeCard' style={style}>
			<Card.Header className='text-center'>
				{employee.firstName} {employee.lastName}
			</Card.Header>

			<Card.Body>
				<Card.Title>{employee.title}</Card.Title>
				<Card.Subtitle className='mb-1 text-muted'>
					{employee.employeeType}
				</Card.Subtitle>
				<Card.Text>Age: {employee.age}</Card.Text>
				<Card.Text>Department: {employee.department}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Cards
