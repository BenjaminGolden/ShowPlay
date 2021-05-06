import React, {useState, useEffect} from 'react';
import { getActivitiesByUserId } from '../modules/EventManager';
import { getAllCategories } from '../modules/CategoryManager'
import {MainCard} from './ShowPlayCard'
import './ShowPlayMain.css'



export const MainList = () => {
    const [activities, setActivities] = useState([])
    const [categories, setCategories] = useState([])
    const [filterId, setFilterId] = useState(0)
    const [search, setSearch] = useState([])
    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

        //gets activites associated with the logged in user and sets state for activities and search
    const getActivitiesForCurrentUser = (id) => {
        return getActivitiesByUserId(id)
        .then(eventsFromAPI => {
            setActivities(eventsFromAPI)
            setSearch(eventsFromAPI)
        })

    }
    //populates the category dropdown
    const getCategories = () => {
        return getAllCategories()
        .then(categoriesFromAPI => {
            setCategories(categoriesFromAPI)
        })
    }    
    //sets state for the filter ID
    const handleActivityFilter = (evt) => {
        const categoryId = parseInt(evt.target.value)
        setFilterId(categoryId)

    }
    //search function handles the search functionality of the main list. User can search by city, state, or name of event. 
    const handleSearch =(evt) => {
        evt.preventDefault()
        let searchInput = evt.target.value
        
        if (searchInput.length > 0) {
            let searchMatch = activities.filter(activity => {
                if (activity.name.toLowerCase().includes(searchInput.toLowerCase()) || activity.city.toLowerCase().includes(searchInput.toLowerCase()) || activity.state.name.toLowerCase().includes(searchInput.toLowerCase())) {
                    return true
                }
            })
            setSearch(searchMatch)
        } else {
            setSearch(activities)
        }
    }

    
    useEffect(() => {
        getActivitiesForCurrentUser(currentUser);
        getCategories();
        
    }, [currentUser]);



    return(
        <>
        <section className="event__filter">
        <div >  
            <input type='text' className="search" required onChange={handleSearch} id="search_box" placeholder="Search"/>
        </div>
        <div>
            <select value={categories.name} name="category" className='form-control' id="category" onChange={handleActivityFilter}>
                <option value="0">Filter by Category</option> 
                {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}</select>

        </div>
        </section>
        <div className="section__content">
            { filterId === 0
            ? search.map(activity => <MainCard key={activity.id} activity={activity} />)
            : search.filter(activity => activity.categoryId === filterId).map(activity => <MainCard key={activity.id} activity={activity} />)
            }

        </div>
        </>
    )
}

