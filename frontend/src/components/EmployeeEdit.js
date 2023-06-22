// Crete component for edit employee
import Container from 'react-bootstrap/esm/Container'
import {useParams} from 'react-router-dom'

const EmployeeEdit = () => {
	// get id from url
	const {id} = useParams()

	return (
		<Container>
			<h1 className='text-center'>
				Welcome to Edit Employee Component!!
			</h1>

			<p className='text-center'>Employee ID : {id}</p>
		</Container>
	)
}

export default EmployeeEdit
