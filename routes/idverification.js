const express = require("express");
const router = express.Router();
const IdVerification = require("./../models/idverification-model");

/**
 * 1) CREATE NEW ID VERIFICATION DESIGN
 * POST: /idverification/create
 */
router.post("/create", async (req, res) => {
  try {
    const data = await IdVerification.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Id Verification Design Created Successfully",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * 2) UPDATE DESIGN BY IDCODE
 * PUT: /idverification/update/:idcode
 */
router.put("/update/:idcode", async (req, res) => {
  try {
    const { idcode } = req.params;

    const updated = await IdVerification.findOneAndUpdate(
      { idcode: idcode },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Design not found with this idcode",
      });
    }

    return res.json({
      success: true,
      message: "Design Updated Successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * 3) DELETE DESIGN BY IDCODE
 * DELETE: /idverification/delete/:idcode
 */
router.delete("/delete/:idcode", async (req, res) => {
  try {
    const { idcode } = req.params;

    const deleted = await IdVerification.findOneAndDelete({ idcode });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Design not found with this idcode",
      });
    }

    return res.json({
      success: true,
      message: "Design Deleted Successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * 4) GET ALL DESIGNS
 * GET: /idverification/getall
 */
router.get("/getall", async (req, res) => {
  try {
    const data = await IdVerification.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      message: "All Id Verification Designs",
      total: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * 5) GET DESIGN BY IDCODE
 * GET: /idverification/getbyidcode/:idcode
 */
router.get("/getbyidcode/:idcode", async (req, res) => {
  try {
    const { idcode } = req.params;

    const data = await IdVerification.findOne({ idcode });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Design not found with this idcode",
      });
    }

    return res.json({
      success: true,
      message: "Design Found Successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.get("/getidlist", async (req, res) => {
  try {
    const list = await IdVerification.find().sort({ createdAt: -1 });

    const data = list.map((doc) => {
      // Find checkbox field
      const checkboxField = doc.fields.find((f) => f.type === "checkbox");

      return {
        idcode: doc.idcode,
        label: doc.name,
        type: "button", // UI me card/button
        operation: checkboxField ? checkboxField.type : null // checkbox operation
      };
    });

    return res.json({
      success: true,
      message: "Id verification list fetched successfully",
      total: data.length,
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});





module.exports = router