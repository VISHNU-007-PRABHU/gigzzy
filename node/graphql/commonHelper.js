const fs = require("fs");
const util = require("util");
var FCM = require("fcm-node");
var nodemailer = require("nodemailer");
var sesTransport = require("nodemailer-ses-transport");
const dotenv = require('dotenv');
dotenv.config();
const smtpEndpoint = process.env.smtpEndpoint;
const port = process.env.AWS_PORT;
const senderAddress = process.env.senderAddress;
const smtpUsername = process.env.smtpUsername;
const smtpPassword = process.env.smtpPassword;
var serverKey =
  "AAAAuHbsbq4:APA91bFf9VkaLpuWm0vfMTfDIofpl8Lz4ySnkJfW8w0tvZss0CR5ozVQ97As7hVVL4k0nN-rANxTvRLBxRH3XuEXkHICQi8FKcV6fuqJpqcRsI0YF4XuFODcojoqKZaJ-uz9H_to-9U2";
var fcm = new FCM(serverKey);
const env = process.env;
const africa = require("africastalking")({
  apiKey: process.env.AFRICASTALKING_API_KEY,
  username: process.env.AFRICASTALKING_API_USERNAME,
});
const sms = africa.SMS;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const transporter = nodemailer.createTransport({
  host: smtpEndpoint,
  port: port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtpUsername,
    pass: smtpPassword
  }
});

module.exports.home = 0;
module.exports.pending = 1;
module.exports.on_going = 2;
module.exports.completed = 3;
module.exports.chat = 4;
module.exports.booking_view = 5;

module.exports.no_image = () => {
  return env.APP_URL + "/images/public/no_img.png";
};
module.exports.siteName = () => {
  return env.APP_NAME;
};
module.exports.getBaseurl = () => {
  return env.APP_URL;
};
module.exports.getPaymenturl = () => {
  return env.PAYMENT_URL;
};
module.exports.siteUrl = () => {
  return env.APP_URL;
};
module.exports.mpesaURL = () => {
  if (env.MPESA) {
    return env.MPESA_PRODUCTION;
  } else {
    return env.MPESA_SANDBOX;
  }
};
module.exports.prepareUploadFolder = (path) => {
  const pathExist = fs.existsSync(path);
  if (!pathExist) {
    fs.mkdirSync(path, {
      recursive: true,
    });
  }
};

module.exports.push_notifiy = async (message) => {
  return await fcm.send(message, function (err, response) {
    if (err) {
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

//============================smsapi===================//
module.exports.send_sms = async (phone_no, msg) => {
  let message = msg || "Gigzzy sms notification"
  const options = {
    to: `+${phone_no}`,
    message: message,
    from: "Gigzzy"
  }
  sms
    .send(options)
    .then((suc) => {
      console.log("send sms ==>", suc);
    })
    .catch((err) => {
      console.log("error sms ===>", err);
    });
};
//============================smsapi===================//


module.exports.send_mail = async (email, otp) => {
  // Create the SMTP transport.
  let transporter = nodemailer.createTransport({
    host: smtpEndpoint,
    port: port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtpUsername,
      pass: smtpPassword
    }
  });
  var subject = "GIGZZY OTP ✔";
  var text = "OTP?";
  var body_html = `<b>GIGZZY OTP : ${otp} </b>`;

  let mailOptions = {
    from: senderAddress,
    to: email,
    subject: subject,
    text: text,
    html: body_html,
  };
  // Send the email.
  let info = await transporter.sendMail(mailOptions)
  console.log("Message sent! Message ID: ", info.messageId);
}


module.exports.send_mails = async (email, msg) => {

  let mailOptions = {
    from: senderAddress,
    to: email, // list of receivers
    subject: "GIGZZY ✔", // Subject line
    text: "Admin change proof status?", // plain text body
    html: `<b> ${msg} </b>`, // html body
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error, "send email error");
      return false;
    } else {
      console.log(info, "send email success");
      return true;
    }
  });
};


module.exports.send_mail_1 = async (email, msg) => {
  try{
    console.log("send grid")
    const mail_msg = {
      to: "vishnu@waioz.com",
      from:"support@gigzzy.com",
      subject: "GIGZZY ✔", // Subject line
      text: "Admin change proof status?", // plain text body
      html: `<b> ${msg} </b>`, // html body
    };
    let data = await sgMail.send(mail_msg);
    // console.log(data,"ops")
    return true
  }catch(error){
    // console.log("error", error)
    return false
  }
}

/*
  Tab No for Push Notification
*/
