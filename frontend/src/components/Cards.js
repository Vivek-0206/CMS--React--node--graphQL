import Card from 'react-bootstrap/Card';

const Cards = ({ employee }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{employee.title} - {employee.employeeType}</Card.Subtitle>
                <Card.Text>
                    <p>
                        Age: {employee.age}
                    </p>
                    <p>
                        Department: {employee.department}
                    </p>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Cards;