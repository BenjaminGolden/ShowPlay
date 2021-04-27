const remoteURL = "http://localhost:8088"

export const getAllStates = () => {
    return fetch(`${remoteURL}/states`)
    .then(result => result.json())
}