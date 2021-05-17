
import React, {useState, useEffect} from 'react';
import {getEventricSchedule} from '../../Settings'
// import {Link, useHistory} from 'react-router-dom'
// import { getEventByCategory } from '../../modules/CategoryManager';

export const TourItinerary = () => {
    const [itinerary, setItinerary] = useState([]);

    const getSchedule = () => {
        return getEventricSchedule()
        .then(schedule => {
            console.log(schedule)
            setItinerary(schedule)
        })
    }

    useEffect(() => {
        getSchedule()
    },[])

    return (
        <div>

        </div>
    )
}
