const mongoose = require('mongoose');

const FounderSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    position: { type: String, required: false },
    message: { type: String },
    contact: { type: Number  ,unique:true},

} ,{ timestamps: true });

const FounderModel = mongoose.model('founder', FounderSchema);

module.exports = FounderModel;
