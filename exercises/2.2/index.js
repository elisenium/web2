const btn = document.querySelector('#myBtn');
const counter = document.querySelector('#counter');
const msg = document.querySelector('#msg');

let count = 0;
btn.addEventListener('click', () => {
    count++;

    if (count >= 5 && count <= 9) {
        msg.innerHTML = "Bravo, bel echauffement !";
    }
    if (count >= 10) {
        msg.innerHTML = "Vous etes passe maitre en l'art du clic !";
    }
    counter.innerHTML = count;
});