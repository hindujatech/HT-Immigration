var UserService = require('../services/userLoginService')

exports.authenticateUser = async function(req, res, next) {
    console.log("login api")
    console.log("reqody", req.body);
    UserService.authenticateUser((req.body), function(error, response) {
        if (error)
            throw new Error("Error while fetching fetching data");
        response ? res.json(response) : res.status(400).json({ message: 'Username or password is incorrect' })
    });
}
exports.candidate_login = async function(req, res, next) {
    UserService.candidate_login((req.body), function(error, response) {
        if (error)
            throw new Error("Error while fetching fetching data");
        response ? res.json(response) : res.status(400).json({ message: 'Username or password is incorrect' })
    });
}


// var http = require('http');
// const jwt = require('jsonwebtoken');
// const config = require('../config.json');
// const userService = require('../services/userInfo.service');

// exports.authenticateUser = async function (req, res, next) {
//     try { 
//         console.log(req.body)
//     const imei_no  = req.body.imie_no;

//     if(!imei_no)
//     {
//         return res.status(201).json({  success: false, message:"", "messageStatus": "Enter your Imie No" })

//     }
//     else{

//     doAuthendication(req.body,async function (error, employee_detail) {
//         if (error || employee_detail === null)
//             return res.status(201).json({  success: false, message:"", "messageStatus": "Username and Password is incorrect." })

//         // console.log(authDetail)
//         finalResult = await userService.userInsert(imei_no, employee_detail)
//          if(!finalResult)
//         {
//             return res.status(201).json({  success: false, message:"", "messageStatus": "Enter your Correct Imie No" })

//         }
//         else{
//             return res.status(200).json({ success: true, message:{ ...employee_detail,"profile_pic_url":''},"messageStatus":"Login successfully"})
//         }


//     })

//     }



// }catch (err) {
//     throw err;
//   }
// }



// function doAuthendication({ username, password }, callback) {
//     var reqGet = http.request(config.webservice_url + "login/" + username + "/" + encodeURIComponent(password), function (res) {
//         res.on('data', function (data) {
//         user_detail = JSON.parse(data);

//             if (user_detail.status == 201) {
//                 const userWithoutHash = user_detail["data"];
//                 const token = jwt.sign({ sub: userWithoutHash.id }, config.secret,{expiresIn: config.token_life});//{expiresIn: config.token_life // expires in 24 hours}
//                 const refreshtoken = jwt.sign({ sub: userWithoutHash.id }, config.secret,{expiresIn: config.refreshTokenLife});

//                 return callback(null, { ...userWithoutHash, token,refreshtoken });


//             } else {
//                 return callback(null, null);
//             }
//         });
//     });
//     reqGet.end();
//     reqGet.on('error', function (e) {
//         console.log("inside error");
//         console.error(e);
//     });
// }