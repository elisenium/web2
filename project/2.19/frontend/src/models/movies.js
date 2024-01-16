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

export default readAllMovies;
