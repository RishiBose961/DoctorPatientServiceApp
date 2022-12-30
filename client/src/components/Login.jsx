import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import profile from '../assets/profile.png'
import ReactLoading from "react-loading"

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState("Patient")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")




    const handleLogin = async (e) => {
      e.preventDefault()
      switch (toggle) {
        case "Patient":
          // handlePatientLogin(email, password)
          break;
        case "Doctor":
          // handleDocotrLogin(email, password)
          break;
        default:
        break;
      }
    }

  return (
    <div lassName="bg-white flex flex-col justify-items-center items-center py-4 px-4 rounded shadow-md lg:w-3/4 w-full my-7 ml-auto ">
      <h1 className="text-3xl font-bold font-poppins text-primary py-5">Login</h1>
    
    <div className="flex bg-bgsecondary w-fit justify-between rounded">

      <button className={
            toggle === "Patient"
              ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
              : "py-2 px-8 text-lg font-poppins font-medium text-primary cursor-pointer rounded"
          } onClick={() => {setToggle("Patient"); setEmail("");setPassword(""); setPassword("")}}>
        Patient
      </button>
      <button className={
            toggle === "Doctor"
              ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
              : "py-2 px-8 text-lg font-poppins font-medium text-primary cursor-pointer rounded"
          } onClick={() => {
        setToggle("Doctor"); setEmail(""); setPassword("");}}>
          Doctor
        </button>
    </div>
    <img src={profile} alt="profile" className="h-20 my-6 border-2 rounded-full" />
    <form className="flex flex-col w-full px-8" action={handleLogin}>
      <label htmlFor='email' className="font-poppins pt-2 pb-1 text-lg font-bold">
        Email
      </label>

      <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="font-poppins px-3 py-2 bg-bgsecondary rounded outline-none"/>

      <label htmlFor='password' className="font-poppins pt-6 pb-1 text-lg font-bold">
        Password
      </label>
      <input type="password" name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} className="font-poppins px-3 py-2 bg-bgsecondary rounded outline-none"/>

        {loading ? (
          <div className="flex justify-center items-center py-3"> 
        <ReactLoading type='bubbls'color='color' height='10%' width='10%'
        /> </div>) : ( 
        <button type='submit' className="text-lg mt-10  bg-primary py-1 px-3 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary">Login</button>
        )}

      
    </form>
    <h1 className="font-poppins text-base pt-5">New user, <Link to="/Register">Register here</Link></h1>
    </div>
  )
}

export default Login
