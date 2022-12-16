const utils = require('../utils/')
const Service = require('../services')
const ManageToken = require('../lib')
const crypto = require('crypto')
//const services = require('../services')
const randomstring = require('randomstring')

function encodeRole(role)
{
    return new Promise((resolve,reject)=>{
        if(!role)
        {
            reject(new Error("No role passed!!"))
        }
        else
        {
            switch(role)
            {
                //for SUPERADMIN role
                case "SUPERADMIN":
                    role=0;
                    break;
                //for ADMIN role
                case "ADMIN":
                    role=1;
                    break;
                //for USER role
                case "USER":
                    role=2;
                    break;
                case "DRIVER":
                    role=3;
                    break;

                default:
                    role=-1;
            }
            if(role == -1)
            {
                reject(new Error("Wrong Role Passed"))
            }
            else{
                resolve(role);
            }
        }
    });
}

function decodedRole(role)
{
    console.log("role+++++++++++++++++++", role)
    return new Promise((resolve,reject)=>{
        switch(role)
        {
            case 0:
                role = "SUPERADMIN";
                break;

            case 1:
                role = "SUPERADMIN";
                break;

            case 2:
                role = "SUPERADMIN";
                break;

            case 3:
                role = "SUPERADMIN";
                break;

            default:
                role=-1
        }
        console.log("role-----------change---", role)
        if(role == -1)
        {
            reject(("wrong role"))
        }
        else{
            console.log(role)
            resolve(role)
        }
    })
}

let _userAuth = {}
//
_userAuth.createUser = async (payloadData) => { 
    console.log("payloadData", payloadData)     //any variable can be used instead of createUser here
    let userExists;
    let user;

    try {
        let criteria = {
            email: payloadData.email    
        }
        userExists = await Service.UserService.getOne(criteria);
        console.log("userExists", userExists)
        
        if (!userExists) {
            payloadData.role = await encodeRole(payloadData.role);
            payloadData.password = utils.helpers.hash(payloadData.password)
            userExists = await Service.UserService.createUser(payloadData)
            console.log("The new user is:------> ", userExists)
            return userExists;
        }else{
           throw new Error('User already exists !'); 
        }
    } catch (error) {
        throw error
    }
}

_userAuth.login = async (payloadData)=>{
    let criteria = {
        email: payloadData.email
    }

    let data = await Service.UserService.getOne(criteria)
    if(!data)
    {
        throw new Error('User does not exist!!')
    }
    else
    {
        let passwordMatch = utils.helpers.compareHash(payloadData.password, data.password)
        if(!passwordMatch)
        {
            throw new Error('email or password did not match')
        }
        else
        {
            let tokenData = {}
            tokenData.id = data._id.toString();
            tokenData.role = await decodedRole(data.role);
            console.log("check---- ---- --->>2 ", tokenData.role)
            let token = await ManageToken.TokenManager.signToken(tokenData)
            return {
                token: token,
                role: tokenData.role
            }
            //return token
        }
    }
}

_userAuth.getUser = async ()=>{
    let users;
    users = await Service.UserService.getUser();
    console.log(users)
    return users
}

_userAuth.getParticularUser = async(queryData)=>{
    console.log(queryData)
    let criteria = {email: queryData.email}
    console.log(criteria)
    let user = await Service.UserService.getOne(criteria)
    return user
}

_userAuth.forgetPassword = async(payloadData)=>{
    var criteria = {
        email: payloadData.email
    }
    // console.log("Criteria is**********************", criteria)
    data = await Service.UserService.getOne(criteria);
    // console.log("data in COntroller is ---------------------", data)
    // console.log("data in Controller email is ->->->->->->->->->->->", data.email)
    if(!data)
    {
        throw new Error("This email does not exist in the database!!")
    }
    const randomString = randomstring.generate()
    
    criteria = {
        $set:{Token: randomString}
    }
    Service.UserService.updateUser(criteria, payloadData)
    utils.SendEmail(data.email, data.subject, randomstring)

    //check error in generating otp
    // if(!generatedToken)
    // {
    //     throw new Error("An unknown error occured.PLease try again later!!")
    // }

    // //converting token to hex string
    // const convertTokenToHexString = generatedToken.toString("hex")

    // //set the token and expiring period for the token to the user schema 
    // Service.UserService.createForgotPassword(convertTokenToHexString)
}




module.exports = _userAuth;