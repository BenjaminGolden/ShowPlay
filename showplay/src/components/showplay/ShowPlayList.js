import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { getAllEvents } from '../modules/EventManager';
import { getAllCategories } from '../modules/CategoryManager'
import {MainCard} from './ShowPlayCard'

export const MainList = () => {
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState([])
    const [category, setCategory] = useState([])
   

    const getEvents = () => {
        return getAllEvents()
        .then(eventsFromAPI => {
            setEvents(eventsFromAPI)
        })
    }

    const getCategories = () => {
        return getAllCategories()
        .then(categoriesFromAPI => {
            setCategory(categoriesFromAPI)
        })
    }    

    const history = useHistory();

    const handleControlledInputChange = (category) => {
        const newCategory = { ...category }
        let selectedVal = event.target.value
        if (event.target.id.includes('id')) {
            selectedVal = parseInt(selectedVal)
        }
        newCategory[event.target.id] = selectedVal
        setCategory(newCategory)
    }

    const handleFieldChange = (event) => {
        const stateToChange = { ...event }
        stateToChange = event.target.value
        setEvent(stateToChange);
    }


    useEffect(() => {
        getEvents();
        getCategories();
        
    }, []);

    return(
        <>
        <div className="event__cards">  
            <input type='text' className="search" required onChange={handleFieldChange} id="search_box" placeholder="Search"/>
        </div>
        <div>
            <select value={category.name} name="category" id="category" onChange={handleControlledInputChange} className='form-control'>
                <option vlaue="0">Filter by Category</option>
                {category.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
        </div>
        <div className="section__content">
            {events.map(event => <MainCard key={event.id} event={event} />)}
        </div>
        </>
    )
}