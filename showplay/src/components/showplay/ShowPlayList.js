import React, {useState, useEffect} from 'react';
import { getActivitiesByUserId } from '../modules/EventManager';
import { getAllCategories } from '../modules/CategoryManager'
import {MainCard} from './ShowPlayCard'



export const MainList = () => {
    const [activities, setActivities] = useState([])
    const [categories, setCategories] = useState([])
    const [filterId, setFilterId] = useState(0)
    const [search, setSearch] = useState([])
    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    const getActivitiesForCurrentUser = (id) => {
        return getActivitiesByUserId(id)
        .then(eventsFromAPI => {
            setActivities(eventsFromAPI)
            setSearch(eventsFromAPI)
        })

    }

    const getCategories = () => {
        return getAllCategories()
        .then(categoriesFromAPI => {
            setCategories(categoriesFromAPI)
        })
    }    

    const handleActivityFilter = (evt) => {
        const categoryId = parseInt(evt.target.value)
        setFilterId(categoryId)

    }

    const handleSearch =(evt) => {
        evt.preventDefault()
        let searchInput = evt.target.value
        
        if (searchInput.length > 0) {
            let searchMatch = activities.filter(activity => {
                if (activity.name.toLowerCase().includes(searchInput.toLowerCase())) {
                    return true
                }
            })
            setSearch(searchMatch)
        } else {
            setSearch(activities)
        }
    }

    // sort data

    // const [data, setData] = useState([])
    // const [sortType, setSortType] = useState('city')

    // useEffect(() => {
    //     const sortArray = city => {
    //         const 
    //     }
    // })

    



    useEffect(() => {
        getActivitiesForCurrentUser(currentUser);
        getCategories();
        
    }, [currentUser]);



    return(
        <>
        <div className="event__cards">  
            <input type='text' className="search" required onChange={handleSearch} id="search_box" placeholder="Search"/>
        </div>
        {/* <div>
            {search.map(activity => <MainCard key={activity.id}activity={activity}/> )}
        </div> */}
        <div>
            <select value={categories.name} name="category" className='form-control' id="category" onChange={handleActivityFilter}>
                <option value="0">Filter by Category</option> 
                {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}</select>

        </div>
        <div className="section__content">
            { filterId === 0
            ? search.map(activity => <MainCard key={activity.id} activity={activity} />)
            : search.filter(activity => activity.categoryId === filterId).map(activity => <MainCard key={activity.id} activity={activity} />)
            }

        </div>
        </>
    )
}