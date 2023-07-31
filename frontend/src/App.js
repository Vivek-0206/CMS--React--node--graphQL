import {Routes, Route} from 'react-router-dom'

import Admin from './components/Admin'
import EmployeeCreate from './components/EmployeeCreate'
import EmployeeEdit from './components/EmployeeEdit'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import EmployeeDetails from './components/EmployeeDetails'

import './App.css'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route index element={<Home />} />
				<Route path='home' element={<Home />} />
				<Route path='admin' element={<Admin />} />
				<Route path='employee-list' element={<Home />} />
				<Route path='employee-list/:id' element={<EmployeeDetails />} />
				<Route path='add-employee' element={<EmployeeCreate />} />
				<Route path='edit-employee/:id' element={<EmployeeEdit />} />
				<Route path='*' element={<NoMatch />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
