// Create home component
import Container from 'react-bootstrap/esm/Container'

import EmployeeDirectory from './EmployeeDirectory'

const Home = () => {
	return (
		<>
			<Container>
				<h1 className='text-center'>Employee Directory</h1>
				<hr className='mb-3' />
				<EmployeeDirectory />
			</Container>
		</>
	)
}

export default Home
