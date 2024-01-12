import { clearPage } from '../../utils/render';

const main = document.querySelector('main');

const HomePage = () => {
  clearPage();
  fetch('https://v2.jokeapi.dev/joke/Any?type=single')
    .then((response) => response.json())
    .then((data) => {
      main.innerHTML = `
      <h1>JokeAPI</h1>
      <div class="card m-5">
        <div class="card-header">
          ${data.category}
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>${data.joke}</p>
          </blockquote>
        </div>
      </div>
    `;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });

};

export default HomePage;
