"use strict";

require('dotenv').config();
const jwt = require('jsonwebtoken');
const {
  v4: uuidv4  //unique identifier version 4
} = require('uuid')

const _tokenManager = {};

_tokenManager.signToken = function signToken(data) {
  return new Promise((resolve, reject) => {
    // Assign jwt token
    const secret = process.env.SECRET || "Development";
    const token = jwt.sign(data, secret, {
      expiresIn: process.env.TIME_TO_EXPIRE || "24h", // expires in 1 day,
      jwtid: uuidv4()
    });
    if (!token) {
      reject(new Error("Unable to sign token !!"));
    } else {
      resolve(token);
      return token //
    }
  });
};


module.exports = _tokenManager;