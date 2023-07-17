const mongoose = require('mongoose');
const Joi = require('joi');
const { genreScheme } = require('./genre');

const Movie = mongoose.model('movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    genre: {
        type: genreScheme,
        required: true
    },

    numberInStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 10
    }

}));

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).max(10).required(),
    });

    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;