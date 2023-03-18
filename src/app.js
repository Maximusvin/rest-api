const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routers/contacts-router');
const {routersPath} = require("./routers/routers-path");

const app = express();
const NODE_ENV = process.env.NODE_ENV;

const formatsLogger = app.get('env') === NODE_ENV ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(`/api/${routersPath.CONTACTS}`, contactsRouter);

app.use((req, res) => {
    res.status(404).json({
        message: 'Not found',
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Server error',
    });
})

module.exports = app;
