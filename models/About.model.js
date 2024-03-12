const mongoose = require('mongoose')

const AboutSchema = mongoose.Schema({

    detailsOne: String,
    detailsTwo: String,
    mission: String,
    vision: String,

})

const AboutModel = mongoose.model("about", AboutSchema)

module.exports = AboutModel