import React  from 'react';
import {Link, useHistory} from 'react-router-dom'
import './ShowPlayCard.css'



export const MainCard = ({activity}) => {
  

    const history = useHistory();

    // const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    // if(currentUser === main.userId){
    return(
        <section >
            <div className="currentUser__card">
                <h3 className="currentUser__card--location">{activity.city}, {activity.state?.name}</h3>
                
                <h2 className="currentUser__card--title">{activity.name}<div className="currentUser__card--rating">Rating: <span className='starRating'>{"★".repeat(activity.rating)}</span></div></h2>
                    <div className="currentUser__card--details">
                        <Link  className="details-link" to={`/details/${activity.id}`}>
                        <button type="button" className="details"onClick={() => history.push(`/details/${activity.id}`)}>details</button> 
                        </Link>
                    </div>
            </div>
        </section>
    )
    
}