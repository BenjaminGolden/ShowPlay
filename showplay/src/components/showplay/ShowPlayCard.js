import React, {useState, useEffect}  from 'react';
import {Link, useHistory} from 'react-router-dom'
import './ShowPlayCard.css'



export const MainCard = ({activity}) => {
    const history = useHistory();
//   const [location, setLocation] = useState([])

  //each time a new location appears, save that new location once. once we have that location, we can then display all events for that one location. 

//   const createHeader = () => {
//         const currentLocation = activity.city && activity?.state?.name 
//         if (currentLocation){
//             console.log(currentLocation)
//             return currentLocation;
//         }
//   }
    
    // useEffect(() => {
    //     createHeader()
    // }, [])
              
    return(
        <>
        <section className="main__list">
            <div className="currentUser__card">
                <div>
                {/* <h3 className="currentUser__card--location"> {activity.city}, {activity.state.name} </h3> */}
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