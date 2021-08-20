import nodemailer from 'nodemailer';

import { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM } from '../config/index.js'
// create reusable transporter object using the default SMTP transport
const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: EMAIL_SERVICE, // true for 465, false for other ports
        auth: {
            user: EMAIL_USER, // generated ethereal user
            pass: EMAIL_PASSWORD, // generated ethereal password
        },       
    });
   

    // send mail with defined transport object
    let mailoption = {
        from: EMAIL_FROM, // sender address
        to: options.to, // list of receivers
        subject:options.subject, // Subject line
        html: options.text, // html body
    };
    

    transporter.sendMail(mailoption, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(info);
        }
    })
}
export default sendEmail;