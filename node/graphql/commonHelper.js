const fs = require('fs')
const util = require('util')
var FCM = require('fcm-node');
var nodemailer = require('nodemailer');
var serverKey = 'AAAAuHbsbq4:APA91bFf9VkaLpuWm0vfMTfDIofpl8Lz4ySnkJfW8w0tvZss0CR5ozVQ97As7hVVL4k0nN-rANxTvRLBxRH3XuEXkHICQi8FKcV6fuqJpqcRsI0YF4XuFODcojoqKZaJ-uz9H_to-9U2';
var fcm = new FCM(serverKey);
const env = process.env;


module.exports.home=0;
module.exports.pending=1;
module.exports.on_going=2;
module.exports.completed=3;
module.exports.chat =4;
module.exports.booking_view =5;

module.exports.no_image = () => {
  return env.APP_URL + '/images/public/no_img.jpg';
}
module.exports.siteName = () => {
  return env.APP_NAME;
}
module.exports.getBaseurl = () => {
  return env.APP_URL;
}
module.exports.getPaymenturl = () => {
  return env.PAYMENT_URL;
}
module.exports.siteUrl = () => {
  return env.APP_URL;
}
module.exports.prepareUploadFolder = (path) => {
  const pathExist = fs.existsSync(path)
  if (!pathExist) {
    fs.mkdirSync(path, {
      recursive: true
    })
  }
}

module.exports.push_notifiy = async (message) => {
  //console.log("push work");
  // console.log(message);
  return await fcm.send(message, function (err, response) {
    if (err) {
      // console.log(err);
      //console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

//============================smsapi===================//
const c={
  apiKey:'f540f924836a040b4ca223a7503114e4fdf667bdcb131d91c1c1e04ba95e79d1',
  username:'vijayaraj s'
}
const a=require('africastalking')(c)
const sms=a.SMS
module.exports.send_sms=async(data,res)=>{
  const tot=req.body.number
  const messgae=req.body.text
  sms.send({tot:`+254{to}`,messgae}).then(suc=>{
    console.log("suc")
    res.json(suc)
  }).catch(e=>{
    console.log(e)
  })

}
//============================smsapi===================//

module.exports.send_mail = async (email, otp) => {
  // console.log('vis',email,otp);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth: {
      user: 'emepedia2020@gmail.com',
      pass: '@Vinya2017'
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
      }
  });
  let mailOptions = {
    from: 'waioztechnology@gmail.com',
    to: email, // list of receivers
    subject: "GIGZZY OTP ✔", // Subject line
    text: "OTP?", // plain text body
    html: `<b>GIGZZY OTP : ${otp} </b>` // html body
    // subject:strtr(admin_email.subject, req.data), // Subject line
    // html: mail_content // html body
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    console.log(error,info,mailOptions)
    if (error) {
      console.error(error);
      return false;
    }
    else {
      console.error(info);
      return true;
    }
  });
}
module.exports.send_mail_1 = async (email, msg) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 25,
    service: 'gmail',
    auth: {
      user: 'picvi.acc@gmail.com',
      pass: 'yumcyizjbsevpscg'
    }
  });
  let mailOptions = {
    from: 'waioztechnology@gmail.com',
    to: email, // list of receivers
    subject: "GIGZZY ✔", // Subject line
    text: "Admin change proof status?", // plain text body
    html: `<b> ${msg} </b>` // html body
    // subject:strtr(admin_email.subject, req.data), // Subject line
    // html: mail_content // html body
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      //console.error(error);
      return false;
    }
    else {
      // console.error(info);
      return true;
    }
  });
}

/*
  Tab No for Push Notification
*/
