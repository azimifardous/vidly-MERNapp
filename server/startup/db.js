const mongoose = require('mongoose');
const logger = require('./logger')();
const config = require('config');

module.exports = function () {
    const db = "mongodb + srv://vidly:vidly23@cluster0.oigid09.mongodb.net/?retryWrites=true&w=majority";
    // connecting to the db
    mongoose.connect(db)
        .then(() => logger.info(`Connected to ${db}...`));
}