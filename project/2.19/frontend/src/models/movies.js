/* eslint-disable no-console */
const readAllMovies = async () => {
    try {
        const res = await fetch('/api/films');
        const films = await res.json();
        return films;
    } catch (err) {
        console.error('readAllMovies::error: ', err);
        throw err;
    }
};

const addOneMovie = async (movie) => {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch('/api/films', options);

        const createdFilm = await response.json();

        return createdFilm;
    } catch (err) {
        console.error('addOneMovie::error: ', err);
        throw err;
    }
};

export { readAllMovies, addOneMovie } ;
