import { readAllMovies, deleteOneMovie } from '../../models/movies';

const ViewMoviePage = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '<div id="movieWrapper"></div>';

  const movieWrapper = document.querySelector('#movieWrapper');

  const movies = await readAllMovies();
  const moviesAsHtmlTable = getHtmlMovieTableAsString(movies);

  movieWrapper.innerHTML = moviesAsHtmlTable;

  attachEventListeners();
};

function getHtmlMovieTableAsString(movies) {
  if (movies?.length === undefined || movies.length === 0) {
    return '<p class="p-5">No movies yet : (</p>';
  }

  const htmlMovieTable = `<div class="table-responsive p-5">
  <table class="table">
<thead>
  <tr>
    <th scope="col">Title</th>
    <th scope="col">Link</th>
    <th scope="col">Duration (min)</th>
    <th scope="col">Budget (million)</th>
    <th scope="col">Opérations</th>
  </tr>
</thead>
<tbody>  
  ${movies
    .map(
      (element) => `
    <tr>
      <td class="fw-bold text-info" contenteditable="true">${element.title}</td>
      <td class="text-info text-break" contenteditable="true">
        <a class="text-info" href="${element.link}" target="_blank""> ${element.link}</a>
      </td>
      <td class="text-info" contenteditable="true">${element.duration}</td>
      <td class="text-info" contenteditable="true">${element.budget}</td>
      <td>
        <button type="button" class="btn btn-info delete" data-element-id="${element.id}">Delete</button>
      </td>
    </tr>
    `,
    )
    .join('')}
  </tbody></table>`;

  return htmlMovieTable;
}

function attachEventListeners() {
  const movieWrapper = document.querySelector('#movieWrapper');

  movieWrapper.querySelectorAll('.delete').forEach((button) => {
    button.addEventListener('click', async (e) => {
      const { elementId } = e.target.dataset;
      await deleteOneMovie(elementId);
      ViewMoviePage();
    });
  });
}

export default ViewMoviePage;
