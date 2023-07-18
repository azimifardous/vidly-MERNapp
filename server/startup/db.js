const mongoose = require('mongoose');
const logger = require('./logger')();
const config = require('config');

module.exports = function () {
    // const db = config.get('db');
    // connecting to the db
    mongoose.connect("mongodb+srv://vidly:vidly23@cluster0.oigid09.mongodb.net/?retryWrites=true&w=majority")
        .then(() => logger.info(`Connected to server...`));
}