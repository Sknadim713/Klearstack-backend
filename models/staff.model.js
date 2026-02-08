const mongoose = require('mongoose')

const StaffSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email is already  exists"],
    },
    password: {
        type: String,
        required: [true, "name is required"],
    },

}, { timestamps: true })

const staff = mongoose.model('staff', StaffSchema)

module.exports = staff