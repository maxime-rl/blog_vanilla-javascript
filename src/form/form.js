import '../assets/styles/styles.scss';
import './form.scss';

const form = document.querySelector('form');
const errorElement = document.querySelector('#errors');
let errors = [];

form.addEventListener('submit', async event => {
    event.preventDefault(); // on empeche le refresh
    const formData = new FormData(form); // FormData permet d'extraire les elements du formulaire
    const article = Object.fromEntries(formData.entries()); // la methode fromEntries permet de transformer en objet
    if (formIsValid(article)) {
        try {
            const json = JSON.stringify(article);
            const response = await fetch('https://restapi.fr/api/article', {
                method: "POST",
                body: json,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const body = await response.json();
            console.log(body);
        }   catch (e) {
            console.error('e : ', e)
        }
    }
});

const formIsValid = (article) => {
    if (!article.author || !article.category || !article.content) {
        errors.push('Vous devez renseigner tous les champs')
    } else {
        errors = [];
    }
    if (errors.length) {
        let errorHTML = '';
        errors.forEach((e) => {
            errorHTML += `<li>${ e }</li>`
        })
        errorElement.innerHTML = errorHTML;
        return false;
    } else {
        errorElement.innerHTML = '';
        return true;
    }
}