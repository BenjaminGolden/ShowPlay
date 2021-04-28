import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addEvent } from '../modules/EventManager';
import { getAllStates } from '../modules/LocationManager'
import { getAllCategories } from '../modules/CategoryManager'

import './ShowPlayAdd.css'

export const NewEvent = () => {
    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState([])
    const [state, setState] = useState([])
    const [city, setCity] = useState([])

    const handleInputChange = (event) => {
        const newEvent = { ...event }
        let selectedVal = event.target.value
        if (event.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }
        newEvent[event.target.id] = selectedVal
        setEvent(newEvent)
    }

    const getCategories = () => {
        return getAllCategories()
        .then(categoriesFromAPI => {
            setCategory(categoriesFromAPI)
        })
    }    

    const getStates = () => {
        return getAllStates()
        .then(statesFromAPI => {
            setState(statesFromAPI)
        })
    }

    useEffect(() => {
        getCategories();
        getStates();
    },[]);

    const history = useHistory();

    const handleSaveEvent = (event) => {
        event.preventDefault()
        setIsLoading(true)

        const stateId = event.stateId
        const categoryId = event.categoryId
        const city = event.city

        if (stateId === 0 || categoryId === 0 || city === 0) {
            window.alert("please select a state, city, and a category")
        } 
        // if(event.target.id === 'add')
            addEvent(event)
                .then(() => history.push('/'))
        // } else {
        //     addEvent(event)
        //     .then(() => history.push('/'))
        // }
    }

    return (
        <form className="eventForm">
            <h2 className="event__title">New Event</h2>
            <div>
            <select value={state.name} name="category" id="category" onChange={handleInputChange} className='form-control'>
                <option vlaue="0">Select a State</option>
                {state.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>
            </div>
            <div className="event__cards">  
            <input type='text' className="search" required onChange={handleInputChange} id="city__search" placeholder="City name"/>
            </div>
            <div>
            <select value={category.name} name="category" id="categoory" onChange={handleInputChange} className='form-control'>
                <option vlaue="0">Select a Category</option>
                {category.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            </div>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="name"></label>
                    <input type="text" id="name" onChange={handleInputChange} required autoFocus className="form__control" placeholder="name of event" value={event.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="description"></label>
                    <textarea type="text" id="description" onChange={handleInputChange} required autoFocus className="form__control" placeholder="description" value={event.description} rows="4" cols="75"></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="date"></label>
                    <input type="date" id="date" onChange={handleInputChange} required autoFocus className="form__control" placeholder="date" value={event.date}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="URL"></label>
                    <input type="text" id="url" onChange={handleInputChange} required autoFocus className="form__control" placeholder="URL" value={event.URL}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="Rating"></label>
                    <input type="text" id="rating" onChange={handleInputChange} required autoFocus className="form__control" placeholder="rating" value={event.rating}/>
                </div>
            </fieldset>
            <button className="button__save" id="return"onClick={handleSaveEvent}>Save and return</button>
            <button className="button__save" id="add"onClick={handleSaveEvent}>Save and add another</button>

        </form>
    )

}