const API_BASE_URL = "http://localhost:5678/api"


let allWorks = [];
getWorks().then(works => { 
    allWorks = works;
    deleteWork(works);
    displayWorks(works);
    displayWorksInModale(works);
})
document.addEventListener("DOMContentLoaded",Connected);

function getWorks(){
    return fetch (`${API_BASE_URL}/works`)
    .then ((response) =>
        response.json())
    .then (works => {
        console.table(works);
        displayWorks(works);
        displayWorksInModale(works);
        return works;
    })
    .catch ((error) => {console.error(error)})

    
}
getCategories();

function getCategories(){
    const category = document.querySelector('#category')
    return fetch (`${API_BASE_URL}/categories`)
    .then ((response) =>
        response.json())
    .then (categories => {
        console.table(categories);
        displayCategories(categories);

        category.innerHTML = categories.map(category => `
            <option value="${category.id}">${category.name}</option>
            `).join('');

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
    portfolio.innerHTML = '';
    let allbutton = document.createElement('button');
    allbutton.innerHTML = "Tous";
    allbutton.addEventListener('click', () => {
        displayWorks(allWorks);
        activateFilter(allbutton);
    });
    portfolio.appendChild(allbutton)
     categories.forEach(categorie => {
        let button = document.createElement('button');
        button.innerHTML = categorie.name;
        button.addEventListener('click', () => {
            const filteredWorks = allWorks.filter(work => work.categoryId === categorie.id);
            displayWorks(filteredWorks);
            activateFilter(button);
        });
        portfolio.appendChild(button);
     })
}

function activateFilter(activebutton) {
    const buttons = document.querySelectorAll('.filtres button');
    buttons.forEach(button => {
        button.classList.remove('filtresactivated');
    })
    activebutton.classList.add('filtresactivated');
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

        document.querySelectorAll(".filtres").forEach(element => {
            element.style.display= "none";
        })


    const loginElement = document.querySelector("nav ul li:nth-child(3)");
    if (loginElement) {
            loginElement.textContent = "logout";
            loginElement.style.cursor = "pointer";

            loginElement.addEventListener("click", () => {
                localStorage.removeItem("tokenConnexion");
                window.location.reload();
            });
        }
    }
}

function displayWorksInModale(works) {
    const galleryModale = document.querySelector('.galleryModale');
    galleryModale.innerHTML = works.map(work => `
        <article>
            <img src="${work.imageUrl}" alt="${work.title}">
            <i class= "fa-solid fa-trash-can" id="${work.id}"></i>
        </article>`
    ).join('');
    const deletebutton = document.querySelectorAll('article i');
    deletebutton.forEach(button => {
        button.addEventListener('click', () => {
            deleteWork(button.id);
        });
    });
}

function deleteWork(IDWork) {
    const token = localStorage.getItem("tokenConnexion")
    console.log(`Suppression du work avec ID: ${IDWork}`);
    fetch(`${API_BASE_URL}/works/${IDWork}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La suppression a échoué');
        }
        const workToDelete = document.getElementById(IDWork);
        if (workToDelete) {
            workToDelete.parentElement.remove();
        }
        getWorks();
    })
    .catch(error => {
        console.error('Erreur de suppression :', error);
    });
}




function deleteWork(IDWork) {
    const token = localStorage.getItem("tokenConnexion")
    console.log(`Suppression du work avec ID: ${IDWork}`);
    fetch(`${API_BASE_URL}/works/${IDWork}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La suppression a échoué');
        }
        const workToDelete = document.getElementById(IDWork);
        if (workToDelete) {
            workToDelete.parentElement.remove()
        }
    })
    .catch(error => {
        console.error('Erreur de suppression :', error);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const closeModal = document.querySelectorAll('.modaleDelete .fa-xmark, .modaleAdd .fa-xmark');
    const modalesContainer = document.querySelector('.modalesContainer');

    closeModal.forEach(closeModal => {
        closeModal.addEventListener('click', () =>
            modalesContainer.style.display= 'none',
    )});

    const openModalDel = document.querySelector('#portfolio span');
    if (openModalDel) {
        openModalDel.addEventListener('click', () => {
            document.querySelector('.modaleAdd').style.display = 'none';
            document.querySelector('.modaleDelete').style.display = 'flex'
            document.querySelector('.modalesContainer').style.display = 'flex';
        } )
    }
    const openModalAdd = document.querySelector(".modaleDelete input");
    if (openModalAdd) {
        openModalAdd.addEventListener('click', () => {
            document.querySelector('.modaleAdd').style.display = 'flex';
            document.querySelector('.modaleDelete').style.display = 'none';
        })
    }

    const backDel = document.querySelector(".modaleAdd .fa-arrow-left");
    if (backDel) {
        backDel.addEventListener('click', () => {
            document.querySelector('.modaleAdd').style.display = 'none';
            document.querySelector('.modaleDelete').style.display = 'flex';
        })
    }
});


function addWork(formData) {
    const token = localStorage.getItem("tokenConnexion");
    
    fetch(`${API_BASE_URL}/works`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'multipart/form-data'
        },
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error ("L'ajout du projet à échoué.");
        }
        return response.json();
    })
    .then(() => {
        getWorks();
        document.querySelector('.modaleAdd').style.display = 'none';
        document.querySelector('.modaleDelete').style.display = 'flex';
        alert("Projet ajouté !");
    })
    .catch(error => {
        console.error("Erreur lors de l’ajout :", error);
        alert("Une erreur est survenue lors de l’ajout du projet.");
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#addWorkForm'); 

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.querySelector('#name').value.trim();
            const categoryId = document.querySelector('#category').value;
            const imageFile = document.querySelector('#imageUpload').files[0];

            if (!title || !categoryId || !imageFile) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            const formData = new FormData();
            formData.append("title", title);
            formData.append("image", imageFile);
            formData.append("category", categoryId);

            addWork(formData);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.querySelector('#imageUpload');
    const imgPreviewContainer = document.querySelector('.imgexemple');

 
    let previewBox = document.querySelector('.previewImage');
    if (!previewBox) {
        previewBox = document.createElement('div');
        previewBox.classList.add('previewImage');
        previewBox.style.marginTop = '10px';
        imgPreviewContainer.appendChild(previewBox);
    }

    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                previewBox.innerHTML = '';
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '150px';
                img.style.objectFit = 'cover';
                previewBox.appendChild(img);
            };

            reader.readAsDataURL(file);
        } else {
            previewBox.innerHTML = '<p>Format d’image invalide.</p>';
        }
    });
});

document.querySelector('#imageUpload').addEventListener('change', function() {
    const exempleDiv = document.querySelector('.imgexemple');

    if (this.files.length > 0 && this.files[0].type.startsWith('image/')) {
        exempleDiv.querySelectorAll('i, p').forEach(el => {
            el.style.display = 'none';
        });
    }
});