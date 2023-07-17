const mongoose = require('mongoose');
const Joi = require('joi');

const genreScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

// creating a model for the genre 
const Genre = mongoose.model('Genres', genreScheme);

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(genre);
}

exports.genreScheme = genreScheme;
exports.Genre = Genre;
exports.validateGenre = validateGenre;