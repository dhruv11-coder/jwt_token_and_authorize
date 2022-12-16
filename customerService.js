const Models = require('../models');

//container for module(to be exported)
const _service={};

//create and save a new user
_service.createUser = (objToSave)=>{
    var newCustomer = new Models.Customer(objToSave);
    return newCustomer.save().then(response=>{
        return response.toObject();
    });
};

//let sorting = {sort :{firstName: 1}}
_service.getOne = (criteria, projection= {},  options = {})=>{
   return Models.Customer.findOne(criteria, projection, options).exec();
}

_service.getAll = (criteria, projection={},populateVariable)=>{
    return Models.Customer.find(criteria, projection={}).populate(populateVariable).exec();
}
module.exports = _service;