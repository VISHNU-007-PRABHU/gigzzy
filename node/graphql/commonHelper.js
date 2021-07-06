const fs = require("fs");
const util = require("util");
var FCM = require("fcm-node");
var nodemailer = require("nodemailer");
var sesTransport = require("nodemailer-ses-transport");
const dotenv = require('dotenv');
dotenv.config();
var serverKey =
  "AAAAuHbsbq4:APA91bFf9VkaLpuWm0vfMTfDIofpl8Lz4ySnkJfW8w0tvZss0CR5ozVQ97As7hVVL4k0nN-rANxTvRLBxRH3XuEXkHICQi8FKcV6fuqJpqcRsI0YF4XuFODcojoqKZaJ-uz9H_to-9U2";
var fcm = new FCM(serverKey);
const env = process.env;

module.exports.home = 0;
module.exports.pending = 1;
module.exports.on_going = 2;
module.exports.completed = 3;
module.exports.chat = 4;
module.exports.booking_view = 5;

module.exports.no_image = () => {
  return env.APP_URL + "/images/public/no_img.jpg";
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
  if(env.MPESA){
    return env.MPESA_PRODUCTION;
  }else{
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
const credentials = {
  apiKey: "ae2349e17fddbb993e1316693d2bf577a201391481b3baa36df8830579737906",
  username: "sandbox",
};
const africa = require("africastalking")(credentials);
const sms = africa.SMS;
module.exports.send_sms = async () => {
  const options = {
    to: ['+918526475450', '+917639381739'],
    message: " I work all night and sleep all day",
    from:"sample"
}
  sms
    .send(options)
    .then((suc) => {
      console.log("suc==>",suc);
    })
    .catch((e) => {
      console.log(e);
    });
};
//============================smsapi===================//
//============================mailapi==================//



const smtpEndpoint = process.env.smtpEndpoint;
const port = process.env.AWS_PORT;
const senderAddress = process.env.senderAddress;
var toAddresses = "vijayaraj@waioz.com";
const smtpUsername = process.env.smtpUsername;
const smtpPassword = process.env.smtpPassword;
// var subject = "Amazon SES test (Nodemailer)";
var body_text = `Amazon SES Test (Nodemailer)
---------------------------------
This email was sent through the Amazon SES SMTP interface using Nodemailer.
`;
var body_html = `<html>
<head></head>
<body>
  <h1>Amazon SES Test (Nodemailer)</h1>
  <p>This email was sent with <a href='https://aws.amazon.com/ses/'>Amazon SES</a>
        using <a href='https://nodemailer.com'>Nodemailer</a> for Node.js.</p>
</body>
</html>`;

module.exports.sendmail=async(data,email)=>{
  console.log(email)
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

  // Specify the fields in the email.
  let mailOptions = {
    from: senderAddress,
    to: email,
    subject: data.subject,
    text: body_text,
    html: body_html,
  };

  // Send the email.
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent! Message ID: ", info.messageId);
}

//==================================================================//

module.exports.send_mail = async (email, otp) => {
  // console.log('vis',email,otp);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: "emepedia2020@gmail.com",
      pass: "@Vinya2017",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: "info@gigzzy.com",
    to: email, // list of receivers
    subject: "GIGZZY OTP ✔", // Subject line
    text: "OTP?", // plain text body
    html: `<b>GIGZZY OTP : ${otp} </b>`, // html body
    // subject:strtr(admin_email.subject, req.data), // Subject line
    // html: mail_content // html body
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    console.log(error, info, mailOptions);
    if (error) {
      console.error(error);
      return false;
    } else {
      console.error(info);
      return true;
    }
  });
};
module.exports.send_mail_1 = async (email, msg) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 25,
    service: "gmail",
    auth: {
      user: "emepedia2020@gmail.com",
      pass: "@Vinya2017",
    },
  });
  let mailOptions = {
    from: "waioztechnology@gmail.com",
    to: email, // list of receivers
    subject: "GIGZZY ✔", // Subject line
    text: "Admin change proof status?", // plain text body
    html: `<b> ${msg} </b>`, // html body
    // subject:strtr(admin_email.subject, req.data), // Subject line
    // html: mail_content // html body
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      //console.error(error);
      return false;
    } else {
      // console.error(info);
      return true;
    }
  });
};

/*
  Tab No for Push Notification
*/
