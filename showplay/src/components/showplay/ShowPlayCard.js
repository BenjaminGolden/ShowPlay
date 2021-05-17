
import {Link, useHistory} from 'react-router-dom'
import './ShowPlayCard.css'


//MainCard is responsible for displaying the event card in the main view of the application
export const MainCard = ({activity}) => {
    const history = useHistory();
              
    return(
        <>
        <section className="main__list">
         <Link  className="details-link" to={`/details/${activity.id}`}>
            <div className="currentUser__card">
                <div className="currentUser__card--title" className="currentUser__card--rating">{activity.name} <span>{"★".repeat(activity.rating)}</span></div>
                    <div className="currentUser__card--details">
                        <button type="button" className="details__button"onClick={() => history.push(`/details/${activity.id}`)}>Details</button> 
                    </div>
            </div>
        </Link>
        </section>
        </>
    )
    
}