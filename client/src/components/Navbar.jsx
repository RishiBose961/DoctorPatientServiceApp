import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav>
        <img src={logo} alt='logo'/>
        <h1><Link to="/">Docter_patient APP</Link></h1>
        <button>
            {useLocation().pathname === '/register' ? ( <Link to="/">Login</Link>) : ( <Link to="/register">Register</Link>)}
        </button>
    </nav>
  )
}

export default Navbar
