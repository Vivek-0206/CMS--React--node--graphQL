// Create header component

import {LinkContainer} from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import React from 'react'

const Header = () => (
	<Navbar bg='dark' data-bs-theme='dark'>
		<Container>
			<Navbar.Brand>Assignment 2: CMS</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ms-auto'>
					<LinkContainer to='/home'>
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to='/admin'>
						<Nav.Link>Admin</Nav.Link>
					</LinkContainer>
					<LinkContainer to='/add-employee'>
						<Nav.Link>Add employee</Nav.Link>
					</LinkContainer>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
)

export default Header
