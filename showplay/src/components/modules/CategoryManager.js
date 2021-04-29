const remoteURL = "http://localhost:8088"

export const getAllCategories = () => {
    return fetch(`${remoteURL}/categories`)
    .then(result => result.json())
}

export const getEventByCategory = (id) => {
    return fetch(`${remoteURL}/category/${id}?_embed=events`)
    .then(result => result.json())
}