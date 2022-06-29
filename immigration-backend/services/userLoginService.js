// Gettign the Newly created Mongoose Model we just created 
const jwt = require('jsonwebtoken');
const config = require('../config.json');
//var EmployeeSkillMappingService = require('../services/employee_skill_mapping.service')
var http = require('http');
var https = require('https');

exports.authenticateUser = async function({ username, password }, callback) {
    // console.log(username)
    // console.log(password)
    // var reqGet = http.request(config.webservice_url + "login/" + username + "/" + encodeURIComponent(password), function(res) {
    //     res.on('data', function(data) {
    //         user_detail = JSON.parse(data);
    //         if (user_detail.status == 201) {
    //             const userWithoutHash = user_detail["data"];
    //             const token = jwt.sign({ sub: userWithoutHash.id }, config.secret); //{expiresIn: config.token_life // expires in 24 hours}
    //             return callback(null, {...userWithoutHash, token });
    //         } else {
    //             return callback(null, null);
    //         }
    //     });
    // });
    // reqGet.end();
    // reqGet.on('error', function(e) {
    //     console.log("inside error", e);
    //     console.error(e);
    // });
    var reqGet = https.request(config.webservice_url + "login/" + username + "/" + encodeURIComponent(password), function(res) {
        res.on('data', function(data) {

            user_detail = JSON.parse(data);
            console.log("data1", user_detail);

            if (user_detail.status == 201) {
                const userWithoutHash = user_detail["data"];
                const token = jwt.sign({ sub: userWithoutHash.id }, config.secret, { expiresIn: config.token_life }); //{expiresIn: config.token_life // expires in 24 hours}
                //const refreshtoken = jwt.sign({ sub: userWithoutHash.id }, config.secret,{expiresIn: config.refreshTokenLife});

                return callback(null, {...userWithoutHash, token });


            } else {
                return callback(null, null);
            }
        });
    });
    reqGet.end();
    reqGet.on('error', function(e) {
        console.log("inside error");
        console.error(e);
    });
}


exports.candidate_login = async function({ username, password }, callback) {
    var reqGet = https.request(config.webservice_url + "login/" + username + "/" + password, function(res) {
        res.on('data', function(data) {
            user_detail = JSON.parse(data);
            if (user_detail.status == 201) {
                const userWithoutHash = user_detail["data"];
                const token = jwt.sign({ sub: userWithoutHash.id }, config.secret); //{expiresIn: config.token_life // expires in 24 hours}
                return callback(null, {...userWithoutHash, token, is_rmg: true });
            } else {
                return callback(null, null);
            }
        });
    });
    reqGet.end();
    reqGet.on('error', function(e) {
        console.log("inside error");
        console.error(e);
    });
}

function getEmployeeDetail(employee_id, callback) {
    var return_data;
    var reqGet = https.request(config.webservice_url + "getEmployeeDetail/" + employee_id, function(res) {
        res.on('data', function(data) {
            try {
                return_data = JSON.parse(data);
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