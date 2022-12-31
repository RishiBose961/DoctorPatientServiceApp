import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import {Link} from 'react-router-dom'
const CreatePost = () => {
  const [data, setData] = useState([])
  const {token} = useContext(AuthContext)
  useEffect(() => {
    fetch('https://mocki.io/v1/a9e8f4e9-c991-4229-97ba-4b8fa60da066')
      .then((response) => response.json())
      .then((req) => setData(req))
  }, [])

  const [inpval, setinpval] = useState({
    title: '',
    category: '',
    description: '',
    help: ''
  })

  const setdata = (e) => {
    const { name, value } = e.target;
    setinpval((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }


  const addinpdata = async (e) => {
    e.preventDefault();
    const { title, category, description, help } = inpval
    const res = await fetch("/api/service/usercreatepost", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': token
      },
      body: JSON.stringify({
        title, category, description, help
      })
    })

    const data = await res.json();
    if (!title || !category || !description || !help) {
      if (res.status === 422 || !data) {
        alert("error");
      }
      alert('Please fill')
    }
    else {
      alert('success uploaded');
    }
  }


  return (
    <div className='container mx-auto'>
      <Link to='/'><p className='text-2xl font-bold mb-10 mt-2'>Create Post</p></Link>

      <p>Title</p>
      <textarea rows="1"
        name='title'
        value={inpval.title}
        onChange={setdata}
        className="block p-2.5 w-full 
      text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
       focus:border-blue-500" placeholder="Write your Title"></textarea>
      <p className='pt-4'>Category</p>
      <select name="category"
        value={inpval.category}
        onChange={setdata}
        class="block p-2.5 w-full mt-2
      text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
       focus:border-blue-500">
        {
          data.map((index) => {
            return (
              <option value={index.health_name}>{index.health_name}</option>           
            )
          })
        }
      </select>

      <p className='pt-4'>Description</p>
      <textarea rows="1"
        name="description"
        value={inpval.description}
        onChange={setdata}
        class="block p-2.5 w-full mt-2
      text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
       focus:border-blue-500" placeholder="Write your Description"></textarea>
      <p className='pt-4'>Help!</p>
      <textarea 
      name="help"
        value={inpval.help}
        onChange={setdata}
      rows="1" class="block p-2.5 w-full mt-2
      text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
       focus:border-blue-500" placeholder="Write your Help"></textarea>
      <div className='mt-5 flex justify-center'>
        <button className='bg-orange-400 w-20 h-10 uppercase rounded-lg' onClick={addinpdata}>Submit</button>
      </div>
    </div>
  )
}

export default CreatePost