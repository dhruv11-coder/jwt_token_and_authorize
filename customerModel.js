const mongoose = require('mongoose')
const customerSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref:"user",
        required: true
    },
    firstName:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
},

{
    timestamps: true
})

module.exports = mongoose.model('customer', customerSchema)



