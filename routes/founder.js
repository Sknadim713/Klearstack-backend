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



// router.post('/addFounder', upload.single('photo'), async (req, res, next) => {
//     try {
//         const { name, surname, position, message, contact } = req.body;

//         if (!name || !surname) {
//             return res.status(400).json({ success: false, error: "Name and surname are required." });
//         }

//         // Check if file was uploaded successfully
//         if (!req.file) {
//             return res.status(400).json({ success: false, error: "File upload failed." });
//         }

//         // Saving the file to a directory
//         const uploadDir = path.join(__dirname, "images");
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir);
//         }
//         const fileName = `${Date.now()}-${req.file.originalname}`;
//         const filePath = path.join(uploadDir, fileName);

//         // Write file to disk
//         fs.writeFileSync(filePath, req.file.buffer);

//         // Log the directory path to the console
//         console.log('Directory path:', uploadDir);

//         // Storing only the file name in MongoDB
//         const newFounder = new FounderModel({
//             name, surname, position, message, contact,
//             photo: fileName, // Storing only the file name
//             photoPath: filePath // Storing the full file path
//         });

//         // Save founder to MongoDB
//         const savedFounder = await newFounder.save();

//         res.status(201).json({ success: true, data: savedFounder });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });




// router.post('/addFounder', async (req, res, next) => {
//     try {
//         const { name, surname, position, message, contact } = req.body;

//         if (!name || !surname) {
//             return res.status(400).json({ success: false, error: "Name and surname are required." });
//         }
//         const newFounder = new FounderModel({
//             name, surname, position, message, contact,
           
//         });

//         const savedFounder = await newFounder.save();

//         res.status(201).json({ success: true, data: savedFounder });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });


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
        const { surname, position, message, contact, name } = req.body;
        
        const saveUser = await FounderModel.create({ surname, position, message, contact, name });
        resp.status(200).send({ status: true, message: "Data saved successfully", data: saveUser });
    } catch(error) {
        resp.status(500).send({ status: 500, message: "Unable to save", error: error.message });
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
// router.get('/ViewAllFounder', async (req, res, next) => {
//     try {
//         const founders = await FounderModel.find({}, '-__v'); 
//         const total = founders.length;
//         res.status(200).json({ success: true, total, result: founders });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// router.get('/ViewAllFounder', async (req, res, next) => {
//     try {
//         const founders = await FounderModel.find(); 
//         const total = founders.length;
//         res.status(200).json({ success: true, total, result: founders });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });



// router.get('/ViewAllFounder', async (req, res, next) => {
//     try {
//         const founders = await FounderModel.find().lean();
//         if (!founders || founders.length === 0) {
//             return res.status(404).json({ success: false, error: "No founders found" });
//         }
//         res.status(200).json({ success: true, total: founders.length, data: founders });
//     } catch (error) {
//         console.error("Error in ViewAllFounder:", error);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// });


router.get('/ViewAllFounder' , async(req ,resp)=>{
    try{

        const founder =await FounderModel.find().lean()
        resp.status(200).json({success:true , total:founder.length , data:founder})
    }catch(error){
        resp.status(500).json({success:false ,  message: 'Internal Server Erro', error: error.message})

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
        res.status(200).json({ success: true, message: 'Founder found', data: founder });
    } catch (error) {
        console.error("Error finding founder by ID:", error);
        res.status(500).json({ success: false, message: 'Error finding founder by ID', error: error.message });
    }
});


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
