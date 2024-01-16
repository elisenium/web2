import { showLoader } from '../../utils/render';

const main = document.querySelector('main');
showLoader();

const AboutPage = () => {
    main.innerHTML = `
    <div class="container text-center">
        <div class="row">
            <div class="col">
            <h3>About elisenium...</h3>

            <p>She is a computer science student learning JS <3</p>
            </div>
        </div>        
    </div>`;
};

export default AboutPage;
