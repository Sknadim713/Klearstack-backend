const mongoose = require('mongoose');

const FounderSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    position: { type: String, required: false },
    message: { type: String },
    contact: { type: String },
    photo: { type: String },
    photoPath: { type: String }
});

const FounderModel = mongoose.model('founder', FounderSchema);

module.exports = FounderModel;
