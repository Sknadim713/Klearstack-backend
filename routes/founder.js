var express = require('express');
var router = express.Router();


// const FounderModel = require('../bin/models/Founder.models');
const FounderModel = require('./../models/Founder.model');


// Set up multer for file uploads
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { error, count } = require('console');
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// ******************* POST API *******************






// router.post("/addFounder", async (req, res) => {
//     try {
//         const { name, surname ,position ,message ,contact} = req.body;

//         const newUser = await FounderModel.create({ name, surname ,position ,message ,contact});
//         res.status(200).json({ status: 200, message: "Data saved successfully", data: newUser });
//     } catch (error) {
//         res.status(500).json({ status: 500, message: "Unable to save", error: error.message });
//     }
// });

router.post("/addFounder", async (req, resp) => {
    try {
        const { name, surname, position, message, contact } = req.body;
        const founder = await FounderModel.create({name, surname, position, message, contact});
        resp.status(200).json({success:true , message:"Data saved successfully" , data:founder});


    } catch (error) {
        resp.status(500).json({success:true , error:"Data saved successfully" , error: error.message });
    }

})

// router.post("/addFounder", async (req, resp) => {
//     const { name, surname, position, message, contact } = req.body
//     try {
//         const founder = await FounderModel.create({ name, surname, position, message, contact })
//         resp.status(200).send({ status: false, message: "Data saved successfully", data: founder })
//     } catch (eror) {
//         resp.status(500).send({ success: false, eror: "Internal Server Error", })
//     }
// })



// ******************* GET API *******************


// ******************* GET API *******************




// router.get('/ViewAllFounder', async (req, resp) => {
//     try {
//         const founder = await FounderModel.find().lean()
//         if (!founder || founder.length === 0) {
//             founder.push("Database Is Blank")
//         }
//         resp.status(200).send({ success: true, total: founder.length, data: founder })
//     } catch (error) {
//         resp.status(500).send({ success: false, error: "Internal Server Error" })
//     }
// })

router.get('/ViewAllFounder', async (req, resp) => {
    const founder = await FounderModel.find().lean()
    try {
        resp.status(200).json({ success: true, total: founder.length, data: founder })
    } catch (error) {
        resp.status(500).json({ success: false, error: "Internal Server Error" })
    }
})



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



// router.get('/ViewFounderById', async (req, res, next) => {
//     try {
//         const founderId = req.query.UserId;

//         if (!founderId) {
//             return res.status(400).json({ success: false, message: 'Founder ID is required' });
//         }
//         const founder = await FounderModel.findById(founderId);
//         if (!founder) {
//             return res.status(404).json({ success: false, message: 'Founder not found' });
//         }
//         res.status(200).json({ success: true, message: 'Founder found', data: founder });
//     } catch (error) {
//         console.error("Error finding founder by ID:", error);
//         res.status(500).json({ success: false, message: 'Error finding founder by ID', error: error.message });
//     }
// });

router.get('/ViewFounderById', async (req, resp) => {
    try {
        const FounderId = req.query.UserId

        if (!FounderId) {
            resp.status(400).send({ success: false, message: "Founder ID is required" })
        }
        const founder =await FounderModel.findById(FounderId)
        if(!founder){
resp.status(400).send({success:false , message:"Fouder Not Found"})
        }
        resp.status(200).send({success:true , message:"Founded Successfuly" ,data:founder})

    } catch (error) {
        console.error("Error finding founder by ID:", error);
                res.status(500).json({ success: false, message: 'Error finding founder by ID', error: error.message });
    }
})


// router.get('/ViewFounderById', async (req, res, next) => {
//     try {
//         // Extract founderId from query parameters
//         const founderId = req.query.UserId;

//         // Check if founderId is provided
//         if (!founderId) {
//             return res.status(400).json({ success: false, message: 'Founder ID is required' });
//         }

//         // Validate that founderId is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(founderId)) {
//             return res.status(400).json({ success: false, message: 'Invalid Founder ID' });
//         }

//         // Find founder by ID
//         const founder = await FounderModel.findById(founderId);

//         // Check if founder is found
//         if (!founder) {
//             return res.status(404).json({ success: false, message: 'Founder not found' });
//         }

//         // Respond with success and founder data
//         res.status(200).json({ success: true, message: 'Founder found', data: founder });
//     } catch (error) {
//         // Handle errors
//         console.error("Error finding founder by ID:", error);
//         res.status(500).json({ success: false, message: 'Error finding founder by ID', error: error.message });
//     }
// });


// router.get('/ViewFounderById', async (req, res, next) => {
//     try {
//         const founderId = req.query.UserId;
//         if (!founderId) {
//             return res.status(400).json({ success: false, message: 'Founder ID is required' });
//         }
//         const founder = await FounderModel.findById(founderId);
//         if (!founder) {
//             return res.status(404).json({ success: false, message: 'Founder not found' });
//         }
//         // Ensure founder.photo is a string
//         if (typeof founder.photo !== 'string') {
//             return res.status(500).json({ success: false, message: 'Invalid photo path' });
//         }
//         // Construct relative file path for the photo (assuming images are stored in routes/images directory)
//         const photoFilePath = path.join("routes", "images", founder.photo);

//         // Send the response with both file name and file path
//         res.status(200).json({ success: true, data: { ...founder.toObject(), photoFilePath } });
//     } catch (error) {
//         console.error("Error finding founder by ID:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });





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
