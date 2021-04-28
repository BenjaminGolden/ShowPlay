import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
// import {useHistory} from 'react-router-dom';
import './ShowPlayMain.css'

export const MainCard = ({event}) => {

    const history = useHistory();
    // const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    // if(currentUser === main.userId){
        return(
            <section className="currentUser__card">
                <div>
                <h3 className="currentUser__card--location">{event.city}, {event.state.name}</h3>
                </div>
                <h2 className="currentUser__card--title">{event.name}</h2>
                {/* <StarRating count={5} size={40} value={rating} activeColor={`#23383f`} inactiveColor={`#ddd`} onChange={handleChange}/> */}
                <div className="currentUser__card--rating">{event.rating}</div>
                <div className="currentUser__card--details">
                    <Link  className="details-link" to={`/details/${event.id}`}>
                    <button type="button" onClick={() => history.push(`/details/${event.id}`)}>details</button> 
                    </Link>
                </div>
            </section>
        )
    
}
    // const [rating, setRating] = useState()

    // const StarRating = ({count, value, inactiveColor='#ddd', size=24, activeColor='#f00', onChange}) => {
    //     const stars = Array.from({length: count}, () => 'star')

    //     const handleChange = (value) => {
    //         onChange(value + 1);
    // }

    
    // const handleChangeSetRating = (value) => {
    //     setRating(value);

                /* <div>
                    {stars.map((s, index) => {
                        let style = inactiveColor;
                        if (index < value) {
                            style=activeColor;
                        }
                        return(
                            <span className={"star"}
                            key={index}
                            style={{color: style, width:size, height: size, fontSize: size}}
                            onClick={() => handleChange(index)}>{s}</span>
                        )
                    })}
                    {value}
                </div> */

{/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg> */}