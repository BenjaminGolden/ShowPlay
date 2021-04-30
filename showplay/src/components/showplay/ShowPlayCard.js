import React  from 'react';
import {Link, useHistory} from 'react-router-dom'
import './ShowPlayMain.css'



export const MainCard = ({activity}) => {
  

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