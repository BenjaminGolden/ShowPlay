import React from 'react'
import {Route} from 'react-router-dom'
import {MainList} from './showplay/ShowPlayList'

export const ApplicationViews = () => {
    return (
        <>
        <Route path="/">
            <MainList />
        </Route>

        
        </>
    )
}