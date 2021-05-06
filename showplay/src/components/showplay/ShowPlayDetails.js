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

    const url = `http://${activity.url}`
    //TODO: url gets added to the end of the existing url instead of going to the external link
    return(
        <section className="details">
            <div className="details__card">
                <div className="details__rating"> <h3 className="details__name">{activity.name}</h3>
                <b>Rating: </b>{"★".repeat(activity.rating)} </div>
                <div className="details__location"><b>Location: </b>{activity.city}, {activity?.state?.name}</div>
                <div className="details__category"><b>Category: </b>{activity?.category?.name}</div>
                <div className="details__description"><b>Description: </b>{activity.description}</div>
                <div className="details__date"><b>Date: </b>{activity.date}</div>
                <div className="details__url"><b>URL: </b> <a className="details__url--link" href={url}>{activity.url}</a></div>
                <div className="details__button">
                <button type="button" disabled={isLoading} onClick={handleDelete}>Delete</button>
                <button type="button"onClick={() => history.push(`/events/${activity.id}/edit`)}>Edit</button>
                </div>
            </div>
        </section>
    )

}