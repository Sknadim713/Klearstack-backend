const mongoose = require('mongoose')
// const express = require('express')

const SignSchema = mongoose.Schema({
    name: String,
    password: { type: String, unique: true }
})


const SignModel = mongoose.model('users', SignSchema);

module.exports = SignModel;