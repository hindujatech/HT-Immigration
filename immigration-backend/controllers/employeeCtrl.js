var employeeService = require('../services/employeeService');
const config = require('../config.json');
var http = require('https');
var https = require('https');
const mail = require('../public/javascripts/mail');
var employeeCrtl = {};

employeeCrtl.addEmployee = async function(req, res) {
    let reqObj = req.body;
    // console.log("reqObj", reqObj)

    var shortlist = await employeeService.getEmployeeListBySort()
    console.log("shortlist", shortlist)
        //
    try {
        var country_sm = reqObj.to
        console.log("country_sm", country_sm)
        var str = (reqObj.to).toUpperCase();
        if (country_sm == 'United Kingdom') {
            var country_code = 'UK'
        } else if (country_sm == 'Romania') {
            var country_code = 'ROU'
        } else if (country_sm == 'China') {
            var country_code = 'CHN'
        } else {
            var country_code = str.substring(0, 3);
        }
        console.log("country_code", country_code);
        var shortlist = await employeeService.getEmployeeListBySort()
        console.log("shortlist", shortlist)
        if (shortlist != "") {
            if (shortlist[0].to == 'United Kingdom') {
                var test = shortlist[0]['IMG_code'].substring(7)
            } else if (shortlist[0].to == 'South Korea') {
                var test = shortlist[0]['IMG_code'].substring(9)
            } else {
                var test = shortlist[0]['IMG_code'].substring(8)
            }
            var subStr = Number(test) + 1
            var finalRR = 'GIR_' + country_code + '_' + subStr
            console.log("finalRR", finalRR)
            reqObj['IMG_code'] = finalRR
        } else {
            var finalRR = 'GIR_' + country_code + '_10001'
            reqObj['IMG_code'] = finalRR
        }
        console.log("reqObj", reqObj);
        let strr = reqObj['firstname'];
        let fname = strr.split(" ");
        fname.forEach((w, index) => {
            fname[index] = w.charAt(0).toUpperCase().concat(w.slice(1, w.length))
        });
        fname = fname.join(" ");
        reqObj['firstname'] = fname;
        lname = reqObj['lastname'].toUpperCase()
        reqObj['lastname'] = lname;
        console.log(fname, lname)
        var emp_detail = await employeeService.addAndUpdateEmployee(reqObj)
        if (emp_detail) {
            console.log("asasdad", emp_detail)
            send_mail(emp_detail.email, 'employee_submit_mail', emp_detail);
            getEmployeeDetail(emp_detail.manager_id, function(error, employee_details) {
                console.log('you data', employee_details)
                send_mail(employee_details["work_email_address"], 'emp_details_manager_mail', emp_detail, employee_details["employee_name"]);
            })
        }
        // send_mail(employee_details["work_email_address"], 'candidate', employee_detail["employee_name"], employee_details["employee_name"]);
        return res.status(201).json({ status: 201, data: emp_detail, message: "employee details added Succesfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
}

employeeCrtl.downloadDocs = async function(req, res) {
    console.log("req.body", req.body)
        // let upload = '../uploads'
        // url = 'http://35.200.189.14:8000/'+upload
        // return res.status(201).json({ status: 201, data: emp_detail, message: "employee details updated Succesfully" })
}

// employeeCrtl.docUploadMail = async function(req, res) {
//     try {
//         getEmployeeDetail(5855, function(error, img_details) {
//             console.log('you data', img_details)
//             send_mail(img_details["work_email_address"], 'upload_docs_mail_Rmg', emp_detail, img_details["employee_name"]);
//         })
//         return res.status(201).json({ status: 201, data: {}, message: "Mail sended" })

//     } catch (e) {
//         return res.status(400).json({ status: 400, message: "Something Went Wrong" });
//     }
// }


employeeCrtl.updateEmployee = async function(req, res) {
    console.log("edit test", req.params.mail)
    let reqObj = req.body;
    console.log("reqObj111", reqObj)
    try {
        var emp_detail = await employeeService.addAndUpdateEmployee(reqObj)
        console.log("asasdad", emp_detail)
        if (req.params.mail == "true") {
            if (emp_detail) {
                console.log("asasdaddfgdfgdg")
                send_mail(emp_detail.email, 'manager_approve_Emp', emp_detail.firstname);
                getEmployeeDetail(emp_detail.manager_id, function(error, employee_details) {
                    console.log('you data', employee_details)
                    send_mail(employee_details["work_email_address"], 'manager_approve_mail_M', emp_detail, employee_details["employee_name"]);
                })
                getEmployeeDetail(5855, function(error, img_details) {
                    console.log('you data', img_details)
                    send_mail(img_details["work_email_address"], 'manager_approve_mail_Rmg', emp_detail, img_details["employee_name"]);
                })
            }
        } else if (req.params.mail == "false") {
            if (emp_detail) {
                send_mail(emp_detail.email, 'manager_reject_Emp', emp_detail.firstname);
                getEmployeeDetail(emp_detail.manager_id, function(error, employee_details) {
                    console.log('you data', employee_details)
                    send_mail(employee_details["work_email_address"], 'manager_reject_mail_M', emp_detail, employee_details["employee_name"]);
                })
            }
        }
        return res.status(201).json({ status: 201, data: emp_detail, message: "employee details updated Succesfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
}

employeeCrtl.getEmployee = async function(req, res) {
    try {
        let reqObj = req.params.id;
        var emp_detail = await employeeService.getEmployeeById(reqObj)
        return res.status(201).json({ status: 201, data: emp_detail, message: "employee detail" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
}



employeeCrtl.getEmployeeRequest = async function(req, res) {
    console.log("req.paramsfgdfgdf", req.params)
    try {
        var condition = { 'status': { $in: ['Not Submitted', 'Awaiting Documents', "Awaiting Manager Approval", 'Approved', 'Rejected'] }, 'emp_Id': req.params.id }
        var emp_detail = await employeeService.getEmployeeRequest(condition)

        return res.status(201).json({ status: 201, data: emp_detail, message: "employee detail" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
}

employeeCrtl.chat_employee_details = async function(req, res) {
    console.log("req.paramsfgdfgdf", req.params)
    try {
        var chat_emp_detail = await employeeService.chat_employee_details(req.params.employee_id)

        return res.status(201).json({ status: 201, data: chat_emp_detail, message: "chat employee detail" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
}

employeeCrtl.getReporteeList = async function(req, res) {
    console.log("dfdparamsfgdfgdf", req.params)
    try {
        var condition = { 'report_manager_id': req.params.id }
        var emp_detail = await employeeService.getReporteeList(condition)
        console.log("aasasreportylist", emp_detail)
        return res.status(201).json({ status: 201, data: emp_detail, message: "employee detail" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
}

employeeCrtl.get_employee_passport_details = async function(req, res, next) {
    console.log("sdasd", req.params.employee_id);
    try {

        getEmployeePassportDetail(req.params.employee_id, function(error, employee_passport_detail) {
            console.log("employee_detaildfdfg", employee_passport_detail)
            if (error) {
                return res.status(400).json({ status: 400, data: {}, message: "Something went wrong. Unable connect mysql webservices" })
            } else {
                return res.status(201).json({ data: { employee_passport_detail }, message: "Employee Role Data Get Succesfully" });
                // company_structure.findOne({ 'ideal_name': employee_detail.practice }, function(err, ideal_practice) {
                //     console.log("ideal_practice", ideal_practice)
                //     if (!err) {
                //         if (ideal_practice != '' || ideal_practice != null) {
                //             console.log("sdsf");
                //             employee_detail["ideal_practice"] = ideal_practice.name
                //             console.log("employee_detail", employee_detail);
                //             return res.status(201).json({ data: { employee_detail }, message: "Employee Role Data Get Succesfully" });
                //         } else {
                //             return res.status(400).json({ status: 400, message: "Something Went Wrong" })
                //         }
                //     } else {
                //         return res.status(400).json({ status: 400, data: {}, message: "Something went wrong. Unable connect mysql webservices" })
                //     }
                // })
            }
        })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" })
    }
}

function getEmployeeDetail(employee_id, callback) {
    console.log("employee_id", employee_id)
    var return_data;
    var reqGet = http.request(config.webservice_url + "getEmployeeDetail/" + employee_id, function(res) {
        res.on('data', function(data) {
            try {
                return_data = JSON.parse(data);
                console.log("return_data", return_data);
                return callback(null, return_data);
            } catch (err) {
                console.error(err)
            }
        });
    });
    reqGet.end();
    reqGet.on('error', function(e) {
        console.log("inside error");
        console.error(e);
    });

}

function getEmployeePassportDetail(employee_id, callback) {
    console.log("employee_idASa", employee_id)
    var return_data;
    var reqGet = http.request(config.webservice_url + "getEmployeePassportDetail/" + employee_id, function(res) {
        res.on('data', function(data) {
            try {
                return_data = JSON.parse(data);
                console.log("return_dataads", return_data);
                return callback(null, return_data);
            } catch (err) {
                console.error(err)
            }
        });
    });
    reqGet.end();
    reqGet.on('error', function(e) {
        console.log("inside error");
        console.error(e);
    });

}

employeeCrtl.get_employee_details = async function(req, res, next) {
    console.log("sdasd", req.params.employee_id);
    try {

        getEmployeeDetail(req.params.employee_id, function(error, employee_detail) {
            console.log("employee_detaildfdfg", employee_detail)
            if (error) {
                return res.status(400).json({ status: 400, data: {}, message: "Something went wrong. Unable connect mysql webservices" })
            } else {
                return res.status(201).json({ data: { employee_detail }, message: "Employee Role Data Get Succesfully" });
                // company_structure.findOne({ 'ideal_name': employee_detail.practice }, function(err, ideal_practice) {
                //     console.log("ideal_practice", ideal_practice)
                //     if (!err) {
                //         if (ideal_practice != '' || ideal_practice != null) {
                //             console.log("sdsf");
                //             employee_detail["ideal_practice"] = ideal_practice.name
                //             console.log("employee_detail", employee_detail);
                //             return res.status(201).json({ data: { employee_detail }, message: "Employee Role Data Get Succesfully" });
                //         } else {
                //             return res.status(400).json({ status: 400, message: "Something Went Wrong" })
                //         }
                //     } else {
                //         return res.status(400).json({ status: 400, data: {}, message: "Something went wrong. Unable connect mysql webservices" })
                //     }
                // })
            }
        })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" })
    }
}

employeeCrtl.getAllEmployee = async function(req, res) {
    console.log("req.params", req.params)
    try {
        if (req.params.type == "employee") {
            console.log("employee")
            var condition = { 'status': { $in: ['Not Submitted', 'Awaiting Documents', "Awaiting Manager Approval", 'Approved', 'Rejected'] } }
            var emp_detail = await employeeService.getAllEmployee(condition)
        }
        if (req.params.type == "manager") {
            var condition = { 'status': { $in: ['Approved', 'Rejected', 'pending', 'Awaiting Documents', "Awaiting Manager Approval"] } }
            var emp_detail = await employeeService.getAllEmployee(condition)
        }
        if (req.params.type == "img_team") {
            var condition = { 'status': { $in: ['Approved', 'Awaiting Documents', 'Rejected', 'pending', "Awaiting Manager Approval"] } }
            var emp_detail = await employeeService.getAllEmployee(condition)
        }
        return res.status(201).json({ status: 201, data: emp_detail, message: "employee detail" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
}

employeeCrtl.uploaddocs = async function(req, res) {
    //let reqObj = req.body;
    console.log("upload docs sdfefdsfsefsfsdfsfwer")
    console.log("reqObj", req.files)
    console.log("reqbody", req.body)
    var id = req.body._id
    var status = req.body.status
    console.log("id", id, status);
    // if(req.body.img_status){
    //     var status =  req.body.status
    // }

    try {
        // console.log("tr")
        let reqObj = {}
        let data = req['files']['file']
        let array = []

        var emp_detail = await employeeService.getEmployeeById(id)
            //console.log("emp_detail",emp_detail[0].employee_docs)
        if (id && emp_detail[0].employee_docs != "") {
            var arrobj = emp_detail[0].employee_docs
            console.log("arrobj", arrobj);
            data.forEach(function(result, index) {
                let obj = {
                    "filetype": result.mimetype,
                    "originalname": result.originalname,
                    "filepath": result.path,
                    "date": Date.now()
                }
                console.log("object", obj)
                arrobj.push(obj)
                console.log("arrayif", arrobj)
            })
            reqObj.employee_docs = arrobj;
        } else {

            data.forEach(function(result, index) {
                let obj = {
                    "filetype": result.mimetype,
                    "originalname": result.originalname,
                    "filepath": result.path,
                    "date": Date.now()
                }
                console.log("object", obj)
                array.push(obj)
                console.log("arrayelse", array)
            })
            reqObj.employee_docs = array;
        }
        reqObj._id = id;
        reqObj.status = status;
        var emp_detail = await employeeService.addAndUpdateEmployee(reqObj)
        return res.status(201).json({ status: 201, data: emp_detail, message: "employee details added Succesfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
}

employeeCrtl.Updateuploaddocs = async function(req, res) {
    //let reqObj = req.body;
    console.log("upload docs sdfefdsfsefsfsdfsfwer")
    let reqbody = req.body;
    console.log("reqbody", reqbody)
    console.log("reqObj", req.files)
    var obj = JSON.parse(req.body.tags)
    var id = obj._id
    var gmrDocs = obj.gmr_docs
    var emp_img_code = obj.img_code
    console.log("employee_docs", gmrDocs)

    try {
        // console.log("tr")
        let reqObj = {}
        let data = req['files']['file']
        let array = []

        var emp_detail = await employeeService.getEmployeeById(id)
            //console.log("emp_detail",emp_detail[0].employee_docs)
        if (id && emp_detail[0].employee_docs != "") {
            var arrobj = emp_detail[0].employee_docs
            console.log("arrobj", arrobj);
            data.forEach(function(result, index) {
                let obj = {
                    "filetype": result.mimetype,
                    "originalname": result.originalname,
                    "filepath": result.path,
                    "date": Date.now()
                }
                console.log("object", obj)
                arrobj.push(obj)
                console.log("arrayif", arrobj)
            })
            reqObj.employee_docs = arrobj;
        } else {
            data.forEach(function(result, index) {
                let obj = {
                    "filetype": result.mimetype,
                    "originalname": result.originalname,
                    "filepath": result.path,
                    "date": Date.now()
                }
                console.log("object", obj)
                array.push(obj)
                console.log("arrayelse", array)
            })
            reqObj.employee_docs = array;
        }
        reqObj._id = id;
        reqObj.gmr_docs = gmrDocs;
        var emp_detail = await employeeService.addAndUpdateEmployee(reqObj)
        getEmployeeDetail(5855, function(error, img_details) {
            console.log('you data', img_details)
            console.log("sadasd", emp_img_code)
            send_mail(img_details["work_email_address"], 'upload_docs_mail_Rmg', emp_img_code, img_details["employee_name"]);
        })
        return res.status(201).json({ status: 201, data: emp_detail, message: "employee docs updated Succesfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
}

employeeCrtl.gmruploaddocs = async function(req, res) {
    let reqbody = req.body;
    console.log("reqbody", reqbody)
    console.log("reqObj", req.files)
    var obj = JSON.parse(req.body.tags)
    var id = obj._id
    var employeeDoc = obj.employee_docs
    console.log("employee_docs", employeeDoc)

    try {
        // console.log("tr")
        let reqObj = {}
        let data = req['files']['file']
        console.log("datayttytytryt", data)
        let array = []

        var emp_detail = await employeeService.getEmployeeById(id)
            //console.log("emp_detail",emp_detail[0].gmr_docs)
        if (id && emp_detail[0].gmr_docs != "") {
            var arrobj = emp_detail[0].gmr_docs
            console.log("arrobj", arrobj);
            data.forEach(function(result, index) {
                let obj = {
                    "filetype": result.mimetype,
                    "originalname": result.originalname,
                    "filepath": result.path,
                    "date": Date.now()
                }
                console.log("object", obj)
                arrobj.push(obj)
                console.log("arrayif", arrobj)
            })
            reqObj.gmr_docs = arrobj;
        } else {

            data.forEach(function(result, index) {
                let obj = {
                    "filetype": result.mimetype,
                    "originalname": result.originalname,
                    "filepath": result.path,
                    "date": Date.now()
                }
                console.log("object", obj)
                array.push(obj)
                console.log("arrayelse", array)
            })
            reqObj.gmr_docs = array;
        }
        reqObj._id = id;
        reqObj.employee_docs = employeeDoc;
        var emp_detail = await employeeService.addAndUpdateEmployee(reqObj)
        return res.status(201).json({ status: 201, data: emp_detail, message: "GMR DOCS added Succesfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
}

employeeCrtl.gmrStatusUpdate = async function(req, res) {
    //let reqbody = req.body;
    console.log("sadsa", req.params.img_id)
    var obj = req.body
    var id = obj._id
    var employeeDoc = obj.employee_docs
    var gmrDocs = obj.gmr_docs
    console.log("employee_docs", employeeDoc)
    var status = obj.img_status
    console.log("id", id, status);

    try {
        console.log("insidetry")
        let reqObj = {}
        reqObj._id = id;
        reqObj.img_status = status;
        reqObj.employee_docs = employeeDoc;
        reqObj.gmr_docs = gmrDocs;
        var emp_detail = await employeeService.addAndUpdateEmployee(reqObj)
        if (emp_detail) {
            if (emp_detail.img_status == "Awaiting Documents") {
                console.log("asasdaddfgdfgdg")
                send_mail(emp_detail.email, 'awaiting_doc_Emp', emp_detail);
                getEmployeeDetail(req.params.img_id, function(error, employee_details) {
                    console.log('you data', employee_details)
                    send_mail(employee_details["work_email_address"], 'awaiting_doc_Rmg', emp_detail, employee_details["employee_name"]);
                })

            } else if (emp_detail.img_status == 'Work In Progress') {
                send_mail(emp_detail.email, 'work_Progress_Emp', emp_detail);
                getEmployeeDetail(req.params.img_id, function(error, employee_details) {
                    console.log('you data', employee_details)
                    send_mail(employee_details["work_email_address"], 'work_Progress_Rmg', emp_detail, employee_details["employee_name"]);
                })
            } else if (emp_detail.img_status == 'Case Submitted / Decision Pending') {
                send_mail(emp_detail.email, 'Case_pending_Emp', emp_detail);
                getEmployeeDetail(req.params.img_id, function(error, employee_details) {
                    console.log('you data', employee_details)
                    send_mail(employee_details["work_email_address"], 'Case_pending_Rmg', emp_detail, employee_details["employee_name"]);
                })
            } else if (emp_detail.img_status == 'RFE - Request for Evidence') {
                send_mail(emp_detail.email, 'request_evidence_Emp', emp_detail);
                getEmployeeDetail(req.params.img_id, function(error, employee_details) {
                    console.log('you data', employee_details)
                    send_mail(employee_details["work_email_address"], 'request_evidence_Rmg', emp_detail, employee_details["employee_name"]);
                })
            } else if (emp_detail.img_status == 'Visa Approved') {
                send_mail(emp_detail.email, 'visa_approved_Emp', emp_detail);
                getEmployeeDetail(req.params.img_id, function(error, employee_details) {
                    console.log('you data', employee_details)
                    send_mail(employee_details["work_email_address"], 'visa_approved_Rmg', emp_detail, employee_details["employee_name"]);
                })
            } else if (emp_detail.img_status == 'Visa Denied') {
                send_mail(emp_detail.email, 'visa_denied_Emp', emp_detail);
                getEmployeeDetail(req.params.img_id, function(error, employee_details) {
                    console.log('you data', employee_details)
                    send_mail(employee_details["work_email_address"], 'visa_denied_Rmg', emp_detail, employee_details["employee_name"]);
                })
            }

        }
        return res.status(201).json({ status: 201, data: emp_detail, message: "GMR DOCS added Succesfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" });
    }
}

employeeCrtl.get_reportee_mapping_list = async function(req, res, next) {
    try {
        console.log("req.params.manager_id", req.params.manager_id)
        geReporteeList(req.params.manager_id, function(error, employee_detail) {
            // if (error)
            console.log("employee_detail", employee_detail)
                //     return res.status(400).json({ status: 400, data: {}, message: "Something went wrong. Unable connect mysql webservices" })
            var reportee_list = Object.keys(employee_detail);
            return res.status(201).json({ status: 201, data: reportee_list, message: "Employee Details Got Succesfully" })
                // employeeService.get_employee_mapping_list(reportee_list)
                //     .then(employee_skill_data => {
                //         employee_skill_data ? res.status(201).json({ status: 201, data: { employee_skill_data, employee_detail }, message: "Employee Skill Data Get Succesfully" }) : res.status(400).json({ message: 'Something Went Wrong' })
                //     })
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Something Went Wrong" })
    }
}

function geReporteeList(manager_id, callback) {
    var return_data;
    console.log("manager_id", manager_id);
    console.log("api", config.webservice_url + "getReporteeList/" + manager_id)
    var reqGet = http.request(config.webservice_url + "getReporteeList/" + manager_id, function(res) {
        console.log("reqGet", reqGet);
        console.log("res", res)
        var buffers = [];
        res
            .on('data', function(chunk) {
                buffers.push(chunk)

            })
            .on('end', function() {
                try {
                    return_data = JSON.parse(Buffer.concat(buffers).toString());
                    return callback(null, return_data);
                } catch (err) {
                    console.error(err)
                }
            })
    });
    reqGet.end();
    reqGet.on('error', function(e) {
        console.log("inside error");
        console.error(e);
    });

}

async function send_mail(to_mail, type, emp_name, manager_object, ) {
    console.log("hais")
    var subject = '';
    var body = '';
    if (type == 'awaiting_doc_Emp') {

        subject = "Awaiting For Document Emp";
        body = "Dear " + emp_name.firstname + ",\n\n" +
            "Your request " + emp_name.IMG_code + " status changed to 'Awaiting For Document'. \n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'awaiting_doc_Rmg') {

        var emp_name1 = '';
        var emp_name2 = manager_object.split(' ');
        if (emp_name2.length > 2) {
            emp_name1 = emp_name2[1].toString() + ' ' + emp_name2[2].toString();
        }
        subject = "Awaiting For Documents RMG";
        body = "Dear " + emp_name1 + ",\n\n" +
            "Thank you for taking necessary action on request  " + emp_name.IMG_code + " " + emp_name.firstname + "\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'work_Progress_Emp') {

        subject = "Work In Progress Emp";
        body = "Dear " + emp_name.firstname + ",\n\n" +
            "Your request  " + emp_name.IMG_code + " status changed to 'Work In Progress'.\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'work_Progress_Rmg') {

        var emp_name1 = '';
        var emp_name2 = manager_object.split(' ');
        if (emp_name2.length > 2) {
            emp_name1 = emp_name2[1].toString() + ' ' + emp_name2[2].toString();
        }
        subject = "Work In Progress RMG";
        body = "Dear " + emp_name1 + ",\n\n" +
            "Thank you for taking necessary action on request  " + emp_name.IMG_code + " " + emp_name.firstname + "\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'Case_pending_Emp') {

        subject = "Case Pending Emp";
        body = "Dear " + emp_name.firstname + ",\n\n" +
            "Your request  " + emp_name.IMG_code + " status changed to 'Case Pending'. \n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'Case_pending_Rmg') {

        var emp_name1 = '';
        var emp_name2 = manager_object.split(' ');
        if (emp_name2.length > 2) {
            emp_name1 = emp_name2[1].toString() + ' ' + emp_name2[2].toString();
        }
        subject = "Case Pending RMG ";
        body = "Dear " + emp_name1 + ",\n\n" +
            "Thank you for taking necessary action on request  " + emp_name.IMG_code + "\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'request_evidence_Emp') {

        subject = "Request Evidence EMP";
        body = "Dear " + emp_name.firstname + ",\n\n" +
            "Your request  " + emp_name.IMG_code + " status changed to 'Request Evidence'.\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'request_evidence_Rmg') {

        var emp_name1 = '';
        var emp_name2 = manager_object.split(' ');
        if (emp_name2.length > 2) {
            emp_name1 = emp_name2[1].toString() + ' ' + emp_name2[2].toString();
        }
        subject = "Request Evidence RMG";
        body = "Dear " + emp_name1 + ",\n\n" +
            "Thank you for taking necessary action on request  " + emp_name.IMG_code + "\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'visa_approved_Emp') {

        subject = "Visa Approved";
        body = "Dear " + emp_name.firstname + ",\n\n" +
            "Visa Approved.\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'visa_approved_Rmg') {

        var emp_name1 = '';
        var emp_name2 = manager_object.split(' ');
        if (emp_name2.length > 2) {
            emp_name1 = emp_name2[1].toString() + ' ' + emp_name2[2].toString();
        }
        subject = "Visa Approved";
        body = "Dear " + emp_name1 + ",\n\n" +
            "Thank you for taking necessary action on request  " + emp_name.IMG_code + "\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'visa_denied_Emp') {

        subject = "Visa Denied";
        body = "Dear " + emp_name.firstname + ",\n\n" +
            "Visa Denied \n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'visa_denied_Rmg') {

        var emp_name1 = '';
        var emp_name2 = manager_object.split(' ');
        if (emp_name2.length > 2) {
            emp_name1 = emp_name2[1].toString() + ' ' + emp_name2[2].toString();
        }
        subject = "Visa Denied ";
        body = "Dear " + emp_name1 + ",\n\n" +
            "Thank you for taking necessary action on request  " + emp_name.IMG_code + "\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'manager_approve_Emp') {

        subject = "Request Approved by Manager";
        body = "Dear " + emp_name + ",\n\n" +
            "Your request has need approved by manager and it moved to immigration team for further process.\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'manager_reject_Emp') {

        subject = "Request Rejected by Manager";
        body = "Dear " + emp_name + ",\n\n" +
            "Your request has beed rejected by manager.\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'manager_approve_mail_M') {

        var emp_name1 = '';
        var emp_name2 = manager_object.split(' ');
        if (emp_name2.length > 2) {
            emp_name1 = emp_name2[1].toString() + ' ' + emp_name2[2].toString();
        }
        subject = "Manager Approval Process";
        body = "Dear " + emp_name1 + ",\n\n" +
            "Thank you for taking necessary action on request  " + emp_name.IMG_code + "\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }

    if (type == 'upload_docs_mail_Rmg') {
        console.log("asdsadasdas", emp_name)
        var emp_name1 = '';
        var emp_name2 = manager_object.split(' ');
        if (emp_name2.length > 2) {
            emp_name1 = emp_name2[1].toString() + ' ' + emp_name2[2].toString();
        }
        subject = "Document Upload";
        body = "Dear " + emp_name1 + ",\n\n" +
            "Request " + emp_name + " uploaded documents. Take the necessary action on the request to proceed further.\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'manager_approve_mail_Rmg') {

        var emp_name1 = '';
        var emp_name2 = manager_object.split(' ');
        if (emp_name2.length > 2) {
            emp_name1 = emp_name2[1].toString() + ' ' + emp_name2[2].toString();
        }
        subject = "Manager Approval Process";
        body = "Dear " + emp_name1 + ",\n\n" +
            "Request " + emp_name.IMG_code + " approved by manger. Take the necessary action on the request to proceed further.\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'manager_reject_mail_M') {

        var emp_name1 = '';
        var emp_name2 = manager_object.split(' ');
        if (emp_name2.length > 2) {
            emp_name1 = emp_name2[1].toString() + ' ' + emp_name2[2].toString();
        }
        subject = "Manager Rejection Process";
        body = "Dear " + emp_name1 + ",\n\n" +
            "Thank you for taking necessary action on request  " + emp_name.IMG_code + "\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'employee_submit_mail') {

        subject = "Request Submitted";
        body = "Dear " + emp_name.firstname + " " + emp_name.lastname + ",\n\n" +
            "Thank you for creating request on immigrarion portal.\nYour request " + emp_name.IMG_code + " has been created successfully and waiting for manager approval. \n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }
    if (type == 'emp_details_manager_mail') {
        console.log("emp_name", emp_name);
        var emp_name1 = '';
        var emp_name2 = manager_object.split(' ');
        if (emp_name2.length > 2) {
            emp_name1 = emp_name2[1].toString() + ' ' + emp_name2[2].toString();
        }
        subject = "Request for approval";
        body = "Dear " + emp_name1 + ",\n\n" +
            "Request  " + emp_name.IMG_code + " created by " + emp_name.firstname + " " + emp_name.lastname + ". Take the necessary action on the request to proceed further.\n\n" +
            "This is a demo. Please Ignore" +
            "Regards,\n" +
            "HR";
    }

    var mailOptions = {
        from: 'fastsupport@hindujatech.com',
        // to: to_mail,
        // to: ['fastsupport@hindujatech.com', 'rajasekaran.kumar@hindujatech.com'],
        to: 'fastsupport@hindujatech.com',
        subject: subject,
        text: body
    };
    // async function handleEmail(result) {
    //     const email = result.rows[0];
    //     for (let [i, contact] of email.json_agg.entries()) {
    //         const msg = {
    //           from: process.env.EMAIL_USER,
    //           to: contact.email,
    //           subject: email.subject,
    //           text: email.emailBody + ' ' + i
    //         };
    //         await transporter.sendMail(msg);
    //     }
    // }
    //console.log("mailOptions", mailOptions);
    try {
        // setTimeout(function  () {
        await mail.mail_configuration.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        // }, 2000)
    } catch (e) {
        console.log(e);
    }


}

module.exports = employeeCrtl;