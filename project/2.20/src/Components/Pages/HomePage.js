import barbieMovieImg from '../../img/barbie-the-movie.jpg';
import theHelpMovieImg from '../../img/the-help.jpg';
import { showLoader } from '../../utils/render';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';

const main = document.querySelector('main');


showLoader();
const HomePage = () => {

  const homePage = `
    <div class="container text-center">
        <div class="row">
            <div class="col">
            <h3>Welcome to myMovies !</h3>

            <p>Here you can find a selection of our favorite movies ; )</p>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-lg-6">
            <h4>Barbie The Movie</h1>
            <img class="img-thumbnail" src="${barbieMovieImg}" alt="Barbie" />
            </div>

            <div class="col-12 col-lg-6">
            <h4>La Couleur des Sentiments</h1>
            <img class="img-thumbnail" src="${theHelpMovieImg}" alt="The Help" />
            </div>
        </div>
    </div>
    `;

  main.innerHTML = homePage;
  PrivacyPolicy();


};

export default HomePage;
