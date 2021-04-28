import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { getAllEvents } from '../modules/EventManager';
import { getAllCategories } from '../modules/CategoryManager'
import {MainCard} from './ShowPlayCard'
import { getEventByCategory } from '../modules/CategoryManager'

export const MainList = () => {
    const [activity, setActivity] = useState([])
    const [category, setCategory] = useState([])
    const [isSelected, setIsSelected] = useState({})

    const getEvents = () => {
        return getAllEvents()
        .then(eventsFromAPI => {
            setActivity(eventsFromAPI)
        })
    }

    const getCategories = () => {
        return getAllCategories()
        .then(categoriesFromAPI => {
            setCategory(categoriesFromAPI)
        })
    }    

    const history = useHistory();

    // const handleControlledInputChange = (category) => {
    //     const newCategory = { ...category }
    //     let selectedVal = event.target.value
    //     if (event.target.id.includes('id')) {
    //         selectedVal = parseInt(selectedVal)
    //     }
    //     newCategory[event.target.id] = selectedVal
    //     setCategory(newCategory)
        
    // }

    const handleFieldChange = (event) => {
        const stateToChange = { ...event }
        stateToChange = event.target.value
        setActivity(stateToChange);
    }

    // const getAllEventEntries = () => {
    //     getAllEvents()
    //     .then(data => {
    //         data.sort()
    //     })
    // }

    const getEventsByCategory = (id) => {
        return getEventByCategory(id)
        .then(eventsFromAPI => {
            console.log(eventsFromAPI)
            setIsSelected(eventsFromAPI)
        })
    }
    

    useEffect(() => {
        const isSelected = {};

        const categoryNames = category.map(c => c.name)
        categoryNames.forEach(categoryName => isSelected[categoryName] = false)

        setIsSelected(isSelected);
    }, [])

    useEffect(() => {
        getEvents();
        getCategories();
        getEventByCategory();
        
    }, []);

    //Still working on filtering events by category. 
    return(
        <>
        <div className="event__cards">  
            <input type='text' className="search" required onChange={handleFieldChange} id="search_box" placeholder="Search"/>
        </div>
        <div>
            <select value={category.name} name="category" className='form-control' id="category" onChange={getEventByCategory}>
                <option vlaue="0">Filter by Category</option> 
                {category.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}</select>

            {/* <select value={category.name} name="category" className='form-control' id="category" onChange={() => setIsSelected({ ...isSelected, [category.name] : !isSelected[category.name]})}>
                <option vlaue="0">Filter by Category</option>
                {category.filter(c => isSelected[category.name])}{category.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select> */}
        </div>
        <div className="section__content">
            {activity.map(activity => <MainCard key={activity.id} activity={activity} />)}
        </div>
        </>
    )
}