import React, {useState} from 'react'
import {Link} from 'react-router-dom'
// import { userStorageKey } from '../auth/authSettings'
import './NavBar.css'

export const NavBar = (props, user) => {
    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    // const [user, setUser] = useState({
    //     user: currentUser
    // })

    //TODO: need to display user in the nav bar
    return (
    <nav className="navbar">
            <ul className="nav__upper">
                <li ><em>ShowPlay</em></li>
                <li className="logout">
                    <Link className="nav-link" to='/logout'>Logout</Link>
                </li>
            </ul> 
           <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to='/'>My List</Link>
                </li>
                <li className="nav-item">
                   {user.name}
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/create'>New Event</Link>
                </li>
           </ul>
    </nav>
    )
}