const body = document.querySelector('body');
let calc;
let modal;
let cancel;
let confirm;

const creatCalc = () => {
    calc = document.createElement('div');
    calc.classList.add('calc');
}

const createModal = (question) => {
    modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <p>${ question }</p>
    `;
    cancel = document.createElement('button');
    cancel.innerText = 'Annuler';
    cancel.classList.add('btn', 'btn-secondary');
    confirm = document.createElement('button');
    confirm.classList.add('btn', 'btn-primary');
    confirm.innerText = 'Confirmer';
    modal.addEventListener('click', event => {
        event.stopPropagation();
    });
    modal.append(cancel, confirm);
}

export function openModal(question) {
    creatCalc();
    createModal(question);
    calc.append(modal);
    body.append(calc);
    return new Promise((resolve, reject) => {
        calc.addEventListener('click', () => { // on injecte le addEventListener dans la promesse afin de pouvoir utiliser resolve pour quitter la modal au click sur le background
            resolve(false);
            calc.remove();
        });
        cancel.addEventListener('click', () => {
            resolve(false);
            calc.remove();
        });
        confirm.addEventListener('click', () => {
            resolve(true);
            calc.remove();
        });
    });
}