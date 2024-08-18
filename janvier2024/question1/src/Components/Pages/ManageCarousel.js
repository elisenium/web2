import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const main = document.querySelector('main');

const ManageCarousel = () => {
    clearPage(main);
    const form = document.createElement('form');
    const label = document.createElement('label');
    label.textContent = 'Nombre de millisecondes entre chaque affichage d’une citation';
    const input = document.createElement('input');
    input.type = 'number';
    input.value = localStorage.getItem('carouselInterval') || 5000;
    const button = document.createElement('button');
    button.textContent = 'Soumettre';
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        localStorage.setItem('carouselInterval', input.value);
        Navigate('/quotecarousel');
    });

    main.appendChild(form);
    return form;
};

export default ManageCarousel;