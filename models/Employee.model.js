const mongoose = require('mongoose')

const EmployeeSchema = mongoose.Schema(({
    name: { type: String },
    surname: { type: String },
    lastname: { type: String },
    position: { type: String },
    joinyear: { type: String },
}))


const EmployeeModel = mongoose.model('employee', EmployeeSchema)

module.exports = EmployeeModel