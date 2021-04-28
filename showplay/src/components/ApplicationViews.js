import React from 'react'
import {Route} from 'react-router-dom'
import {MainList} from './showplay/ShowPlayList'
import {NewEvent} from './showplay/ShowPlayAdd'
import {EventDetail} from './showplay/ShowPlayDetails'
import { EventEditForm } from './showplay/ShowPlayEditForm'

export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/">
            <MainList />
        </Route>

        <Route exact path="/create">
            <NewEvent />
        </Route>

        <Route exact path="/details/:activityId(\d+)">
            <EventDetail />
        </Route>

        <Route exact path="/events/:activityId(\d+)/edit">
            <EventEditForm />
        </Route>

        
        </>
    )
}