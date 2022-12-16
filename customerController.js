const utils = require('../utils/')
const Service = require('../services')
//const ManageToken = require('../lib')

let _customerAuth = {}
//
_customerAuth.createCustomer = async (payloadData) => { 
    console.log("payloadData", payloadData)     //any variable can be used instead of createUser here
    let customerExists;
    let customer;

    try {
        let criteria = {
            email: payloadData.email    
        }
        customerExists = await Service.CustomerService.getOne(criteria);
        console.log("customerExists", customerExists)
        
        if (!customerExists) {
            payloadData.password = utils.helpers.hash(payloadData.password)
            customerExists = await Service.CustomerService.createUser(payloadData)
            console.log("The new customer is:------> ", customerExists)
            return customerExists;
        }else{
           throw new Error('customer already exists !'); 
        }
    } catch (error) {
        throw error
    }
}

_customerAuth.getCustomer = async () => {
    try
    {
        let criteria = {};
        let projection = {}
        let populateVariable = {path: 'userId'}
        let data = await Service.CustomerService.getAll(criteria,projection,populateVariable)
        if(!data)
        {
            console.log("data in getAllCustomers is", data)
            throw new Error("address not found")
        }
        else
        {
            return data
        }
    }catch(error){
        throw error
    }
}

module.exports = _customerAuth;