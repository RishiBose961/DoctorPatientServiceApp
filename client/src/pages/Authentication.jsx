import React from 'react'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Footer from '../components/Footer'
import bg from '../assets/bg.svg'

export default function Auth () {
    return (
        <div className="h-screen max-h-min flex flex-col">
            <Navbar  />
            <div className="body lg:flex px-16 w-full lg:h-5/6 ">
                <img src={bg} alt="graphics"  className="lg:w-1/2 lg:my-auto lg:mx-auto mt-24"/>
                <div className="lg:ml-auto lg:w-1/2 w-screen">
                    <Login/>
                </div>
            </div>
            <div>
                <Footer className="mt-auto relative bottom-0" />
            </div>
        </div>
    )
}