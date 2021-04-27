import React from 'react'
import {Route} from 'react-router-dom'
import {MainList} from './showplay/ShowPlayList'
import {NewEvent} from './showplay/ShowPlayAdd'

export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/">
            <MainList />
        </Route>

        <Route exact path="/create">
            <NewEvent />
        </Route>

        
        </>
    )
}