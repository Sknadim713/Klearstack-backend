const mongoose = require('mongoose')


const SignSchema = mongoose.Schema({
    email: String,
    password:  String ,
})


const SignModel = mongoose.model('users', SignSchema);

module.exports = SignModel;