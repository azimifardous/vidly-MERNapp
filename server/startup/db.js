const mongoose = require('mongoose');
const logger = require('./logger')();
const config = require('config');

module.exports = function () {
    const db = config.get('db');
    // connecting to the db
    mongoose.connect(db)
        .then(() => logger.info(`Connected to ${db}...`));
}