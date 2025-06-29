import React, {useState, useEffect} from 'react'
import Container from '../../container/Container'
import PostCard from '../Postcard'
import authService from '../../appwrite/dbConfig'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    authService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts