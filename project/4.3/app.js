const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:8080', 'http://localhost:7000', 'http://localhost:666'],
};

const filmsRouter = require('./routes/films');
const authsRouter = require('./routes/auths');

const app = express();

const expiryDateIn3Months = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 3);
const cookieSecreteKey = 'YouWouldnot!not!like!mypizza';
app.use(
    cookieSession({
        name: 'user',
        keys: [cookieSecreteKey],
        httpOnly: true,
        expires: expiryDateIn3Months,
    }),
);

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/films', filmsRouter);
app.use('/auths', authsRouter);

module.exports = app;
