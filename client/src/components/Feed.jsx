import React, { useEffect, useState } from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";
const Feed = () => {
    const [data, setData] = useState([])
    const [Loading, setLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            fetch('https://health.gov/myhealthfinder/api/v3/topicsearch.json')
                .then((res) => res.json())
                .then((req) => setData(req.Result.Resources.Resource.slice(0, 9)))
            setLoading(true)
        }, 3000)
    }, [])


    return (
        <div className='container mx-auto py-2'>
        <p className='text-xl mb-3 font-semibold'>Feed Section</p>
            {
                Loading ?
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                        <>{
                            data.map((post) => {
                                return (
                                    <div class="grid grid-cols-1 lg:grid-cols-3 bg-teal-400 h-fit rounded-xl ring-1 ring-black">
                                        <img src={post.ImageUrl} alt={post.ImageAlt} className="h-20 w-20 rounded-l-xl" />
                                        <div>
                                            <p>{post.Title.substring(0, 40)}..</p>
                                            <a href={post.AccessibleVersion}>{post.AccessibleVersion.substring(0, 40)}</a>
                                        </div>

                                    </div>

                                )
                            })
                        }
                        </>
                    </div>
                    : <div className='flex justify-center'><PropagateLoader color="#36d7b7" className='mt-20 bg-transparent'/></div>
            }
        </div>

    )
}

export default Feed