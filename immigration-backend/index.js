const express = require('express');
const mongoose = require("mongoose");

const app = express();

const secureRoutes = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('./public/javascripts/jwt');
const errorHandler = require('./public/javascripts/error-handler');
var userLogin = require('./routers/userloginRoute');
var employee = require('./routers/employeeRoute');
const config = require('./config')[process.env.NODE_ENV || "dev"];

mongoose.Promise = global.Promise;
app.use(cors());
app.use(jwt());
app.use(errorHandler);
app.use(secureRoutes);
app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use('/api/user/login', userLogin);
app.use("/api/employee", employee);
//require('./router')(app, config);

mongoose.connect(`${config.db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(
    () => {
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(' Middleware - Database connected as successfully');
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    },
    err => {
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(' Middleware - Database connection Error');
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    }
);

module.exports = app;
// app.listen(port, function() {
//     console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
//     console.log(' IMMIGRATION is listening the following port number: ' + port);
//     console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
// });