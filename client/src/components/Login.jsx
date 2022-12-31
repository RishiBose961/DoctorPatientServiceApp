
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import profile from '../assets/profile.png'
import PropagateLoader from "react-spinners/PropagateLoader";
import { isEmail, isEmpty } from '../helper/validate';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

const initialState = {
  email: '',
  password: '',
}


const Login = () => {
  const [data, setData] = React.useState(initialState);
  const { email, password } = data;
  const { dispatch } = React.useContext(AuthContext)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function errors() {
    alert('Email and Password INVALID!')
  }

  const login = async (e) => {
    e.preventDefault()
    //check field
    if (isEmpty(email) || isEmpty(password))
      return alert('Please Fill All Field!')
    //check email
    if (!isEmail(email))
      return alert('Please Enter Vaild Email!')

    try {
      await axios.post('/api/service/login', { email, password })
      localStorage.setItem('_appSignging', true)
      dispatch({ type: 'SIGNING' })
      window.location.reload();
      alert("Signing successful")

    } catch (error) {
      errors()
    }
  }

  return (
    <div lassName="bg-white flex flex-col justify-items-center items-center py-4 px-4 rounded shadow-md lg:w-3/4 w-full my-7 ml-auto ">
      <h1 className="text-3xl font-bold font-poppins text-primary py-5">Login</h1>

      <div className="flex bg-bgsecondary w-fit justify-between rounded">

      </div>
      <div className='flex justify-center'>
        <img src={profile} alt="profile" className="h-20 my-6 border-2 rounded-full" />
      </div>
      <form className="flex flex-col w-full px-8">
        <label htmlFor='email' className="font-poppins pt-2 pb-1 text-lg font-bold">
          Email
        </label>

        <input type="text" name="email" id="email" onChange={handleChange} className="font-poppins px-3 py-2 bg-bgsecondary rounded outline-none" />

        <label htmlFor='password' className="font-poppins pt-6 pb-1 text-lg font-bold">
          Password
        </label>
        <input type="password" name='password' id='password' onChange={handleChange} className="font-poppins px-3 py-2 bg-bgsecondary rounded outline-none" />

        <button type='submit' onClick={login} className="text-lg mt-10  bg-primary py-1 px-3 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary">Login</button>
        <div className='flex justify-center'>
          <PropagateLoader color="#36d7b7" className='mt-3 mb-3' />
        </div>



      </form>
      {/* <div className='flex justify-center'>
        <h1 className="font-poppins text-base pt-5">New user, <Link to="/Register">Register here</Link></h1>
      </div> */}

      <div className='text-center mt-2'>
        <p>Demo Doctor</p>
        <p>Email : Kam123@gmail.com</p>
        <p>password: kam@123</p>
        <p className='mt-2'>Demo Patient</p>
        <p>Email : roy123@gmail.com</p>
        <p>password: roy@123</p>

      </div>
    </div>
  )
}

export default Login
