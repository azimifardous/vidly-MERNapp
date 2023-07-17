const express = require('express');
const { validateGenre, Genre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

// getting all genres
router.get('/', async (req, res, next) => {
    // let's get all the genres from mongodb db
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

// getting a specific genre by its name
router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
        return res.status(404).send("The genre with the given ID was not found.");
    res.send(genre);
})

// adding a genre to the genres collection
router.post('/', auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
})

// delete a genre
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    let genre = await Genre.findById(req.params.id);
    if (!genre)
        return res.status(404).send("The genre with the given ID was not found.");
    genre = await genre.deleteOne()
    res.send(genre);
})

// updating a genre
router.put('/:id', [auth, validateObjectId], async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
        return res.status(404).send("The genre with the given ID was not found.");

    const { error } = validateGenre(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    await genre.save();
    res.send(genre);
})


module.exports = router;