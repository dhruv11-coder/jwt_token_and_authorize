const express = require('express');
const Controllers = require('../controllers')
const router = express.Router();
const {UniversalFunction} = require('../utils')

router.post("/createCustomer", (req, res) => {
    // send only the data that is required by the controller
    Controllers.CustomerController.createCustomer(req.body)
        .then(data => {
            if (!data) 
            {
                console.log("got error")
                return UniversalFunction.sendError(res)
            } 
            else 
            {
                const message = "check otp for login..."
                return UniversalFunction.sendSuccess(res, data, message)
            }
        })
        .catch(error => {
            console.log("got error")
            return UniversalFunction.sendCatchError(res, error.message)
        });
});

router.get('/getCustomer', (req,res)=>{
    Controllers.CustomerController.getCustomer().then(data=>{
        if(!data)
        {
            console.log("error in getting customers")
            return UniversalFunction.sendError(res)
        }
        else{
            const message = "Every document in the collection"
            return UniversalFunction.sendSuccess(res,data,message)
        }
    }).catch(error=>{
        console.log('get catch error')
        return UniversalFunction.sendCatchError(res, error.message)
    })
})

module.exports = router;