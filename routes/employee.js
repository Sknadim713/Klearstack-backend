const express = require('express')
const router = express.Router()
const EmployeeModel = require('./../models/Employee.model')

router.post("/addemployees", async (req, res) => {
    try {
        const { name, surname, city, position, joinyear } = req.body;
        const newEmployee = new EmployeeModel({
            name,
            surname,
            city,
            position,
            joinyear
        });
        const savedEmployee = await newEmployee.save();
        res.status(201).json({ success: true, data: savedEmployee, message: "Employee Added Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// router.post("/addemployee", async (req, resp) => {
//     try {

//         const { name, surname, city, position, joinyear } = req.body
//         const NewEmployee = EmployeeModel({
//             name,
//             surname,
//             city,
//             position,
//             joinyear
//         })
//         const SaveEmployee = await NewEmployee.save()
//         resp.status(201).json({ success: true, data: SaveEmployee, message: "Employeed Added Success" })
//     } catch (error) {
//         resp.status(500).json({ success: false, error: error.message })

//     }
// })
// router.post("/addemployee", async (req, resp, next) => {
//     try {
//         const { name, surname, city, position, joinyear } = req.body;
        
//         // Generate EmpId
//         const lastEmployee = await EmployeeModel.findOne().sort({EmpId: -1}).limit(1); // Get the last employee
//         let empIdCounter = 1;
//         if(lastEmployee && lastEmployee.EmpId) {
//             const lastEmpId = lastEmployee.EmpId;
//             const lastEmpIdCounter = parseInt(lastEmpId.replace("Emp", ""));
//             empIdCounter = lastEmpIdCounter + 1;
//         }

//         const empId = "Emp" + empIdCounter;

//         // Create new employee with generated EmpId
//         const newEmployee = new EmployeeModel({
//             name,
//             surname,
//             city,
//             position,
//             joinyear,
//             EmpId: empId
//         });

//         // Save new employee
//         const savedEmployee = await newEmployee.save();
        
//         resp.status(201).json({ success: true, data: savedEmployee, message: "Employee Added Successfully" });
//     } catch (error) {
//         resp.status(500).json({ success: false, error: error.message });
//     }
// });





router.get("/ViewAllEmployee", async (req, resp, next) => {
    try {
        const Employee = await EmployeeModel.find()

        const total = Employee.length
        resp.status(200).json({ success: true, total, data: Employee })

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message })
    }
})

router.get('/ViewAllEmployee' , async(req ,resp) =>{
    try{
        const Employee =  await EmployeeModel.find()
        const total =Employee.length;
        resp.status(500).json({success :true , total, data: Employee })
    }
    catch(error){
        resp.status(500).json({success :true , total, data: Employee })
    }
})



// router.get("/viewEmpById", async (req, res, next) => {
//     try {
//         const EmpId = req.query.UserId
//         if (!EmpId) {
//             return res.status(400).json({ success: false, message: "Employee Id Is Required" })
//         }
//         const Employee = await EmployeeModel().findById(EmpId)
//         if (!EmpId) {
//             return res.status(404).status({ success: false, message: "Employee Not Found" })
//         }
//         res.status(200).json({ success: true, data: Employee })

//     } catch (error) {
//         console.error("Error find the empoyee")
//         res.status(500).json({ success: false, error: error.message })
//     }

// })

router.get("/viewEmpById", async (req, res, next) => {
    try {
        const EmpId = req.query.UserId;
        if (!EmpId) {
            return res.status(400).json({ success: false, message: "Employee Id Is Required" });
        }
        const employee = await EmployeeModel.findById(EmpId); // Use EmployeeModel to find employee by ID
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee Not Found" });
        }
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        console.error("Error finding the employee:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// router.put("/UpdateEmp", async (req, resp, nex) => {
//     try {
//         const { name, surname, lastname, contact, position, joinyear } = req.body
//         const EmpId = req.query.UserId;
//         const UpdateEmployee = {
//             name, surname, lastname, contact, position, joinyear
//         }
//         const Employee = await FounderModel.findByIdAndUpdate(EmpId, UpdateEmployee)
//         if (!EmpId) {
//             return resp.status(404).json({ success: false, message: "Employee not found" })
//         }
//         resp.status(200).json({ success: true, data: Employee })
//     } catch (error) {
//         resp.status(500).json({ success: false.error.error.message })

//     }
// })
router.put("/UpdateEmp", async (req, resp, next) => {
    try {
        const { name, surname, lastname, contact, position, joinyear } = req.body;
        const EmpId = req.query.UserId;
        if (!EmpId) {
            return resp.status(400).json({ success: false, message: "Employee ID is required" });
        }
        const UpdateEmployee = { name, surname, lastname, contact, position, joinyear };
        const Employee = await EmployeeModel.findByIdAndUpdate(EmpId, UpdateEmployee, { new: true });
        if (!Employee) {
            return resp.status(404).json({ success: false, message: "Employee not found" });
        }
        resp.status(200).json({ success: true, data: Employee });
    } catch (error) {
        resp.status(500).json({ success: false, error: error.message });
    }
});

router.delete("/deleteEmp", async (req, resp, next) => {
    try {
        const EmpId = req.query.UserId;
        const Employee = await EmployeeModel.findByIdAndDelete(EmpId);
        if (!Employee) {
            return resp.status(404).status({ success: false, message: "Employee not found" })
        }
        resp.status(200).json({ success: true, message: "Employee Deleted successfully", delete_data: Employee })
    }
    catch (error) {
        resp.status(500).status({ success: false, error: error.message })

    }
})

// router.get("/ViewAllEmployee", async (req, resp, next) => {
//     try {
//         const employees = await EmployeeModel.find({}, '-_id');
//         const founders = await FounderModel.find({}, '-_id name surname');

//         const totalEmployees = employees.length;
//         const totalFounders = founders.length;

//         const data = employees.concat(founders);

//         resp.status(200).json({ success: true, totalEmployees, totalFounders, data });

//     } catch (error) {
//         resp.status(500).json({ success: false, error: error.message });
//     }
// });
module.exports = router;
