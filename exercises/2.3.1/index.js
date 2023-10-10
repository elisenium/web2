const wish = document.querySelector('#wish');
const form = document.querySelector('form');
const msg = document.querySelector('#msg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    msg.innerHTML = `Votre souhait : ${wish.value}`;
});