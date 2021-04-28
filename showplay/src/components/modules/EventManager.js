const remoteURL = "http://localhost:8088"

export const getAllEvents = () => {
    return fetch(`${remoteURL}/events?_expand=category&_expand=state`)
    .then(result => result.json())
}

export const getEventById = (id) => {
    return fetch(`${remoteURL}/events/${id}?_expand=category&_expand=state`)
    .then(result => result.json())
}

export const deleteEvent = (id) => {
    return fetch(`${remoteURL}/events/${id}`, {
        method: 'DELETE'   
    }).then(result => result.json())
}

export const addEvent = (newEvent) => {
    return fetch(`${remoteURL}/events`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        }, 
        body: JSON.stringify(newEvent)
    }).then(result => result.json())
}

export const updateEvent = (editedEvent) => {
    return fetch(`${remoteURL}/events/${editedEvent.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedEvent)
    }).then(result => result.json());
}