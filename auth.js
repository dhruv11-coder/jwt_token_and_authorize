require("dotenv").config();

const jwt = require("jsonwebtoken");
const Model = require('../models/index')
//const role = require('../role')


const getToken = function (req) 
{
    if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") 
    {
      // Authorization: Bearer g1jipjgi1ifjioj
      // Handle token presented as a Bearer token in the Authorization header
      return req.headers.authorization.split(" ")[1];
    } 
    else if (req.query && req.query.token) 
    {
      // Handle token presented as URI param
      return req.query.token;
    } 
    else if (req.cookies && req.cookies.token) 
    {
      // Handle token presented as a cookie parameter
      return req.cookies.token;
    }
    // If we return null, we couldn't find a token.
    // In this case, the JWT middleware will return a 401 (unauthorized)
    // to the client for this request
    return null; 
};


const _auth={}

_auth.user = (req,res,next) =>{
    const token = getToken(req);
    if (!token) {
        return res.status(401).json({
        success: "false",
        message: "Unauthorised access",
        data: {}
    });
    } 
    else {
        jwt.verify(token, "Development", (err, decoded) => {

         
        if (err || (decoded && decoded.role) != "USER") {
            return res.status(401).json({
            success: "false",
            message: "Unauthorised access or token expired",
            data: {}
        });
        } 
        else {
            const criteria = {
                _id: decoded.id
        };
            Model.User.findOne(criteria, function (err, admin) {
            if (err || !admin) {
                res.status(401).json({
                success: false,
                message: "Unable to Find user",
                data: {}
                });
            } 
            else {
                delete admin.password;
                admin.token = token;
                req.admin = admin;
                next();
            }
        });
      }
    });
  }
}

_auth.superadmin = function (req, res, next) {
  console.log("request in superadmin is----------------->", req.body)
    const token = getToken(req);
   
    console.log("token : "   + token)
    if (!token) {
      return res.status(401).json({
        success: "false",
        message: "Unauthorised access",
        data: {}
      });
      
    } else {
      
  
      jwt.verify(token, process.env.JWT_SECRET , (err,decoded) => {
        
        //decoded = req.body;
        console.log("decoded value is------->  ", decoded)
        console.log("decoded : "+JSON.stringify(decoded),"err : "+err)
        console.log("decoded role :"+JSON.stringify(decoded.role))
    
        if (err || (decoded && decoded.role) != "SUPERADMIN") {
          return res.status(401).json({
            success: "false",
            message: "Unauthorised access or token expired",
            data: {}
          }); 
        } else {
          const criteria = {
            _id: decoded.id
          };
          Model.User.findOne(criteria, function (err, superadmin) {
            if (err || !superadmin) {
              res.status(401).json({
                success: false,
                message: "Unable to Find user",
                data: {}
              });
            } else {
              delete superadmin.password;
              superadmin.token = token;
              req.superadmin = superadmin;
              next();
              res.end()
            }
          });
        }
      });
    }
  
  }


  
module.exports = _auth;