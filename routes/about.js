const express = require('express')
const router = express.Router()
const AboutModel = require('./../models/About.model')

//  **********************POST API *************

router.post('/addAbout', async (req, resp) => {
    try {
        // Extract data from request body
        const { detailsOne, detailsTwo, mission, vision } = req.body;

        // Create a new instance of AboutModel
        const newAbout = new AboutModel({
            detailsOne: detailsOne,
            detailsTwo: detailsTwo,
            mission: mission,
            vision: vision,
        });

        // Save the new instance to the database
        const savedAbout = await newAbout.save();

        // Send success response
        resp.status(200).send({ status: 200, message: "Data saved successfully", data: savedAbout });
    } catch (error) {
        // Send error response
        resp.status(500).send({ status: 500, message: "Unable to save", error: error.message });
    }
});



//  **********************POST API *************

//  **********************GET API *************
router.get("/ViewAllAbout", async (req, resp) => {
    try {

        const Abouts = await AboutModel.find();
        const Total = Abouts.length
        resp.status(200).send({ success: true, Total, data: Abouts })
    } catch (error) {
        resp.status(500).send({ success: false, Total, error: "some thing issue" })
    }
})
//  **********************GET API *************

//  **********************GET API ID *************
router.get("/ViewAboutById", async (req, resp) => {
    try {

        const AboutId = req.query.AboutId;
        const About = await AboutModel.findById(AboutId)
        if (!AboutId) {
            return resp.status(400).json({ success: false, message: "detail not found" })
        }

        resp.status(200).send({ success: true, data: About })
    } catch (error) {
        resp.status(500).send({ success: false, error: "some thing issue" })
    }
})
//  **********************GET API *************


module.exports = router;