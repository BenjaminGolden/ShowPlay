const remoteURL = "http://localhost:8088"

export const getAllCategories = () => {
    return fetch(`${remoteURL}/categories`)
    .then(result => result.json())
}