const express = require('express');
// const { serialize, parse } = require('../utils/json');

const {
    readAllQuotes,
    readOneQuote,

} = require('../models/quotes');

const jsonDbPath = `${__dirname}/../data/films.json`;
// const { authorize, isAdmin } = require('../utils/auths');

const router = express.Router();

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
    const allQuotes = readAllQuotes(req?.query?.order);

    return res.json(allQuotes);
});

// Read the quote identified by an id in the menu
router.get('/:id', (req, res) => {
    const foundQuote = readOneQuote(req.params.id);

    if (!foundQuote) return res.sendStatus(404);

    return res.json(foundQuote);
});

// Route pour évaluer une citation
router.post('/evaluation/:id', (req, res) => {
    const { id } = req.params;
    const { score } = req.body;
    const { username } = req.user;

    // Vérifier que le score est compris entre 0 et 10
    if (score < 0 || score > 10) {
        return res.sendStatus(400);
    }

    // Lire le fichier quotes.json
    const quotes = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'quotes.json'), 'utf-8'));

    // Vérifier que la citation existe
    const quote = quotes.find((quote) => quote.id === Number(id));
    if (!quote) {
        return res.sendStatus(404);
    }

    // Vérifier que l'utilisateur n'a pas déjà évalué cette citation
    if (quote.evaluations && quote.evaluations.find((evaluation) => evaluation.username === username)) {
        return res.sendStatus(409);
    }

    // Enregistrer l'évaluation
    const evaluation = { idQuote: id, username, score };
    quote.evaluations = quote.evaluations || [];
    quote.evaluations.push(evaluation);
});

module.exports = router;
