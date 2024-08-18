// Middleware pour vérifier le score et l'existence de la citation
function verifyQuoteAndScore(quote, score) {
    if (score < 0 || score > 10) {
        return 'Score must be between 0 and 10';
    }

    if (!quote) {
        return 'Quote not found';
    }
    return 'OK';
}

module.exports = { verifyQuoteAndScore };
