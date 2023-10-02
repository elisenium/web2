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
router.get('/', function (req, res, next) {
    console.log("GET /films")
    res.json(FILMS);
});

module.exports = router;