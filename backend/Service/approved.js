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

// async function sendMail(email,subject,msg,isApproved){
//   let approvalStatus = isApproved ? 'Approved' : 'Rejected';
//   let approvalMessage = isApproved ? 'Congrats! Your resort is approved.' : 'We regret to inform you that your resort is rejected.';
//   let info = await transporter.sendMail({
//     from:process.env.email,  // sender address
//     to: email, // list of receivers
//     subject: `Innshot ${approvalStatus} - ${subject}`, // Subject line
//     text: msg, // plain text body
//     html: `<p>${approvalMessage}</p>`
    

    
//   });
let sendMail=(name,email,reason)=>{
  return new Promise((resolve,reject)=>{
    let mailOptions;
    if(reason){
      mailOptions={
        to:email,
        from:process.env.email,
        subject:"Regarding the Resort Approval Confirmation from  Innshot",
        html:
        "<h2> Hi" +name + ",</h2>" +
        "<h3> Sorry to inform you that, your resort is not accepted</h3>"+
        "<h3 style='font-weight:bold;'> It is because"+
        reason +
        "</h3>"
      }
    }
    else{
      mailOptions={
        to:email,
        from:process.env.email,
        subject:"Regarding the Resort Approval Confirmation from Innshot",
        html:
        "<h2> Hi" +name + ",</h2>" +
        "<h2 style='font-weight:bold;'>Congratulations!</h2>" +
        "<h3 >Your Resort is approved.</h3>" +
        "<h3 style='font-weight:bold;'>The team wishing you a happy Business</h3>" 
      } 
    }
    transporter.sendMail(mailOptions,(error,info)=>{
      if(error){
        reject({status:'error',error:error})
      }
      else{
        resolve({status:'success'})
      }
    })
  })
}
  
//   return info




// }
// module.exports=sendMail



