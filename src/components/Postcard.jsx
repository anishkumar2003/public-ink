import React from 'react'
import authService from '../appwrite/dbConfig'
import {Link} from 'react-router-dom'

function PostCard({$id, title, image}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-800 rounded-xl p-4 min-h-[10rem] justify-center items-center'>
            <div className='w-full justify-center mb-4'>
                {/* <img src={authService.getFilePreview(image)} alt={title}
                className='rounded-xl' /> */}

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard