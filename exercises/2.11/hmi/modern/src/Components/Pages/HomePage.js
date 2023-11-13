import barbieImg from '../../img/barbie-the-movie.jpg';
import theHelpImg from '../../img/the-help.jpg';

const HomePage = () => {

    const homePage = `
    <h1>Barbie Le Film</h1>
    <img src="${barbieImg}" alt="Barbie The Movie">
    <h2>Synopsis</h2>
    <p>Barbie, qui vit à Barbie Land, est expulsée du pays pour être loin
      d'être une poupée à l'apparence parfaite; n'ayant nulle part où aller,
      elle part pour le monde humain et cherche le vrai bonheur.</p>

    <h2>La Couleur des sentiments</h2>
    <img src="${theHelpImg}" alt="">
    <h2>Synopsis</h2>
    <p>Eugenia Skeeter Phelan est de retour dans sa petite ville de Jackson,
      Mississippi, au début des années 1960, après des études à l'université.
      Ses amies d'enfance se sont mariées, mais elle ne souhaite rien tant que
      de devenir écrivain. Elle prend la responsabilité de la chronique ménagère
      du journal local et, pour se familiariser avec son sujet, dont elle ignore tout,
      obtient de son amie Elizabeth la permission d'interroger sa domestique noire, Aibileen.</p>
    `;
  
    const main = document.querySelector('main');
    main.innerHTML = homePage;
};

export default HomePage;
