const express = require('express');
const {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updatePartiallyOneFilm,
    updateFullyOneFilmOrCreateOneFilm,
} = require('../models/films');

const router = express.Router();

/* const FILMS = [
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

]; */

/* GET list of films */
// GET /films?minimum-duration=value
router.get('/', (req, res) => {
    const filmsPotientiallyFiltered = readAllFilms(req?.query?.['minimum-duration']);

    if (filmsPotientiallyFiltered === undefined) return res.sendStatus(400);

    return res.json(filmsPotientiallyFiltered);
});

/* GET filter film by id */
router.get('/:id', (req, res) => {
    // Arrow function/callback (=fonction middleware)
    const foundFilm = readOneFilm(req?.params?.id);

    if (foundFilm === undefined) {
        return res.sendStatus(404);
    }
    return res.json(foundFilm);
});

/* POST add new film */
router.post('/', (req, res) => {
    
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;


    if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'


    const newFilm = createOneFilm(title, parseInt(duration,10), parseInt(budget,10), link);
    return res.json(newFilm);
});

router.delete('/:id', (req, res) => {

    const deletedFilm = deleteOneFilm(req?.params?.id);

    if (!deletedFilm) return res.sendStatus(404);

    return res.json(deletedFilm);
});

router.patch('/:id', (req, res) => {
    const title = req?.body?.title;
    const link = req?.body?.link;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;

    if (
        !req.body ||
        (title !== undefined && !title.trim()) ||
        (link !== undefined && !link.trim()) ||
        (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
        (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
    )
        return res.sendStatus(400);

    const updatedFilm = updatePartiallyOneFilm(req?.params?.id, req?.body);

    if (!updatedFilm) return res.sendStatus(404);

    return res.json(updatedFilm);
});

router.put('/:id', (req, res) => {     
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

    const updatedFilmOrNewFilm = updateFullyOneFilmOrCreateOneFilm(req?.params?.id, req?.body);

    return res.json(updatedFilmOrNewFilm);

});

module.exports = router;