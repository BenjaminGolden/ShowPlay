const remoteURL = "http://localhost:8088"

export const getLoggedInUser = (userId) => {
    return fetch(`${remoteURL}/users?id=${userId}`)
    .then(result => result.json())
}