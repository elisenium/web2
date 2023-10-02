var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();
const jsonDbPath = __dirname + '/../data/films.json'

const FILMS = [
    {
        id: 1,
        title: 'Palmer',
        duration: 110,
        budget: 6.7,
        link:'https://m.imdb.com/title/tt6857376',
    },
    {
        id: 2,
        title: 'Divines',
        duration: 105,
        budget: 2.4,
        link: 'https://m.imdb.com/title/tt4730986',
    },
    {
        id: 3,
        title: 'Kidnap',
        duration: 95,
        budget: 21,
        link: 'https://m.imdb.com/title/tt1458169/',
    },

];

/* GET list of films */
// GET /films?minimum-duration=value
router.get('/', function (req, res, next) {
    console.log("GET /films");

    const films = parse(jsonDbPath, FILMS);

    const minimumFilmDuration = req?.query ? Number(req.query['minimum-duration']) : undefined;

    if (minimumFilmDuration <= 0 || typeof(minimumFilmDuration) != 'number') {
        return res.json("Wrong minimum film duration!");
    }
    if (!minimumFilmDuration) {
        return res.json(FILMS);
    }

    const filmsReachingMinimumDuration = FILMS.filter((
        film => film.duration >= minimumFilmDuration
    ));

    return res.json(filmsReachingMinimumDuration);
});

/* GET filter film by id */
router.get('/:id', function (req, res, next) {
    //Arrow function/callback (=fonction middleware)
    console.log(`GET /films/${req.params.id}`);
    const indexOfFilmFound = FILMS.findIndex((film => film.id == req.params.id));

    if (indexOfFilmFound < 0) {
        return res.sendStatus(404);
    }
    res.json(FILMS[indexOfFilmFound]);
});

/* POST add new film */
router.post('/', function (req, res, next) {
    
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    console.log("POST /films");

    if (!title || !duration || !budget || !link) return res.sendStatus(400); //error code '400 Bad request'

    const films = parse(jsonDbPath, FILMS);

    const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined; 
    const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = {
        id: nextId,
        title: title,
        duration: parseInt(duration),
        budget: parseInt(budget),
        link: link
    };

    FILMS.push(newFilm);

    serialize(jsonDbPath, films);
    return res.json(newFilm);
});

router.delete('/:id', (req, res, next) => {
    console.log(`DELETE /films/${req.params.id}`);

    const foundFilmIndex = FILMS.findIndex(film => film.id == req.params.id);

    if (foundFilmIndex < 0) return res.sendStatus(404);

    const filmRemovedFromFilms = FILMS.splice(foundFilmIndex, 1);
    const filmRemoved = filmRemovedFromFilms[0];

    res.json(filmRemoved);
});

router.patch('/:id', (req, res, next) => {
    console.log(`PATCH /films/${req.params.id}`);

    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;

    console.log(`POST /films/${req.params.id}`);

    if (title?.length === 0 || parseInt(duration?.length) === 0 || parseInt(budget?.length) === 0 || link?.length === 0)
        return res.sendStatus(400); //error code '400 Bad request'

    const films = parse(jsonDbPath, FILMS);
    
    const foundFilmIndex = FILMS.findIndex(film => film.id == req.params.id);

    if (foundFilmIndex < 0) return res.sendStatus(404);

    const updatedFilm = { ...FILMS[foundFilmIndex], ...req.body };

    FILMS[foundFilmIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    res.json(updatedFilm);
});

router.put('/:id', (req, res, next) => { 
    console.log(`PUT /films/${req.params.id}`);
    
    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;

    if (
        !req.body ||
        !title ||
        !title.trim() ||
        !link ||
        !link.trim() ||
        duration === undefined ||
        typeof req?.body?.duration !== 'number' ||
        duration < 0 ||
        budget === undefined ||
        typeof req?.body?.budget !== 'number' ||
        budget < 0
    )
        return res.sendStatus(400)

    const id = req.params.id;
    const foundFilmIndex = FILMS.findIndex(film => film.id == id);

    if (foundFilmIndex < 0) {
        const newFilm = { id, title, duration, budget, link };
        FILMS.push(newFilm);
        return res.json(FILMS);
    }
    const filmPriorToChange = FILMS[foundFilmIndex];
    const objectContainingPropertiesToBeUpdated = req.body;

    const updatedFilm = {
        ...filmPriorToChange,
        ...objectContainingPropertiesToBeUpdated,
    };

    FILMS[foundFilmIndex] = updatedFilm;

    return res.json(updatedFilm);

});

module.exports = router;