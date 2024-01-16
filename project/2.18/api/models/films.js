const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

function readAllFilms(minimumDuration) {
    const films = parse(jsonDbPath);

    if (minimumDuration === undefined) return films;

    const minimumDurationAsNumber = Number(minimumDuration);
    if (Number.isNaN(minimumDurationAsNumber) || minimumDurationAsNumber < 0) return undefined;

    const filmsReachingMinimumDuration = films.filter((film) => film.duration >= minimumDuration);
    return filmsReachingMinimumDuration;
}

function readOneFilm(id) {
    const idAsNumber = Number(id);
    const films = parse(jsonDbPath);
    const indexOfFilmFound = films.findIndex((film) => film.id === idAsNumber);
    if (indexOfFilmFound < 0) return undefined;

    return films[indexOfFilmFound];
}

function createOneFilm(title, link, duration, budget) {
    const films = parse(jsonDbPath);

    const createdFilm = {
        id: getNextId(),
        title,
        link,
        duration,
        budget,
    };

    films.push(createdFilm);

    serialize(jsonDbPath, films);

    return createdFilm;
}

function getNextId() {
    const films = parse(jsonDbPath);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = films[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}

function deleteOneFilm(id) {
    const idAsNumber = Number(id);
    const films = parse(jsonDbPath);
    const foundIndex = films.findIndex((film) => film.id === idAsNumber);
    if (foundIndex < 0) return undefined;
    const deletedFilms = films.splice(foundIndex, 1);
    const deletedFilm = deletedFilms[0];
    serialize(jsonDbPath, films);

    return deletedFilm;
}

function updatePartiallyOneFilm(id, propertiesToUpdate) {
    const idAsNumber = Number(id);
    const films = parse(jsonDbPath);
    const foundIndex = films.findIndex((film) => film.id === idAsNumber);
    if (foundIndex < 0) return undefined;

    const updatedFilm = { ...films[foundIndex], ...propertiesToUpdate };

    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    return updatedFilm;
}

function updateFullyOneFilmOrCreateOneFilm(id, filmProps) {
    const idAsNumber = Number(id, 10);
    const films = parse(jsonDbPath);
    const indexOfFilmFound = films.findIndex((film) => film.id === idAsNumber);

    if (indexOfFilmFound < 0) {
        const newFilm = { id: idAsNumber, ...filmProps };
        films.push(newFilm);
        serialize(jsonDbPath, films);
        return newFilm;
    }

    const filmPriorToChange = films[indexOfFilmFound];

    const updatedFilm = {
        ...filmPriorToChange,
        ...filmProps,
    };

    films[indexOfFilmFound] = updatedFilm;

    serialize(jsonDbPath, films);

    return updatedFilm;
}

module.exports = {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updatePartiallyOneFilm,
    updateFullyOneFilmOrCreateOneFilm,
};