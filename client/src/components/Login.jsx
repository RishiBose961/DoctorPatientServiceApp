import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
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
    <div>
      <h1>Login</h1>
    
    <div>
      <button onClick={() => {setToggle("Patient"); setEmail("");setPassword(""); setPassword("")}}>
        Patient
      </button>
      <button onClick={() => {
        setToggle("Doctor"); setEmail(""); setPassword("");}}>
          Doctor
        </button>
    </div>
    <img src={profile} alt="profile" />
    <form action={handleLogin}>
      <label htmlFor='email'>
        Email
      </label>
      <input type="text" name="email" id="email" value="email" onChange={(e) => setEmail(e.target.value)}/>
      <label htmlFor='password'>
        Password
      </label>
      <input type="password" name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        {loading ? ( 
        <ReactLoading type='bubbls'color='color' height='10%' width='10%'
        />) : ( 
        <button type='submit'>Login</button>
        )}

      
    </form>
    <h1>New user, <Link to="/Register">Register here</Link></h1>
    </div>
  )
}

export default Login
