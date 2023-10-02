var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var filmsRouter = require('./routes/films')

var app = express();

app.use((req, res, next) => {
    console.log("Request counter :");
    console.log(req.method + req.path);
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const stats = {};

app.use((req, res, next) => {
    const currentOperation = `${req.method} ${req.path}`; //the current operation being requested
    const currentOperationCounter = stats[currentOperation]; //the operation counter 
    if (currentOperationCounter === undefined) stats[currentOperation] = 0; //if undefined => we set the counter at 0
    stats[currentOperation] += 1; //incrementation
    const statsMessage = `Request counter : \n${Object.keys(stats)
        .map((operation) => `- ${operation} : ${stats[operation]}`)
        .join('\n')}
      `;
    console.log(statsMessage);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/films', filmsRouter);

module.exports = app;
