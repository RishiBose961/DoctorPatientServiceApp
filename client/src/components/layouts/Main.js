import React from 'react'
import Community from '../Community'
import Feed from '../Feed'
import NavLiks from '../NavLiks'

const Main = () => {
  return (
    <div className='container mx-auto'>
      <NavLiks />
      <Community />
      {/* <Feed/> */}
    </div>
  )
}

export default Main