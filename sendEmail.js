require("dotenv").config();

const nodemailer = require('nodemailer');
const { Token } = require("../models");

const sendEmail = async(email, subject, randomstring)=>{

    //create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        auth: {
            user: process.env.SMTP_EMAIL || 'a96014422',
            pass: process.env.SMTP_PASSWORD || 'Pandey@9080'
        }
    })

    //send email with defined transport object
    let message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>,`, //sender's address
        to: email,
        subject: subject || 'for reset password',
        text: Token
    }

    const info = await transporter.sendMail(message)
    console.log("Message sent: %s", info.messageId)
}

module.exports = sendEmail