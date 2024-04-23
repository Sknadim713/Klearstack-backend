// employeeModel.js
const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    city: { type: String },
    position: { type: String },
    joinyear: { type: String }
});

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;

// EmpId: { type: String  ,unique :true},