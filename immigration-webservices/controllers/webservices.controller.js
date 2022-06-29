// Accessing the Service that we just created
var WebserviceService = require('../services/webservices.service')

exports.getSelectedEmployeeList = async function(req, res, next) {

    WebserviceService.getSelectedEmployeeList(req.body, function(err, result) {
        if (err)
            res.send(err);

        res.send(result);
    });
}

exports.getEmployeeDetail = async function(req, res, next) {
    console.log("asad", req.params.employee_id)
    try {
        WebserviceService.getEmployeeDetail(req.params.employee_id, function(err, result) {
            if (err)
                res.send(err);
            console.log("resultee", result)
            res.send(result);
        });
    } catch (e) {
        console.log(e);
    }
}

exports.getEmployeePassportDetail = async function(req, res, next) {
    try {
        WebserviceService.getEmployeePassportDetail(req.params.employee_id, function(err, result) {
            if (err)
                res.send(err);
            res.send(result);
        });
    } catch (e) {
        console.log(e);
    }
}


exports.getFliteredEmployeeList = async function(req, res, next) {
    WebserviceService.getFliteredEmployeeList(req.params.filtered_value, function(err, result) {
        if (err)
            res.send(err);
        res.send(result);
    });

}


exports.login = async function(req, res, next) {
    WebserviceService.login(req.params.username, req.params.password, function(err, result) {
        console.log("dfsd", result)
        if (err)
            res.status(400).json({ status: 400, message: "Something Went Wrong" })
        if (Object.keys(result).length > 0)
            res.status(201).json({ status: 201, data: result, message: "Valid User" })
        else
            res.status(201).json({ status: 400, data: result, message: "Invalid User" })
    });
}