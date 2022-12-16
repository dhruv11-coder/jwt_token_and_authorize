const Models = require('../models');
const crypto = require('crypto');
const { ClientRequest } = require('http');
//container for module(to be exported)
const _service={};

//create and save a new user
_service.createUser = (objToSave)=>{
    var newUser = new Models.User(objToSave);
    return newUser.save().then(response=>{
        return response.toObject();
    });
};

//let sorting = {sort :{firstName: 1}}
_service.getOne = (criteria, projection= {},  options = {})=>{
   return Models.User.findOne(criteria, projection, options).exec();
} 

_service.getUser = (criteria, options = {})=>{
    return Models.User.aggregate([
        {
            $lookup: {
                from: "customers", //name of the collection(name of collection must be the exact name as it is saved in the databsse)
                as: "Customer", //how do we want to show it
                let: {userId: "$_id"},
                pipeline: [
                    {$match: {$expr: {$eq: ['$userId', '$$userId']}}}
                ]
            }
        },
        {
            $project: {
                _id: 1,
                firstName: 1,
                email: 1,
                Customer: 1
            }
        }
    ]).exec()
    //return Models.User.find(criteria, options = {}).exec();
 }

 _service.updateUser = (payloadData, criteria)=>{
    return Models.User.updateOne(payloadData, criteria, {new: true}).exec();
 }


_service.createForgotPassword = async(data)=>{
    //console.log("Data is---------------------> ", data)
    Models.User.resetToken = data,
    Models.User.expireToken = Date.now() + 1800000
    console.log("models.user.resetToken is----------------------> ", Models.User.resetToken)
    const criteria = Models.User.resetToken
    console.log("criteria is------------->  ", criteria)
    try
    {
        const saveToken = await Models.User(criteria)
        console.log("saveToken is  -----------> ", saveToken)
        return saveToken.save().then(response=>{
            console.log("response is  -------------->  ", response)
            return response.toObject()
        })
    }
    catch(err){
        throw new Error(`An error occured while trying to save the token ${err}`)
    }
}

// _service.createForgetPassword = ()=>{
//     var newUser = new Models.User(objToSave);
//     return newUser.save().then(response=>{
//         return response.toString();
//     });
// };
module.exports = _service;