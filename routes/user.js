const express = require('express');
const router = express.Router();
const UserModel = require('../models/Sign.model');
const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images')); // Corrected Destination folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage });

// Create User API with File Upload
router.post("/Create", upload.single('idproof'), async (req, res) => {
    try {
        const { email, password, fname, lname, company, permission, role } = req.body;
        const idproof = req.file ? `/public/images/${req.file.filename}` : null; // Save relative file path

        const employee = await UserModel.create({
            email, password, fname, lname, company, permission, role, idproof
        });

        res.status(200).json({ status: true, message: "Employee added successfully", data: employee });
    } catch (error) {
        res.status(400).json({ status: false, error: error.message });
    }
});

router.put("/permissionAprove", async (req, res) => {
    try {
        const { userId } = req.query;
        const { permission } = req.body;

        if (!userId) {
            return res.status(400).json({ status: 400, message: "userId is required" });
        }

        if (typeof permission !== 'boolean') {
            return res.status(400).json({ status: 400, message: "Invalid permission value" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { permission: permission },
            { new: true } // This option returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        res.status(200).json({ status: 200, message: "Permission updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Unable to update permission", error: error.message });
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
        const { email, password } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email: email });
        console.log("user::>>", user);

        if (!user) {
            return res.status(404).send({ status: 404, message: "User not found" });
        }
        if (!password) {
            return res.status(401).send({ status: 401, message: "Incorrect password" });
        }

        if (!user.permission) {
            return res.status(403).send({ status: 403, message: "Permission Not Approved" });
        }

      

        res.status(200).send({ 
            status: 200, 
            message: "Login successful", 
            data: user, 
        });
    } catch (error) {
        res.status(500).send({ status: 500, message: "Unable to login", error: error.message });
    }
});

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password  } = req.body;
//         const user = await UserModel.findOne({ email: email, password: password });
//         console.log("user::>>",user);

//         if (!user) {
//             return res.status(404).send({ status: 404, message: "User not found" });
//         }

//         if (password !== user.password) {
//             return res.status(401).send({ status: 401, message: "Incorrect password" });
//         }

//         if (!user.permission) {
//             return res.status(403).send({ status: 403, message: "Permission Not Approved" });
//         }


//         res.status(200).send({ status: 200, message: "Login successful", data: user });
//     } catch (error) {
    
//         res.status(500).send({ status: 500, message: "Unable to login", error: error.message });
//     }
// });




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
// router.get("/ViewAboutById", async (req, resp) => {
//     try {

//         const UserId = req.query.UserId;
//         const About = await UserModel.findById(UserId)
//         if (!UserId) {
//             return resp.status(400).json({ success: false, message: "detail not found" })
//         }

//         resp.status(200).send({ success: true, data: About })
//         console.log("About" ,About);
         
//     } catch (error) {
//         resp.status(500).send({ success: false, error: "some thing issue" })
//     }
// })

router.get("/ViewAboutById", async (req, resp) => {
    try {
        const UserId = req.query.UserId;
        if (!UserId) {
            return resp.status(400).json({ success: false, message: "UserId is required" });
        }

        const user = await UserModel.findById(UserId);
        if (!user) {
            return resp.status(404).json({ success: false, message: "User not found" });
        }

        if (user.idproof) {
            user.idproof = `${req.protocol}://${req.get('host')}${user.idproof}`;
        }

        resp.status(200).send({ success: true, data: user });
        console.log("User Details:", user);

    } catch (error) {
        resp.status(500).send({ success: false, error: "An issue occurred while retrieving the user details" });
    }
});

//  **********************GET API *************


module.exports = router;