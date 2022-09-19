const mongoose = require('mongoose')

const User = mongoose.model("user",{
    uuid:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    phone_number:{
        type:String,
    },
})

module.exports = {User}