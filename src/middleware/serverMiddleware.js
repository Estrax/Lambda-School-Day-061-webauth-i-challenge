const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const { restricted } = require('../middleware/authMiddleware');

require('dotenv').config();

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(session({
        name: 'sessionName',
        secret: process.env.SECRET_KEY || 'secretKey',
        cookie: {
            maxAge: 24*3600000
        },
        resave: false,
        saveUninitialized: false,
        httpOnly: true
    }));
    app.use(cors());
    app.use(restricted);
}