import React from 'react'
import Navbar from '../components/Navbar'
import Community from '../components/Community'
import Footer from '../components/Footer'
import bg from '../assets/bg.svg'

export default function SymptomsMenu () {
    return (
        <div>
            <Navbar />
            <div className="px-80">
                <Community/>
            </div>
            <div>
                <Footer className="mt-auto relative bottom-0" />
            </div>
        </div>
    )
}