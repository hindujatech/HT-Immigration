var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    emp_id: { type: String },
    emp_number: { type: String },
    chat: [{
        message: { type: String },
        chat_on: { type: String },
        created_on: { type: Date, default: Date.now }
    }]
})

module.exports = mongoose.model("chat", employeeSchema, "chat");