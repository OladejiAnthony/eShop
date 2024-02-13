/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import "./Navbar.css"
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='--flex-center --p2 --bg-primary'>
        <nav>
            {/*         
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/blogs'>Blogs</Link>
            */}

            <NavLink to='/' className={({isActive}) => (isActive ? "active": "" )}>Home</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/blogs'>Blogs</NavLink>
        </nav>
    </div>
  )
}

export default Navbar

