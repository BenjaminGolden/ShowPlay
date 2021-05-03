import React, { useState, useEffect } from 'react';
import { getEventById, deleteEvent } from '../modules/EventManager'
import { useParams, useHistory } from 'react-router-dom'
import './ShowPlayDetails.css'


export const EventDetail = () => {
    const [activity, setActivity] = useState({})
    const [isLoading, setIsLoading ] = useState(true);
    
    const {activityId} = useParams();
    const history = useHistory();

    useEffect(() => {
        getEventById(activityId)
        .then(activity => {
        setActivity(activity)
        setIsLoading(false);
    })
    }, [activityId])

    const handleDelete = () => {
        setIsLoading(true);
        deleteEvent(activityId)
        .then(() => history.push('/'))
    };

    return(
        <section className="details__card">
            <h3 className="details__name">{activity.name}</h3>
            <div className="details__location"><b>Location: </b>{activity.city}, {activity?.state?.name}</div>
            <div className="details__category"><b>Category: </b>{activity?.category?.name}</div>
            <div className="details__description"><b>description: </b>{activity.description}</div>
            <div className="details__date"><b>date: </b>{activity.date}</div>
            <div className="details__url"><b>url: </b> <a className=
            "details__url--link" href={activity.url}>{activity.url}</a></div>
            <div className="details__rating"><b>rating: </b>{"★".repeat(activity.rating)} </div>
            <div className="details__button">
            <button type="button" disabled={isLoading} onClick={handleDelete}>Delete</button>
            <button type="button"onClick={() => history.push(`/events/${activity.id}/edit`)}>Edit</button>
            </div>
        </section>
    )

}