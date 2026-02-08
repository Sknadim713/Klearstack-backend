const express = require('express')
const router = express.Router()
const StaffModel = require('../models/staff.model')


router.post("/addstaff", async (req, resp) => {
    try {
        const { name, email, password } = req.body
        const staff = await StaffModel.create({ name, email, password })
        resp.status(200).json({ success: true, data: staff, message: "staff created successfully" })

    } catch (error) {
        resp.status(500).json({ error: error, message: "error creating staff" })
    }
})

router.put("/update", async (req, resp) => {
    try {
        const { userId } = req.query;
        const { name, email, password } = req.body
        const update = { name, email, password }
        const staffUpdate = await StaffModel.findByIdAndUpdate(userId, update, { new: true })
        resp.status(200).json({ success: true, data: staffUpdate, message: 'Updated staff successfully' })

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message })
    }
})


router.get("/viewall", async (req, resp) => {
    try {
        const { name } = req.query
        filter = {}
        if (name) {
            filter.name = RegExp(name, 'i')
        }
        const staff = await StaffModel.find(filter)
        const count = staff.length

        resp.status(200).json({ success: true, total: count, data: staff, message: " staff find successfully" })

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message })
    }
})

router.post('/login', async (req, resp) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const staff = await StaffModel.findOne({ email: email });


        if (!staff) {
            return resp.status(404).send({ status: 404, message: "staff not found" });
        }
        if (!password) {
            return resp.status(401).send({ status: 401, message: "Incorrect password" });
        }
        resp.status(200).send({
            status: 200, message: "Login successful", data: staff,
        });
    } catch (error) {
        resp.status(500).send({ status: 500, message: "Unable to login", error: error.message });
    }
});

router.get("/idbyview", async (req, resp) => {
    try {
        const { userId } = req.query
        const staff = await StaffModel.findById(userId)
        resp.status(200).json({ success: true, data: staff, message: "staff founded" })

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message })
    }
})

router.get("/getbyid/:id", async (req, resp) => {
    try {
        const { id } = req.params;
        const staff = await StaffModel.findById(id);
        if (!id) {
            resp.status(404).json({ success: false, message: 'User id is required ' })

        }
        resp.status(200).json({ success: true, data: staff, message: "staff found" })

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message })
    }
})






module.exports = router