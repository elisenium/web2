import HomePage from '../Pages/HomePage';
import AddMoviePage from '../Pages/AddMoviePage';
import ViewMoviePage from '../Pages/ViewMoviePage';

const routes = {
  '/': HomePage,
  '/movies': ViewMoviePage,
  '/movies/add': AddMoviePage,
};

export default routes;
