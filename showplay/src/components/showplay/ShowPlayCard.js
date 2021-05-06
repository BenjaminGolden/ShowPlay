
import {Link, useHistory} from 'react-router-dom'
import './ShowPlayCard.css'


//MainCard is responsible for displaying the event card in the main view of the application
export const MainCard = ({activity}) => {
    const history = useHistory();
              
    return(
        <>
        <section className="main__list">
            <div className="currentUser__card">
                <div>
                <h3 className="currentUser__card--location"> {activity.city}, {activity.state.name} </h3>
                </div>
                <div className="currentUser__card--title" className="currentUser__card--rating">{activity.name} <span>{"★".repeat(activity.rating)}</span></div>
                    <div className="currentUser__card--details">
                        <Link  className="details-link" to={`/details/${activity.id}`}>
                        <button type="button" className="details__button"onClick={() => history.push(`/details/${activity.id}`)}>details</button> 
                        </Link>
                    </div>
            </div>
        </section>
        </>
    )
    
}