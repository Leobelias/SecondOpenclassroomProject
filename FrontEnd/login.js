const API_BASE_URL = "http://localhost:5678/api"

function login(){
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#motdepasse').value;

    let data = {
        email: email,
        password: password,
    }
    console.log(data)

    fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data),
    })
    .then ((response) => {

        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: Identifiants incorrects`);
        }
        return response.json();
    })
    .then ((response) => {
        localStorage.setItem('tokenConnexion', response.token)
        window.location.href = "index.html";
    } )

    .catch ((error) => {console.error(error)})
}  

function button(){
    const loginButton = document.querySelector('#submit');
    loginButton.addEventListener('click', () => login())
}

button();