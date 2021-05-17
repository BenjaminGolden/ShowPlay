import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
// import { userStorageKey } from '../auth/authSettings'
import './NavBar.css'
import { getLoggedInUser } from '../modules/UserManager'

export const NavBar = () => {
    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    const [user, setUser] = useState({})

    const getCurrentUser = (id) => {
        return getLoggedInUser(id)
        .then(userFromAPI => {
            setUser(userFromAPI)
        })
    }

    useEffect(() => {
        getCurrentUser(currentUser);
    }, [currentUser])

    // const handleLogout = () => {
    //    const logout = sessionStorage.clear()
    //    setUser(logout)
    // }

    return (
    <>
        <nav className="navbar">
        
            <ul className="nav__upper">
                <li ><em>ShowPlay</em></li>
                {/* <li className="logout">
                    <Link className="nav-link" to='/login'>Logout</Link>
                </li> */}
                <li className="nav-item">
                {user[0]?.name}
                </li>
            </ul> 
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to='/' >My List</Link>
                </li>
    
                <li className="nav-item">
                    <Link className="nav-link" to='/create'>New Event</Link>
                </li>
                {/* <li>
                    <Link to='/tour'>tour schedule 

                    </Link>
                </li> */}
            </ul>
        </nav>
    </>
    )
}