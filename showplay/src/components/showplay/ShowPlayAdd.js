import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addEvent } from '../modules/EventManager';
import { getAllStates } from '../modules/LocationManager'
import { getAllCategories } from '../modules/CategoryManager'
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
        rating: 0
    })
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState([])
    const [state, setState] = useState([])

    //handles input change in each of the input boxes except for ratings and sets state for activities
    const handleInputChange = (event) => {
        const newActivity = { ...activity }
        let selectedVal = event.target.value
        if (event.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }
        newActivity[event.target.id] = selectedVal
        setActivity(newActivity)
    }

    //handles the rating change and sets state for Activities
    const handleRatingChange = (event) => {
        const newActivity = { ...activity }
        let selectedVal = event.target.value
        if (event.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }
        newActivity[event.target.id] = parseInt(selectedVal)
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


    //populates the category and state dropdown selection
    useEffect(() => {
        getCategories();
        getStates();
    },[]);

    const history = useHistory();

    const handleSaveActivity = (evt) => {
        evt.preventDefault()
        setIsLoading(true)

        const stateId = activity.stateId
        const categoryId = activity.categoryId
        const city = activity.city

        if (stateId === 0 || categoryId === 0 || city === '') {
            window.alert("please select a state, city, and a category")
            setActivity({
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
            return history.push('/create')
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
                    rating: 0
                }))
                
        } else {
            addEvent(activity)
            .then(() => history.push('/'))
        }
    }

    return (
        <>
        <form >
            <div className="add">
            <section className="eventForm">
            <h2 className="event__title">Create a New Event</h2>
            <div className="state__select">
                         {/* date */}
                <div className="form__group">
                    <label htmlFor="date"></label>
                    <input type="date" id="date" onChange={handleInputChange} required autoFocus className="form__control" placeholder="date" value={activity.date}/>
                </div>
                            {/* city */}
                <div className="event__cards">  
                <input value={activity.city} type='text' className="search" required onChange={handleInputChange} id="city" placeholder="City name"/>
                </div>
                        {/* state */}
                <div >
                <select value={activity.stateId} name="stateId" id="stateId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a State</option>
                    {state.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
                </div>
                            {/* category */}
                <div>
                <select value={activity.categoryId} name="categoryId" id="categoryId" onChange={handleInputChange} className='form-control'>
                    <option value="0">Select a Category</option>
                    {category.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                </div>
            </div>
                        {/* name of event */}
            <fieldset>
                <div className="form__group">
                    <label htmlFor="name"></label>
                    <input type="text" id="name" onChange={handleInputChange} required autoFocus className="form__control" placeholder="name of event" value={activity.name}/>
                </div>
            </fieldset>
                        {/* description */}
            <fieldset>
                <div className="form__group">
                    <label htmlFor="description"></label>
                    <textarea type="text" id="description" onChange={handleInputChange} required autoFocus className="form__control" placeholder="description" value={activity.description} rows="4" cols="75"></textarea>
                </div>
            </fieldset>
                        {/* url */}
            <fieldset>
                <div className="form__group">
                    <label htmlFor="URL"></label>
                    <input type="text" id="url" onChange={handleInputChange} required autoFocus className="form__control" placeholder="URL" value={activity.url}/>
                </div>
            </fieldset>
                        {/* rating */}
            <fieldset>  <select value={activity.rating} name="rating" id="rating" onChange={handleRatingChange} className='form-control'>
                <option value="0">Select a Rating:  </option>
                <option value="1">★</option>
                <option value="2">★★</option>
                <option value="3">★★★</option>
                <option value="4">★★★★</option>
                <option value="5">★★★★★</option>
            </select>  
            </fieldset>
                        {/* save button */}
            <div className="save__buttons">
            <button className="button__save" id="return"onClick={handleSaveActivity} >Save and return</button>
            <button className="button__save" id="add"onClick={handleSaveActivity} >Save and add another</button>
            </div>
        </section>
        </div>
        </form>
        </>
    )

}