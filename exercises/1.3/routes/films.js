var express = require('express');
var router = express.Router();

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
    res.json(newFilm);
});

module.exports = router;