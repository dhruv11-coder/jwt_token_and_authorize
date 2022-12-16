const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstName:{
        type: String
    },
    email:{
        type: String
    },
    role:{
        type: Number,
        enum: [0,1,2,3],
        required: [true, "Please specify user role"],
        default : 2
    },
    password:{
        type: String    //manish joshi
    },
    Token:{
        type: String,
        default: ''
    }
},

{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)