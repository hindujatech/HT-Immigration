var employeeModel = require('../models/employeeModel.js');
var chatModel = require('../models/messageModel.js');

employeeMaster = {}

employeeMaster.addAndUpdateEmployee = async function(req, res) {
    console.log("asdasdas", req)
    try {
        req = new employeeModel(req);
        let data = await employeeModel.findOneAndUpdate({ _id: req._id }, req, { new: true, upsert: true })
        return data
    } catch (err) {
        throw new error
    }
}

employeeMaster.getEmployeeListBySort = async function(req, res) {
    try {
        var data = await employeeModel.find({}).sort({ "_id": -1 }).limit(1)
        return data
    } catch (err) {
        return err
    }
}

employeeMaster.getEmployeeById = async function(req, res) {
    try {
        let data = await employeeModel.find({ _id: req })
        return data
    } catch (err) {
        throw new error
    }
}

employeeMaster.getAllEmployee = async function(req, res) {
    try {
        let data = await employeeModel.find(req)
        return data
    } catch (err) {
        throw new error
    }
}

employeeMaster.getEmployeeRequest = async function(req, res) {
    try {
        console.log("sasdasdasd", req)
        let data = await employeeModel.find(req)
        return data
    } catch (err) {
        throw new error
    }
}

employeeMaster.chat_employee_details = async function(req, res) {
    try {
        console.log("sasdasdasd", req)
        result = await chatModel.find({ "emp_id": req })
        return result
    } catch (err) {
        throw new error
    }
}

employeeMaster.getReporteeList = async function(req, res) {
    try {
        console.log("sasdasdasd", req)
        let data = await employeeModel.find(req)
        return data
    } catch (err) {
        throw new error
    }
}

module.exports = employeeMaster;