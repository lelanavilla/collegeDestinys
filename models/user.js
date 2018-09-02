const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        required: true,
        type:String
    },
    password: {
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    account_info :{
        required:true,
        type:Object
    },
    uploads: {
        type:Array
}});
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;