const mongoose = require('mongoose');

const SignSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String
}, { timestamps: true }); // Adding timestamps option

const SignModel = mongoose.model('users', SignSchema);

module.exports = SignModel;
