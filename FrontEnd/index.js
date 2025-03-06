const API_BLUEL = "http://localhost:5678/api/"

function getApiworks(){
    return fetch (`${API_BLUEL}/works`)
    .then ((Response) =>
        Response.json(),
        console.log("Oui"))
    .then (works => {
        console.table(works);
        return works;
    })
    .catch ((error) => {console.error(error)})
}

getApiworks();
