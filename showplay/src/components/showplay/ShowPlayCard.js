import React  from 'react';
import {Link, useHistory} from 'react-router-dom'
import './ShowPlayCard.css'



export const MainCard = ({activity}) => {
  

    const history = useHistory();


    return(
        <section className="main__list">
            <div className="currentUser__card">
                <h3 className="currentUser__card--location">{activity.city}, {activity.state?.name}</h3>
                
                <div className="currentUser__card--title" className="currentUser__card--rating">{activity.name} <span className='starRating'>{"★".repeat(activity.rating)}</span></div>
                    <div className="currentUser__card--details">
                        <Link  className="details-link" to={`/details/${activity.id}`}>
                        <button type="button" className="details__button"onClick={() => history.push(`/details/${activity.id}`)}>details</button> 
                        </Link>
                    </div>
            </div>
        </section>
    )
    
}