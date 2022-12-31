
import React, { useContext, useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { AuthContext } from '../context/AuthContext';
import Profile from './Profile';

const Community = () => {
  const [data, setData] = React.useState([])
  const { token } = useContext(AuthContext)
  const getPosts = async () => {
    const res = await fetch('/api/service/getalluserpost');
    await res.json()
      .then(result => {
        setData(result.userpost)
      })
  }

  useEffect(() => {
    getPosts()
  }, [])

  // console.log(data);

  const makeComment = (text, postId) => {
    fetch('/api/service/getcomments', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        postId,
        text
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err);
      })
  }


  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

      <div class="col-span-2">
        <Scrollbars style={{ width: 'auto', height: 950 }}>
          {data.map((posts) => {
            return (

              <div className="bg-white rounded shadow-md w-full my-7 ml-auto ">
                <div className="bg-gray-200  py-4 px-4 rounded w-full my-7 ml-auto ">
                  <p>{posts.title}</p>
                  <p>Description : {posts.description.substring(0, 110)}.. <span className='text-red-400 cursor-pointer'> Read More</span></p>
                  <div className='flex justify-end'>Category : {posts.category}</div>
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  // console.log(e.target[0].value);
                  makeComment(e.target[0].value, posts._id);
                }} >
                  <input className="block p-2.5 w-full 
      text-sm mt-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
       focus:border-blue-500" type="text" placeholder="Add a Comment" />
                </form>
                <div className="bg-gray-200 py-4 px-4 rounded w-full my-4 ml-auto ">
                  Comments
                  <Scrollbars style={{ width: 'auto', height: 150 }}>
                    {
                      posts.comments.map(record => {
                        return (
                          <div key={record._id} className="bg-white py-4 px-4 rounded w-full my-4 ml-auto ">
                            {record.postedBy.name} <br></br>
                            &nbsp; &nbsp; {record.text}
                          </div>
                        )
                      })
                    }
                  </Scrollbars>

                </div>
              </div>

            )
          })

          }
        </Scrollbars>
      </div>



      <div class="...">
        <Profile/>
      </div>

    </div>
  )
}

export default Community
