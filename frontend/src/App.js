import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Admin from './components/Admin'
import NoMatch from './components/NoMatch'
import Header from './components/Header'
import Footer from './components/Footer'
import EmployeeCreate from './components/EmployeeCreate'
import EmployeeEdit from './components/EmployeeEdit'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route index element={<Home />} />
				<Route path='home' element={<Home />} />
				<Route path='admin' element={<Admin />} />
				<Route path='add-employee' element={<EmployeeCreate />} />
				<Route path='edit-employee/:id' element={<EmployeeEdit />} />
				<Route path='*' element={<NoMatch />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
