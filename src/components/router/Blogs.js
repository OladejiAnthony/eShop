import React from 'react'
import {blogs} from "./data"
import { Link } from 'react-router-dom';

const Blogs = () => {
  return (
    <div className='--center-all'>
        <h1>Blogs Page</h1>
        <p>
            Welcome to the <b>Blogs</b> page
        </p>
        <article>
        {
          blogs.map((blog) => {
            const {id, title, author} = blog;
            return (
              <div key={id} className='--card --m --p'>
                <h4>{title}</h4>
                <p>By {author}</p>
                <Link to={`/blog/${id}`}>Read More</Link>
              </div>
            )
          })
        }
        </article>
    </div>
  )
}

export default Blogs

