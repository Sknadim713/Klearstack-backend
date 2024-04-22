const mongoose = require('mongoose');

const SignSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    userId: { type: Number, unique: true },
}, { timestamps: true }); 

const SignModel = mongoose.model('users', SignSchema);

module.exports = SignModel;
