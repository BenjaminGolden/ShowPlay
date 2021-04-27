import React, {useState} from 'react';
import {Link} from 'react-router-dom'
// import {useHistory} from 'react-router-dom';
import './ShowPlayMain.css'

export const MainCard = ({event}) => {
    const [rating, setRating] = useState()

    const StarRating = ({count, value, inactiveColor='#ddd', size=24, activeColor='#f00', onChange}) => {
        const stars = Array.from({length: count}, () => 'star')

        const handleChange = (value) => {
            onChange(value + 1);
    }

    
    const handleChangeSetRating = (value) => {
        setRating(value);
    }
    // const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    // if(currentUser === main.userId){
        return(
            <section className="currentUser__card">
                <div>
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
                </div>
                return (
                <div>
                <h3 className="currentUser__card--location">{event.city},{event.state}</h3>
                </div>
                <h2 className="currentUser__card--title">{event.name}</h2>
                <StarRating count={5} size={40} value={rating} activeColor={`#23383f`} inactiveColor={`#ddd`} onChange={handleChange}/>
                <div className="currentUser__card--rating">{event.rating}</div>
                <div className="currentUser__card--details">
                    <Link className="details-link" to="/details">details</Link>
                </div>
            </section>
        )
        )
     }
    
     
}