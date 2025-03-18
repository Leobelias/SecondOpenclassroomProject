const API_BASE_URL = "http://localhost:5678/api"


let allWorks = [];
getWorks().then(works => { allWorks = works; });
document.addEventListener("DOMContentLoaded",Connected);

function getWorks(){
    return fetch (`${API_BASE_URL}/works`)
    .then ((response) =>
        response.json())
    .then (works => {
        console.table(works);
        displayWorks(works);
        return works;
    })
    .catch ((error) => {console.error(error)})

    
}
getCategories();
getWorks();

function getCategories(){
    return fetch (`${API_BASE_URL}/categories`)
    .then ((response) =>
        response.json())
    .then (categories => {
        console.table(categories);
        displayCategories(categories);
        return categories;
    })
    .catch ((error) => {console.error(error)})
}

function displayWorks(works) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = works.map(work => `
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>
    `).join('');
}

function displayCategories(categories){
    const portfolio = document.querySelector('.filtres');
    let allbutton = document.createElement('button');
    allbutton.innerHTML = "Tous";
    allbutton.addEventListener('click', () => displayWorks(allWorks));
    portfolio.appendChild(allbutton)
     categories.map(categorie => {
        let button = document.createElement('button');
        button.innerHTML = categorie.name;
        button.addEventListener('click', () => {
            const filteredWorks = allWorks.filter(work => work.categoryId === categorie.id);
            displayWorks(filteredWorks);
        });
        portfolio.appendChild(button);
     })
}

function Connected() {
    const token = localStorage.getItem("tokenConnexion");
    if (token) {
        document.querySelectorAll(".editmod, .editmod i").forEach(element =>  {
            element.style.display= "flex";
        })
        document.querySelectorAll(".editbtn, .editbtn i").forEach(element =>  {
            element.style.display= "inline-flex";
        })
    const loginElement = document.querySelector("nav ul li:nth-child(3)");
    if (loginElement) {
            loginElement.textContent = "Logoff";
            loginElement.style.cursor = "pointer";

            loginElement.addEventListener("click", () => {
                localStorage.removeItem("tokenConnexion");
                window.location.reload();
            });
        }
    }
}


