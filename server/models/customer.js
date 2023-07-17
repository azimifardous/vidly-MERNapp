const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('customers', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    phone: {
        type: String,
        equired: true,
        minlength: 5,
        maxlength: 50,
    },
    isGold: {
        type: Boolean,
        default: false,
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(55),
        phone: Joi.string().min(5).max(55),
        isGold: Joi.boolean()
    })
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;