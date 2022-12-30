import React from 'react'
import Navbar from '../components/Navbar'
import Symptoms from '../components/Symptoms'
import Footer from '../components/Footer'
import bg from '../assets/bg.svg'

export default function SymptomsMenu () {
    return (
        <div>
            <Navbar />
            <div>
                <img src={bg} alt="graphics" />
                <div>
                    <Symptoms/>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}