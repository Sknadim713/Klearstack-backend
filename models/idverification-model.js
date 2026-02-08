const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },     
    key: { type: String, required: true },         
    type: {
      type: String,
      required: true,
      enum: ["text", "number", "email", "date", "radio", "checkbox", "select", "file"]
    },
    required: { type: Boolean, default: false },

    placeholder: { type: String, default: "" },

    options: [
      {
        label: { type: String },
        value: { type: String }
      }
    ], // only for radio/checkbox/select

    minLength: { type: Number },
    maxLength: { type: Number },
    pattern: { type: String }, // regex string
  },
  { _id: false }
);

const ButtonSchema = new mongoose.Schema(
  {
    submit: { type: Boolean, default: true },
    reset: { type: Boolean, default: true },
    next: { type: Boolean, default: false },
    cancel: { type: Boolean, default: true },
  },
  { _id: false }
);

const idVerificationSchema = new mongoose.Schema(
  {
    idcode: { type: String, required: true, unique: true },
    name: { type: String, required: true },                

    fields: { type: [FieldSchema], default: [] },

    buttons: { type: ButtonSchema, default: {} },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("idverification", idVerificationSchema);
