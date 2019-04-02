const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const { restricted } = require('../middleware/authMiddleware');
const knexConfig = require('../database/dbConfig');
const knexSessionStore = require('connect-session-knex')(session);

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
            maxAge: 1000*60*15,
            secure: false,
            httpOnly: true
        },
        resave: false,
        saveUninitialized: false,
        store: new knexSessionStore({
            knex: knexConfig,
            tablename: 'sessions',
            sidfieldname: 'sid',
            createtable: true,
            clearInterval: 1000*60*60
        })
    }));
    app.use(cors());
    app.use(restricted);
}