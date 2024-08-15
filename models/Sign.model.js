const mongoose = require('mongoose');

const SignSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    company: { type: String },
    permission: { type: Boolean, default: false },
    role: { type: String, required: true },
    idproof: { type: String }, // Store the path to the image file

}, { timestamps: true }); 

const SignModel = mongoose.model('users', SignSchema);

module.exports = SignModel;
