const express = require('express')
const router = express.Router()
const UserModel = require('./../models/Sign.model')
const bcrypt = require('bcrypt');
//  **********************POST API *************

// router.post('/Newuser', async (req, resp) => {
//     try {
//         const { email, password } = req.body;
//         const NewUser = new UserModel({
//             email: email,
//             password: password,

//         });
//         const saveUser = await NewUser.save();
//         resp.status(200).send({ status: 200, message: "Data saved successfully", data: saveUser });
//     } catch (error) {
//         // Send error response
//         resp.status(500).send({ status: 500, message: "Unable to save", error: error.message });
//     }
// });




router.post("/getlogin", async (req, resp) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return resp.status(400).json({ success: false, message: "User not found" });
        }
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", passwordMatch);
        if (!passwordMatch) {
            return resp.status(400).json({ success: false, message: "Incorrect password" });
        }
        // If email and password are correct, return success message
        resp.status(200).json({ success: true, message: "Login successful", data: user });
    } catch (error) {
        resp.status(500).json({ success: false, error: error.message });
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