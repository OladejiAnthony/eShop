import React,{useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {blogs} from "./data"

const BlogDetails = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [details, setDetails] = useState("")
  
  const { id } = useParams()
  //console.log(id); --> number data type
  //console.log(typeof id) --> string data type

  useEffect(() => {
    //find a particular blog
    const thisBlog = blogs.find((blog) => blog.id === parseInt(id))
    setTitle(thisBlog.title)
    setAuthor(thisBlog.author)
    setDetails(thisBlog.details)
  })

  return (
    <div className='container --p'>
      <h1 className='--text-center'>Blog Details <b>{id}</b></h1>
      <h2>{title}</h2>
      {/*Access The Blog details and display on page */}
      <hr />
      <p><b>Author: {author}</b></p>
      <br />
      <p>{details}</p>

      <div className='--my2'>
        <Link to="/blogs">{`<<< Back to Blog`}</Link>
      </div>
    </div>
  )
}

export default BlogDetails


