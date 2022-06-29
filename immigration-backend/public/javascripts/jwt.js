const expressJwt = require('express-jwt');
const config = require('../../config.json');
var http = require('https');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/api/user/login/authenticateUser',
            'api/employee/getAll',
            '/uploads/'
        ]
    });
}

// async function isRevoked(req, payload, done) {
//     console.log(req)
//     var reqGet = http.request(config.webservice_url + "getEmployeeById/" + payload.sub, function(res) {
//         res.on('data', function(data) {
//             user_detail = JSON.parse(data);
//             if (user_detail) {
//                 return done(true);
//             } else {
//                 done();
//             }
//         });
//     });
//     reqGet.end();
//     reqGet.on('error', function(e) {
//         console.log("inside error");
//         console.error(e);
//     });
// };