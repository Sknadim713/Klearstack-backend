const express = require('express')
const router = express.Router()
const UserModel = require('./../models/Sign.model')
const bcrypt = require('bcrypt');
//  **********************POST API *************


// router.post('/Newuser', async (req, resp) => {
//     try {
//         const { email, password ,id} = req.body;
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

router.post("/Newuser", async (req, res) => {
    try {
        const { email, password ,fname ,lname, company ,permission ,role} = req.body;
        const newUser = await UserModel.create({ email, password ,fname ,lname, company ,permission ,role});
        res.status(200).json({ status: 200, message: "Data saved successfully", data: newUser });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Unable to save", error: error.message });
    }
});



// router.post('/login', async (req, res) => {
//     try {
//         const { email, password ,role} = req.body;
//         const user = await UserModel.findOne({ email: email , password:password });
//         const errorMessage = "Incorrect email or password";
//         if (!user) {
//             return res.status(401).send({ status: 401, message: errorMessage });
//         }
//         if (password !== user.password) {
//             return res.status(401).send({ status: 401, message: errorMessage });
//         }

//         res.status(200).send({ status: 200, message: "Login successful", data: user });
//     } catch (error) {

//         res.status(500).send({ status: 500, message: "Unable to login", error: error.message });
//     }
// });



// router.post('/login', async (req, res) => {
//     try {
//         const { email, password ,permission:permission} = req.body;
//         const user = await UserModel.findOne({ email: email  ,password:password});
//         if (!user) {
//             return res.status(404).send({ status: 404, message: "User not found" });
//         }
//         if (password !== user.password) {
//             return res.status(401).send({ status: 401, message: "Incorrect password" });
//         }

//         // If password matches, send success response
//         res.status(200).send({ status: 200, message: "Login successful", data: user });
//     } catch (error) {
//         // Send error response
//         res.status(500).send({ status: 500, message: "Unable to login", error: error.message });
//     }
// });

router.post('/login', async (req, res) => {
    try {
        const { email, password  } = req.body;
        const user = await UserModel.findOne({ email: email, password: password });
        console.log("user::>>",user);

        if (!user) {
            return res.status(404).send({ status: 404, message: "User not found" });
        }

        if (password !== user.password) {
            return res.status(401).send({ status: 401, message: "Incorrect password" });
        }

        if (!user.permission) {
            return res.status(403).send({ status: 403, message: "Permission Not Approved" });
        }


        res.status(200).send({ status: 200, message: "Login successful", data: user });
    } catch (error) {
    
        res.status(500).send({ status: 500, message: "Unable to login", error: error.message });
    }
});




// Route to fetch user list
router.get("/Userlist", async (req, resp) => {
    try {
        // Retrieve all users
        const users = await UserModel.find();

        // Calculate total count of users
        const totalUsers = users.length;

        // Send user list response
        resp.status(200).json({ success: true, total: totalUsers, data: users });
    } catch (error) {
        console.error("Error fetching user list:", error);
        resp.status(500).json({ success: false, error: "An error occurred while fetching user list" });
    }
});
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