var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    gender: { type: String },
    date_of_birth: { type: Date },
    email: { type: String },
    phone_no: { type: String },
    marital_status: { type: String },
    city: { type: String },
    //present_address: { type: String },
    //pin_code: { type: String },
    nationality: { type: String },
    country: { type: String },
    desiganation: { type: String },
    band: { type: String },
    business_unit: { type: String },
    base_location: { type: String },
    project_name: { type: String },
    report_manager_id: { type: String },
    report_manager_name: { type: String },
    from: { type: String },
    to: { type: String },
    visa_type: { type: String },
    visa_category: { type: String },
    report: { type: String },
    passport_number: { type: String },
    issue: { type: String },
    issue_date: { type: Date },
    expiry_date: { type: Date },
    place_of_birth: { type: String },
    //ECNR_status: { type: String },
    status: { type: String },
    IMG_code: { type: String },
    img_status: { type: String },
    emp_Id: { type: String },
    other: { type: String },
    gmr_docs: [{
        filetype: { type: String },
        originalname: { type: String },
        filepath: { type: String },
        date: { type: Date, default: Date.now }
    }],
    employee_docs: [{
        filetype: { type: String },
        originalname: { type: String },
        filepath: { type: String },
        date: { type: Date, default: Date.now }
    }],
    comments: { type: String },
    created_date: { type: Date, default: Date.now },
    dependency: { type: String },
    manager_id: { type: String }
})

module.exports = mongoose.model("employee_details", employeeSchema, "employee_details");