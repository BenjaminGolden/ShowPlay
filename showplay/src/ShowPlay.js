import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {ApplicationViews} from './components/ApplicationViews'
import {NavBar} from './components/nav/NavBar'
import {Login} from './components/auth/Login'
import {Register} from './components/auth/Register'
import {userStorageKey} from './components/auth/authSettings'
import './ShowPlay.css'

export const ShowPlay = () => (
    <>
    <Route
        render={() => {
            if (sessionStorage.getItem(userStorageKey)) {
                return (
                    <>
                    <NavBar />
                    <ApplicationViews />
                    </>
                )
            } else {
                return <Redirect to="/login" />;
            }
        }}
        />

    <Route path="/login">
        <Login />
    </Route>
    <Route path="/register">
        <Register />
    </Route>
    </>
)