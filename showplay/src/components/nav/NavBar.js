import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'

export const NavBar = (props) => {
    return (
        <nav className="navbar">
           <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to='/'>My List</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/new'>New Event</Link>
                </li>
           </ul>
        </nav>
    )
}