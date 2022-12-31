import React, { useContext } from 'react'
import {Link, useLocation} from 'react-router-dom'
import logo from '../assets/logo.png'
import { AuthContext } from '../context/AuthContext'
import Feed from './Feed'

const Home = () => {
    const {user} = useContext(AuthContext)
    // console.log(user);
    return (
        <>
        <div className='mb-4'>
            <nav className="lg:bg-white lg:w-screen lg:h-14 shadow-sm lg:px-16 lg:py-3 flex justify-items-center items-center  w-full justify-between">

                <img src={logo} alt='logo' className="lg:h-10 lg:pr-3 h-10 pr-4 pl-2 mt-2" />

                <h1 className="font-poppins font-bold text-sm lg:text-xl mt-2 mb-2"><Link to="/" style={{ textDecoration: 'none' }}>Docter_patient APP</Link></h1>

                <button className="bg-primary lg:py-2 
                lg:px-3 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary py-1 px-2 mr-2">
                    {user.name}
                </button>
            </nav>
        </div>
        </>
    )
}

export default Home