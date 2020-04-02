const express = require('express');
const app = express(); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');

//const config = require('./config/index');
//|| config.dbURI
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(morgan('dev')); //show req in nodemon
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //give access to any client
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS'){
       res.header('Access-Control-Allow-Methodss', 'GET, POST, PATCH, DELETE');
       return res.status(200).json({});
    }
    next();
});

app.use('/users', userRoutes);

app.use((req, res, next) => {
    const error = new Error('404 Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;