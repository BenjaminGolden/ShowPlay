import React, {useState, useEffect} from 'react';
import { getActivitiesByUserId } from '../modules/EventManager';
import { getAllCategories } from '../modules/CategoryManager'
import {MainCard} from './ShowPlayCard'
import './ShowPlayMain.css'



export const MainList = () => {
    const [activities, setActivities] = useState([])
    const [categories, setCategories] = useState([])
    const [filterId, setFilterId] = useState(0)
    const [search, setSearch] = useState("")
    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    const getActivitiesForCurrentUser = (id) => {
        return getActivitiesByUserId(id)
        .then(eventsFromAPI => {
            setActivities(eventsFromAPI)
            // setSearch(eventsFromAPI)
        })

    }
   
    const groupByLocation = () => {
        const cityGroups = activities.reduce(function (r, a) {
            r[`${a.city}, ${a.state.name}`] = r[`${a.city}, ${a.state.name}`] || [];
            r[`${a.city}, ${a.state.name}`].push(a);
            return r;
        }, Object.create(null));

    return cityGroups
    }

    useEffect(() => {
        groupByLocation();
    },[activities])

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
        
        // if (searchInput.length > 0) {
        //     let searchMatch = activities.filter(activity => {
        //         if (activity.name.toLowerCase().includes(searchInput.toLowerCase()) || activity.city.toLowerCase().includes(searchInput.toLowerCase()) || activity.state.name.toLowerCase().includes(searchInput.toLowerCase())) {
        //             return true
        //         }
        //     })
        //     setSearch(searchMatch)
        // } else {
            setSearch(searchInput)
        // }
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
                <option value="0">All Events</option> 
                {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}</select>

        </div>
        </section>
        <div className="section__content">
            {Object.entries(groupByLocation()).map(([key, value])=> {
                // console.log(key, value)
                let userActivities = value
                // console.log("before filter", userActivities)
                if (search !== ""){
                    userActivities = value.filter(activity => activity.name.toLowerCase().includes(search.toLowerCase()) || activity.city.toLowerCase().includes(search.toLowerCase()) || activity.state.name.toLowerCase().includes(search.toLowerCase()))
                }
                   if (filterId !== 0){
                       userActivities = value.filter(activity => activity.categoryId === filterId)
                   }
                //    console.log("after filter", userActivities)
                   if (userActivities.length > 0) {
                    return (
                    <div key={key}>
                        <h2>{key}</h2>
                        {userActivities.map(activity => <MainCard key={activity.id} activity={activity} />)}
                    </div>
                    )
                   } 
                    
                }
                 
             
            )}
        </div>
        {/* <div className="section__content">
            { filterId === 0
            ? search.map(activity => <MainCard key={activity.id} activity={activity} />)
            : search.filter(activity => activity.categoryId === filterId).map(activity => <MainCard key={activity.id} activity={activity} />)
            }

        </div> */}
        </>
    )
}

