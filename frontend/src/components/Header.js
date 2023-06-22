// Create header component

import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => (
	<Navbar bg='dark' data-bs-theme='dark'>
		<Container>
			<Navbar.Brand>Assignment 1: CMS</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ms-auto'>
					<LinkContainer to='/home'>
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to='/admin'>
						<Nav.Link>Admin</Nav.Link>
					</LinkContainer>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
)

export default Header
