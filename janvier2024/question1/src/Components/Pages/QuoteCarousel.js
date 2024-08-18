import { clearPage } from '../../utils/render';

const main = document.querySelector('main');
const defaultImage = '../../img/tingey-injury-law-firm-unsplash-low-res.jpg';
let currentQuoteIndex = 0;

const QuoteCarousel = () => {
    clearPage();
    const interval = localStorage.getItem('carouselInterval') || 5000;

    fetch('http://localhost:3000/quotes')
        .then(response => response.json())
        .then((quotes) => {
            const displayQuote = () => {
                if (currentQuoteIndex >= quotes.length) {
                    main.innerHTML = '';
                    const messageElement = document.createElement('p');
                    messageElement.textContent = 'Rechargez la page si vous souhaitez réafficher le carrousel des citations !';
                    main.appendChild(messageElement);
                    return;
                }
                const quote = quotes[currentQuoteIndex];
                main.innerHTML = '';
                const quoteElement = document.createElement('div');
                quoteElement.innerHTML = `
                    <h2>${quote.thinker}</h2>
                    <p>${quote.quote}</p>
                    <img src="${quote.image}" onerror="this.onerror=null;this.src='${defaultImage}';this.alt='Image non disponible';">
                `;
                main.appendChild(quoteElement);
                currentQuoteIndex += 1;
            };
            displayQuote();
            setInterval(displayQuote, interval);
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
        });
};

export default QuoteCarousel;