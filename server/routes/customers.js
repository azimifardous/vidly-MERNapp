const express = require('express');
const auth = require("../middleware/auth");
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');

router.get('/', auth, async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', auth, async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
        return res.status(404).send("The customer with the given ID was not found.");
    res.send(customer);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
        return res.status(404).send("The genre with the given ID was not found.");

    const { error } = validateCustomer(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    customer.name = req.body.name || customer.name;
    customer.phone = req.body.phone || customer.phone;
    customer.isGold = req.body.isGold || customer.isGold;
    await customer.save();
    res.send(customer);
});

router.delete('/:id', auth, async (req, res) => {
    let customer = await Customer.findById(req.params.id);
    if (!customer)
        return res.status(404).send("The genre with the given ID was not found.");
    customer = await customer.deleteOne();
    res.send(customer);
});

module.exports = router;