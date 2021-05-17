export const getEventricSchedule = () => {
    return fetch(`https://my.eventric.com/portal/api/v5/tour/5ca7040604fc58601729713b112da87b76024ec4?version=100`)
    .then(result => result.json())
}