import Container from 'react-bootstrap/esm/Container'

// Create 404 component
const NoMatch = () => {
	return (
		<>
			<Container>
				<div className='text-center'>
					<h1>404: Page not found</h1>
					<p>Sorry, the page you are looking for does not exist.</p>
				</div>
			</Container>
		</>
	)
}

export default NoMatch
