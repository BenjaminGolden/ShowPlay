import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import { getActivitiesByUserId } from '../modules/EventManager'
// import {useHistory} from 'react-router-dom';
import './ShowPlayMain.css'
import StarRateIcon from '@material-ui/icons/StarRate';


export const MainCard = ({activity}) => {
    // const [activities, setActivities] = useState([])
    // const [rating, setRating] = useState(0)

    // const getActivitiesForCurrentUser = () => {
    //     return getActivitiesByUserId(currentUser)
    //     .then(eventsFromAPI => {
    //         setActivities(eventsFromAPI)
    //     })
    // }

    // const handleRatingFilter = (evt) => {
    //     const rating = parseInt(evt.target.value)
    //     setRating(rating)
    // }

    // useEffect(() => {
    //     getActivitiesForCurrentUser();        
    // }, []);

    //i need to access the event object and see the number associated with the rating property
    //then I need to display stars for the number associated with the rating property

    const history = useHistory();

    // const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    // if(currentUser === main.userId){
        return(
            <section className="currentUser__card">
                <div>
                <h3 className="currentUser__card--location">{activity.city}, {activity.state.name}</h3>
                </div>
                <h2 className="currentUser__card--title">{activity.name}</h2>
                
                {/* <div className="currentUser__card--rating">
                    {rating === 0
                    ? activity.map()
                    }
                </div> */}
                <div className="currentUser__card--rating">Rating: <span className='starRating'>{"★".repeat(activity.rating)}</span></div>
                <div className="currentUser__card--details">
                    <Link  className="details-link" to={`/details/${activity.id}`}>
                    <button type="button" onClick={() => history.push(`/details/${activity.id}`)}>details</button> 
                    </Link>
                </div>
            </section>
        )
    
}