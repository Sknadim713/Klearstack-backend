const mongoose = require('mongoose');

const FounderSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    position: { type: String, require: false },
    message: { type: String },
    contact: { type: String },

    photo: {
        data: Buffer,
        contentType: String
    }
});

const FounderModel = mongoose.model('founder', FounderSchema);

module.exports = FounderModel;
