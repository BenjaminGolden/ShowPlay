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

    const handleCategoryInputChange = (category) => {
        const newCategory = { ...category }
        let selectedVal = event.target.value
        if (event.target.id.includes('id')) {
            selectedVal = parseInt(selectedVal)
        }
        newCategory[event.target.id] = selectedVal
        setCategory(newCategory)
    }

    const handleStateInputChange = (state) => {
        const newState = { ...state }
        let selectedVal = event.target.value
        if (event.target.id.includes('id')) {
            selectedVal = parseInt(selectedVal)
        }
        newState[event.target.id] = selectedVal
        setState(newState)
    }

    useEffect(() => {
        getAllStates()
        .then(statesFromAPI => {
            setState(statesFromAPI)
        });
    },[]);

    useEffect(() => {
        getAllCategories()
        .then(categoryFromAPI => {
            setState(categoryFromAPI)
        });
    }, []);

    useEffect(() => {
        getCategories();
        getStates();
    })

    const history = useHistory();

    const handleSaveEvent = (event) => {
        event.preventDefault()

        const stateId = event.stateId
        const categoryId = event.categoryId
        const city = event.city

        if (stateId === 0 || categoryId === 0 || city === 0) {
            window.alert("please select a state, city, and a category")
        } if(event.target.id === 'add'){
            addEvent(event)
                .then(() => history.push('/create'))
        } else {
            addEvent(event)
            .then(() => history.push('/'))
        }
    }

    return (
        <form className="eventForm">
            <h2 className="event__title">New Event</h2>
            <div>
            <select value={state.name} name="category" id="category" onChange={handleStateInputChange} className='form-control'>
                <option vlaue="0">Select a State</option>
                {state.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>
            </div>
            <div>
            <select value={state.name} name="state" id="state" onChange={handleCategoryInputChange} className='form-control'>
                <option vlaue="0">Filter by Category</option>
                {category.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            </div>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="name">description</label>
                    <input type="text" id="description" onChange={handleInputChange} required autoFocus className="form__control" placeholder="description" value={event.description}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="date">date</label>
                    <input type="date" id="date" onChange={handleInputChange} required autoFocus className="form__control" placeholder="date" value={event.date}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="URL">URL</label>
                    <input type="text" id="url" onChange={handleInputChange} required autoFocus className="form__control" placeholder="URL" value={event.URL}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="Rating">Rating</label>
                    <input type="text" id="rating" onChange={handleInputChange} required autoFocus className="form__control" placeholder="rating" value={event.rating}/>
                </div>
            </fieldset>
            <button className="button__save" id="return"onClick={handleSaveEvent}>Save and return</button>
            <button className="button__save" id="add"onClick={handleSaveEvent}>Save and add another</button>

        </form>
    )

}