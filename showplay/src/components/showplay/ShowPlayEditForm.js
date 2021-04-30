import React, { useState, useEffect } from 'react'
import './ShowPlayEdit.css'
import { getEventById, updateEvent } from '../modules/EventManager'
import { getAllStates } from '../modules/LocationManager'
import { getAllCategories } from '../modules/CategoryManager'
import { useParams, useHistory } from 'react-router-dom'

export const EventEditForm = () => {
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
            rating: 0
    })

    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState([])
    const [category, setCategory] = useState([])   
    const [state, setState] = useState([])
     
    const {activityId} = useParams();
    const history = useHistory();

    const handleFieldChange = evt => {
        const stateToChange = { ...activity };
        stateToChange[evt.target.id] = evt.target.value
        setActivity(stateToChange);
    };

    const handleInputChange = (evt) => {
        const newActivity = { ...activity }
        let selectedVal = evt.target.value
        if (evt.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newActivity[evt.target.id] = selectedVal
        setActivity(newActivity)
    }

    
    const getStates = () => {
        return getAllStates()
        .then(statesFromAPI => {
            setState(statesFromAPI)
        })
    }

    const getCategories = () => {
        return getAllCategories()
        .then(categoriesFromAPI => {
            setCategory(categoriesFromAPI)
        })
    }    

    useEffect(() => {
        getStates();
        getCategories();
        }, [])
    



    const updateExistingEvent = (evt) => {
        evt.preventDefault()
        setIsLoading(true);

        const editedActivity = {
            userId: currentUser,
            name: activity.name,
            stateId: activity.stateId,
            city: activity.city,
            categoryId: activity.categoryId,
            description: activity.description,
            date: activity.date,
            url: activity.url,
            rating: activity.rating,
            id: activityId

        };

        updateEvent(editedActivity)
        .then(() => history.push('/'))
    }

    useEffect(() => {
        getEventById(activityId)
        .then(activity => {
            setActivity(activity);
            setIsLoading(false);
        })
    }, [])

    return (
        <>
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
            <input value={activity.city} type='text' className="search" required onChange={handleFieldChange} id="city" placeholder="City name"/>
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
                    <input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form__control" placeholder="name of event" value={activity.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="description"></label>
                    <textarea type="text" id="description" onChange={handleFieldChange} required autoFocus className="form__control" placeholder="description" value={activity.description} rows="4" cols="75"></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="date"></label>
                    <input type="date" id="date" onChange={handleFieldChange} required autoFocus className="form__control" placeholder="date" value={activity.date}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="URL"></label>
                    <input type="text" id="url" onChange={handleFieldChange} required autoFocus className="form__control" placeholder="URL" value={activity.url}/>
                </div>
            </fieldset>
            <select value={activity.rating} name="rating" id="rating" onChange={handleInputChange} className='form-control'>
                <option value="">Select a Rating</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingEvent}
              className="button__edit--save"
            > Submit</button>
        </form>
        </>
    )


}