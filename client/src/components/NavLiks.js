import React from 'react'
import { Link } from 'react-router-dom'

const NavLiks = () => {
  return (
    <div className='flex justify-center text-xl mt-2'>
        <p className='bg-teal-400 w-20 text-center h-8 rounded-xl cursor-pointer'>Home</p>
        <Link to={'/createyourpost'}><p className='mx-4 bg-teal-400 w-20 text-center h-8 rounded-xl cursor-pointer'>Create</p></Link>
        <p className='bg-teal-400 w-20 text-center h-8 rounded-xl cursor-pointer'>Profile</p>
        <p className='mx-4 bg-red-500 w-20 text-center h-8 rounded-xl cursor-pointer'>Logout</p>
    </div>
  )
}

export default NavLiks