const express = require('express')
const router = express.Router()
const UserModel = require('./../models/Sign.model')

//  **********************POST API *************

router.post('/Newuser', async (req, resp) => {
    try {
        // Extract data from request body
        const { name, password } = req.body;

        // Create a new instance of UserModel
        const newAbout = new UserModel({
            name: name,
            password: password,

        });

        // Save the new instance to the database
        const saveUser = await newAbout.save();

        // Send success response
        resp.status(200).send({ status: 200, message: "Data saved successfully", data: saveUser });
    } catch (error) {
        // Send error response
        resp.status(500).send({ status: 500, message: "Unable to save", error: error.message });
    }
});



//  **********************POST API *************

//  **********************GET API *************
router.get("/Userlist", async (req, resp) => {
    try {

        const Abouts = await UserModel.find();
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
        const About = await UserModel.findById(AboutId)
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