import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addEvent } from '../modules/EventManager';
import { getAllStates } from '../modules/LocationManager'
import { getAllCategories } from '../modules/CategoryManager'
import { getAllEvents} from '../modules/EventManager'

import './ShowPlayAdd.css'

export const NewEvent = () => {
const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    const [activity, setActivity] = useState({
        userId: currentUser,
        stateId: 0,
        city: '',
        categoryId: 0,
        name: '',
        description: '',
        date: '',
        url: '',
        rating: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState([])
    const [state, setState] = useState([])
    const [city, setCity] = useState([])

    const handleInputChange = (event) => {
        const newActivity = { ...activity }
        let selectedVal = event.target.value
        if (event.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }
        newActivity[event.target.id] = selectedVal
        setActivity(newActivity)
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

    // const getEvents = () => {
    //     return getAllEvents()
    //     .then(eventsFromAPI => {
    //     setActivity(eventsFromAPI)
    // })
    // }

    useEffect(() => {
        getCategories();
        getStates();
    },[]);

    const history = useHistory();

    const handleSaveActivity = (evt) => {
        evt.preventDefault()
        setIsLoading(true)

        const stateId = evt.stateId
        const categoryId = evt.categoryId
        const city = evt.city

        if (stateId === 0 || categoryId === 0 || city === "") {
            window.alert("please select a state, city, and a category")
        } if(evt.target.id === 'add'){        
            addEvent(activity)
                .then(() => setActivity({
                    userId: currentUser,
                    stateId: 0,
                    city: '',
                    categoryId: 0,
                    name: '',
                    description: '',
                    date: '',
                    url: '',
                    rating: ''
                }))
                
        } else {
            addEvent(activity)
            .then(() => history.push('/'))
        }
    }

    return (
        <form className="eventForm">
            <h2 className="event__title">New Event</h2>
            <div>
            <select value={activity.stateId} name="stateId" id="stateId" onChange={handleInputChange} className='form-control'>
                <option value="0">Select a State</option>
                {state.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
            </select>
            </div>
            <div className="event__cards">  
            <input value={activity.city} type='text' className="search" required onChange={handleInputChange} id="city" placeholder="City name"/>
            </div>
            <div>
            <select value={activity.categoryId} name="categoryId" id="categoryId" onChange={handleInputChange} className='form-control'>
                <option vlaue="0">Select a Category</option>
                {category.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            </div>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="name"></label>
                    <input type="text" id="name" onChange={handleInputChange} required autoFocus className="form__control" placeholder="name of event" value={activity.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="description"></label>
                    <textarea type="text" id="description" onChange={handleInputChange} required autoFocus className="form__control" placeholder="description" value={activity.description} rows="4" cols="75"></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="date"></label>
                    <input type="date" id="date" onChange={handleInputChange} required autoFocus className="form__control" placeholder="date" value={activity.date}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="URL"></label>
                    <input type="text" id="url" onChange={handleInputChange} required autoFocus className="form__control" placeholder="URL" value={activity.url}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="Rating"></label>
                    <input type="text" id="rating" onChange={handleInputChange} required autoFocus className="form__control" placeholder="rating" value={activity.rating}/>
                </div>
            </fieldset>
            <button className="button__save" id="return"onClick={handleSaveActivity}>Save and return</button>
            <button className="button__save" id="add"onClick={handleSaveActivity}>Save and add another</button>

        </form>
    )

}