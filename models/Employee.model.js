const mongoose = require('mongoose')

const EmployeeSchema = mongoose.Schema(({
    name: { type: String },
    surname: { type: String },
    city: { type: String },
    position: { type: String },
    joinyear: { type: String },
    EmpId: { type: String  ,unique :true},

}))


const EmployeeModel = mongoose.model('employee', EmployeeSchema)

module.exports = EmployeeModel