import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Profile = () => {
    const { user } = useContext(AuthContext)
    console.log(user);
    return (
        <div className='bg-lime-300 text-center pb-3 rounded-xl'>
            <div className='text-xl mx-5'>
            <div className='flex justify-center'>
            <img className='h-20 mt-3' src={user.avatar} alt="loading" />
            </div>
                <p className='mt-2'>{user.name}</p>
                <p>{user.age}</p>
                <p>{user.gender}</p>
                <p>{user.type}</p>
            </div>
        </div>
    )
}

export default Profile