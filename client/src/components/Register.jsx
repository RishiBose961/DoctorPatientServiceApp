// import React from "react";
// import { useState } from "react";
// import Footer from "./Footer";
// import Navbar from "./Navbar";

// export default function Register() {
//     const [toggle, setToggle] = useState("patient")
//     const [confirmPassword, setConfirmPassword] = useState("")
//     const [patient, setPatient] = useState({
//         email: "",
//         password: ""
//     })

//     return (
//         <div>
//             <Navbar/>
//             <div>
//                 <div>
//                     <div>
//                         <h1>Register</h1>
//                     </div>
//                     <form onSubmit={handleRegister}>
//                         <div>
//                             <button onClick={() => setToggle("Patient")}>Patient</button>
//                             <button onClick={() => setToggle("Doctor")}>
//                                 Doctor
//                             </button>
//                         </div>
//                         <div>
//                             <div>
//                                 <label>Email</label>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }