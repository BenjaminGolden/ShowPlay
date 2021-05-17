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
        newActivity[evt.target.id] = parseInt(selectedVal)
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
    }, [activityId])

    return (
        <>
         <form className="eventForm">
            <h2 className="event__title">{activity.name}</h2>
            <div className="event__selector">
                {/* City */}
                <div className="event__cards">City:   
                <input value={activity.city} type='text' className="city" required onChange={handleFieldChange} id="city" placeholder="City name"/>
                </div>
            {/* State */}
                <div>State:  
                <select value={activity.stateId} name="stateId" id="stateId" onChange={handleInputChange} className='state'>
                    <option value="0">Select a State</option>
                    {state.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
                </div>
                {/* Category */}
                <div>Category: 
                <select value={activity.categoryId} name="categoryId" id="categoryId" onChange={handleInputChange} className='category'>
                    <option vlaue="0">Select a Category</option>
                    {category.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                </div>
            </div>
                {/* Name */}
            <fieldset>
                <div className="form__group">
                    <label htmlFor="name"></label>
                    <textarea type="text" id="name" onChange={handleFieldChange} required autoFocus className="form__control" placeholder="name of event" value={activity.name} rows="1" cols="40"/>
                </div>
            </fieldset>
            {/* Description */}
            <fieldset>
                <div className="form__group">
                    <label htmlFor="description"></label>
                    <textarea type="text" id="description" onChange={handleFieldChange} required autoFocus className="form__control" placeholder="description" value={activity.description} rows="4" cols="75"></textarea>
                </div>
            </fieldset>
            {/* date */}
            <fieldset>
                <div className="form__group">
                    <label htmlFor="date"></label>
                    <input type="date" id="date" onChange={handleFieldChange} required autoFocus className="form__control" placeholder="date" value={activity.date}/>
                </div>
            </fieldset>
            {/* text */}
            <fieldset>
                <div className="form__group">
                    <label htmlFor="URL"></label>
                    <textarea type="text" id="url" onChange={handleFieldChange} required autoFocus className="url" placeholder="URL" value={activity.url} rows="1" cols="40"/>
                </div>
            </fieldset>
            {/* Rating */}
            <fieldset>
            <select value={activity.rating} name="rating" id="rating" onChange={handleInputChange} className='form-control'>
                <option value="">Select a Rating</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            {/* Submit */}
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingEvent}
              className="button__edit--save"
            > Submit</button>
            </fieldset>
        </form>
        </>
    )


}