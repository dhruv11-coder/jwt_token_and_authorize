//TOKEN SCHEMA MUST BE CREATED FOR AUTHENTICATION

const mongoose = require('mongoose')
const tokenSchema = mongoose.Schema({
    authorization:{
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('token', tokenSchema)