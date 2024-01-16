import HomePage from '../Pages/HomePage';
import AboutPage from '../Pages/AboutPage';
import ViewMoviesPage from '../Pages/ViewMoviesPage';
import AddMoviePage from '../Pages/AddMoviePage';

const routes = {
  '/': HomePage,
  '/movies': ViewMoviesPage,
  '/addmovie': AddMoviePage,
  '/about': AboutPage
};

export default routes;
