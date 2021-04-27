import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { getAllEvents } from '../modules/EventManager';
import {MainCard} from './ShowPlayCard'

export const MainList = () => {
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState([])
   

    const getEvents = () => {
        return getAllEvents()
        .then(eventsFromAPI => {
            setEvents(eventsFromAPI)
        })
    }

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newEvent = { ...event }
        let selectedVal = event.target.value
        if (event.target.id.includes('id')) {
            selectedVal = parseInt(selectedVal)
        }
        newEvent[event.target.id] = selectedVal
        setEvent(newEvent)
    }



    useEffect(() => {
        getEvents();
        
    }, []);

    return(
        <>
        <div className="event__cards">
            <button type="button" className="button" onClick={() => 
            {history.push('/create')}}>New Event</button>
        </div>
        <div>
            <select value={event.category} name="category" id="category" onChange={handleControlledInputChange} className='form-control'>
                <option vlaue="0">Select a Category</option>
                {events.map(event => (
                    <option key={event.id} value={event.id}>{event.category}</option>
                ))}
            </select>
        </div>
        <div className="section__content">
            {events.map(event => <MainCard key={event.id} event={event} />)}
        </div>
        </>
    )
}