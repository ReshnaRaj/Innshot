"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:process.env.email , // generated ethereal user
      pass:process.env.password, // generated ethereal password
    },
  });

async function sendMail(email,subject,msg,isApproved){
  let approvalStatus = isApproved ? 'Approved' : 'Rejected';
  let approvalMessage = isApproved ? 'Congrats! Your resort is approved.' : 'We regret to inform you that your resort is rejected.';
  let info = await transporter.sendMail({
    from:process.env.email,  // sender address
    to: email, // list of receivers
    subject: `Innshot ${approvalStatus} - ${subject}`, // Subject line
    text: msg, // plain text body
    html: `<p>${approvalMessage}</p>`
    

    
  });
  
  return info




}
module.exports=sendMail



