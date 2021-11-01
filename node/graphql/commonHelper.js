const fs = require("fs");
const util = require("util");
var FCM = require("fcm-node");
var nodemailer = require("nodemailer");
var sesTransport = require("nodemailer-ses-transport");
const dotenv = require('dotenv');
const _ = require('lodash')
const model = require('../model_data');
const Booking_model = require('../model/booking/booking')
dotenv.config();
const smtpEndpoint = process.env.smtpEndpoint;
const port = process.env.AWS_PORT;
const senderAddress = process.env.senderAddress;
const smtpUsername = process.env.smtpUsername;
const smtpPassword = process.env.smtpPassword;
const SMS_SENDERID = process.env.AFRICASTALKING_SENDERID;
var serverKey = process.env.PUSHNOTIFICATION_KEY;
var fcm = new FCM(serverKey);
const env = process.env;
const africa = require("africastalking")({
  apiKey: process.env.AFRICASTALKING_API_KEY,
  username: process.env.AFRICASTALKING_API_USERNAME,
});
const sms = africa.SMS;



const transporter = nodemailer.createTransport({
  host: smtpEndpoint,
  port: port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtpUsername,
    pass: smtpPassword
  }
});


exports.booking_status = {
  PROVIDER_ROLE: 2,
  PROVIDER_ROLE: 2,
  WAITING_ADMIN: 15,
  WAITING_PAYMENT: 50,
  ACCEPT: 9,
  BOOKING: 12,
  PENDING: 10,
  START: 4,
  ONGOING: 4,
  CANCEL: 8,
  END: 13,
  COMPLETE: 14,
}

module.exports.contract_close_day =7;
module.exports.home = 0;
module.exports.pending = 1;
module.exports.on_going = 2;
module.exports.completed = 3;
module.exports.chat = 4;
module.exports.booking_view = 5;

module.exports.no_image = (file = "normal") => {
  if (file === "pdf") {
    return env.APP_URL + "/images/public/pdf.jpeg";
  } else {
    return env.APP_URL + "/images/public/no_img.png";
  }
};


exports.url_path = (path, file) => {
  if (file) {
    return `${this.getBaseurl()}/images/${path}/${file}`;
  } else {
    return this.no_image();
  }
}

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
      console.log("module.exports.push_notifiy -> err", err)
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
};

/**
 * 
 * @param {*} type 
 * @param {*} data 
 * @returns string of message
 */

exports.static_sms_template = (type, data) => {
  let { otp, msg, link } = data
  switch (type) {
    case "otp":
      return `GIGZZY OTP : ${otp}`
    case "job_placed":
      return `Your gigzzy job is placed successfully`
    case "pay_extra_fare":
      return `Provider end job, and add some extra fare`
    case "job_finished":
      return `Your gigzzy job is completed successfully`
    case "admin_apporved":
      return `Congratulations and you have been approved as Gigzzy Pro`
    case "job_assign":
      return `You have a new job from Gigzzy`
    case "scheduled_job":
      return `Your gigzzy job has almost ready to start`
    default:
      return `Thank's for using gizzy`
  }
}

/**
 * 
 * @param {*} phone_no 
 * @param {*} type 
 */

module.exports.send_sms = async (country_code, phone_no, type, data) => {
  try {
    let message = await this.static_sms_template(type, data)
    let phone_number = `${country_code}${phone_no}`

    if (process.env.SMS_GATEWAY && process.env.SMS_GATEWAY === "africastalking") {
      let options = {
        to: `+${phone_number}`,
        message: message,
        from: SMS_SENDERID
      }
      sms.send(options)
        .then((suc) => {
          console.log("send sms ==>", suc['SMSMessageData']['Recipients']);
        })
        .catch((err) => {
          console.log("error sms ===>", err);
        });
      return true
    } else if (process.env.SMS_GATEWAY && process.env.SMS_GATEWAY === "twillo") {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require('twilio')(accountSid, authToken);
      let options = {
        to: `+${phone_number}`,
        body: message,
        from: process.env.TWILIO_ACCOUNT_FROM_NO
      }
      let smsResult = await client.messages.create(options)
      // console.log("module.exports.send_sms -> smsResult", smsResult)
      // .then(message => console.log(message.sid, "twillo"));
    }
  } catch (error) {
    return false
  }
};



module.exports.genrate_random = async () => {
  try {
    var random = Math.floor(Math.random() * 90000) + 10000;
    var chars = "abcdefghijklmnopqrstufwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
    var random = _.join(_.sampleSize(chars, 20), "")
    var digit = `${random}`
    var check_p_id = await Booking_model.find({ "ctob_billRef": digit });
    if (check_p_id.length) {
      await this.genrate_random()
    }
    return digit;
  } catch (err) {
    console.log("exports.genrate_random -> err", err)
    return "";
  }
}

