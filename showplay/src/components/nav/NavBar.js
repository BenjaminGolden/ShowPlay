import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
// import { userStorageKey } from '../auth/authSettings'
import './NavBar.css'
import { getLoggedInUser } from '../modules/UserManager'

export const NavBar = () => {
    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    const [user, setUser] = useState({})

    const getCurrentUser = () => {
        return getLoggedInUser(currentUser)
        .then(userFromAPI => {
            setUser(userFromAPI)
        })
    }

    useEffect(() => {
        getCurrentUser();
    }, [])
    
    console.log(user[0]?.name)
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
                   <em>Welcome, </em>{user[0]?.name}
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/create'>New Event</Link>
                </li>
           </ul>
    </nav>
    )
}