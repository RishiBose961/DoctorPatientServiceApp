import React from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Footer from '../components/Footer'
import bg from '../assets/bg.svg'

export default function Auth () {
    return (
        <div>
            <Navbar />
            <div>
                <img src={bg} alt="graphics" />
                <div>
                    <Login/>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}