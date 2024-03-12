var express = require('express');
var router = express.Router();


// const FounderModel = require('../bin/models/Founder.models');
const FounderModel = require('./../models/Founder.model');
const multer = require('multer');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });


// ******************* POST API *******************

// router.post('/addFounder', async (req, resp) => {
//     try {

//         let name = req.body.name;
//         let surname = req.body.surname;
//         let position = req.body.position;
//         let contact = req.body.contact;
//         let message = req.body.message;
//         let photo = req.body.photo;
//         if (!name || !surname) {
//             return res.status(400).json({ success: false, error: "Name and surname are required." });
//         }

//         let newFounder = new FounderModel({
//             name: name,
//             surname: surname,
//             position: position,
//             contact: contact,
//             message: message,
//             photo: photo
//         })
//         const savedFounder = await newFounder.save();
//         resp.status(200).send({ status: 200, message: "Data saved successfully", data: savedFounder });
//     } catch (error) {
//         resp.status(500).send({ status: 500, message: "Unable to save", error: error.message });
//     }
// });

// router.post('/addFounder', upload.single('photo'), async (req, res, next) => {
//     try {
//         const { name, surname, position, message, contact } = req.body;
//         const photo = req.file; // Get the uploaded file from req.file

//         // Check if name and surname are provided
//         if (!name || !surname) {
//             return res.status(400).json({ success: false, error: "Name and surname are required." });
//         }

//         // Create founder
//         const newFounder = new FounderModel({
//             name, surname, position, message, contact, photo
//         });

//         // Save founder to database
//         const savedFounder = await newFounder.save();

//         res.status(201).json({ success: true, data: savedFounder });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

router.post('/addFounder', upload.single('photo'), async (req, res, next) => {
    try {
        const { name, surname, position, message, contact } = req.body;
        const photo = req.file;

        if (!name || !surname) {
            return res.status(400).json({ success: false, error: "Name and surname are required." });
        }
        const newFounder = new FounderModel({
            name, surname, position, message, contact,
            photo: {
                data: photo.buffer,
                contentType: photo.mimetype
            }
        });

        const savedFounder = await newFounder.save();

        res.status(201).json({ success: true, data: savedFounder });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});




// ******************* GET API *******************


// ******************* GET API *******************

// router.get('/ViewAllFounder', async (req, res, next) => {
//     try {
//         const founders = await FounderModel.find();
//         const total = founders.length
//         res.status(200).json({ success: true, total, data: founders, });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
router.get('/ViewAllFounder', async (req, res, next) => {
    try {
        const founders = await FounderModel.find({}, '-__v'); // Excluding the "__v" field
        const total = founders.length;
        res.status(200).json({ success: true, total, data: founders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// ******************* GET API *******************

// ******************* GET API BY ID *******************

// router.get('/ViewFounderById', async (req, res, next) => {
//     try {
//         const founderId = req.query.UserId;
//         const founder = await FounderModel.findById(founderId);

//         if (!founder) {
//             return res.status(404).json({ success: false, message: 'Founder not found' });
//         }

//         res.status(200).json({ success: true, data: founder });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

router.get('/ViewFounderById', async (req, res, next) => {
    try {
        const founderId = req.query.UserId;
        if (!founderId) {
            return res.status(400).json({ success: false, message: 'Founder ID is required' });
        }
        const founder = await FounderModel.findById(founderId);
        if (!founder) {
            return res.status(404).json({ success: false, message: 'Founder not found' });
        }
        res.status(200).json({ success: true, data: founder });
    } catch (error) {
        console.error("Error finding founder by ID:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});




// ******************* GET API *******************



router.put('/updatefounder', async (req, resp) => {
    try {
        const { name, surname, position, contact, message, photo } = req.body;
        const founderId = req.query.UserId; // Extracting UserId from query string
        const updatedFounder = {
            name, surname, position, contact, message, photo
        };
        // Update the founder document based on the founderId
        const founder = await FounderModel.findByIdAndUpdate(founderId, updatedFounder, { new: true });
        if (!founder) {
            return resp.status(404).json({ success: false, message: 'Founder not found' });
        }
        // If the update is successful, return the updated founder data
        resp.status(200).json({ success: true, data: founder });
    } catch (error) {
        // Handle any errors that occur during the update process
        resp.status(500).json({ success: false, error: error.message });
    }
});


// Delete 
router.delete('/DeleteFounderById', async (req, res, next) => {
    try {
        const founderId = req.query.UserId; // Accessing founder ID from URL query parameter
        const founder = await FounderModel.findByIdAndDelete(founderId);
        if (!founder) {
            return res.status(404).json({ success: false, message: 'Founder not found' });
        }
        res.status(200).json({ success: true, message: 'Founder deleted successfully', delete_data: founder });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});




router.delete('/DeleteFounderAll', async (req, res, next) => {
    try {
        const deleteResult = await FounderModel.deleteMany({});

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'No founders found to delete' });
        }

        res.status(200).json({ success: true, message: 'All founders deleted successfully', delete_count: deleteResult.deletedCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});







router.search('/searchfounder', (req, resp) => {
    resp.send("")
})



module.exports = router;
