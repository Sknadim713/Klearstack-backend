const mongoose = require('mongoose');

const SignSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    password: String,
    fname: String,
    lname: String,
    role: String,
    permission:Boolean

}, { timestamps: true }); 

const SignModel = mongoose.model('users', SignSchema);

module.exports = SignModel;
