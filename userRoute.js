const express = require('express');
const Controllers = require('../controllers')
const router = express.Router();
const {UniversalFunction} = require('../utils')
const authenticate = require('../lib');
const { Auth } = require('../lib');

router.post("/createUser", (req, res) => {
    // send only the data that is required by the controller
    Controllers.UserController.createUser(req.body)
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

router.post('/login', (req,res)=>{
    Controllers.UserController.login(req.body)
    .then(data => {
        if (!data) 
        {
            console.log("got error")
            return UniversalFunction.sendError(res)
        } 
        else 
        {
            const message = "login success....."
            return UniversalFunction.sendSuccess(res, data, message)
        }
    })
    .catch(error => {
        console.log("got error in catch")
        return UniversalFunction.sendCatchError(res, error.message)
    });

})

router.get("/getUser", Auth.superadmin, (req,res)=>{

    Controllers.UserController.getUser(req.query).then(data=>{
        if(!data)
        {
            console.log('error in getting users')
            return UniversalFunction.sendError(res)
        } 
        else
        {
            const message = 'every user in the collection'
            return UniversalFunction.sendSuccess(res,data,message)
        }
    }).catch(err=>{
        console.log('get catch error')
        return UniversalFunction.sendCatchError(res, err.message)
    })
})

router.get("/getOne", (req,res)=>{
    Controllers.UserController.getParticularUser(req.query).
    then( data => {
        if(!data){
            console.log("Data not found")
        }else{
            return UniversalFunction.sendSuccess(res, data)
        }
    }).catch(e => {
        return e;
    })
})

router.post('/forgetPassword', (req,res)=>{

    Controllers.UserController.forgetPassword(req.body)
    .then(data => {
        console.log("data in route is+++++++++++++++++++++", data)
        if (!data) 
        {
            console.log("got error")
            return UniversalFunction.sendError(res)
        } 
        else 
        {
            const message = "Your new password is....."
            return UniversalFunction.sendSuccess(res, data, message)
        }
    })
    .catch(error => {
        console.log("got error in catch ")
        return UniversalFunction.sendCatchError(res, error.message)
    });
})

module.exports = router;