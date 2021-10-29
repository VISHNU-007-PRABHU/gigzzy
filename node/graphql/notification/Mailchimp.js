
const dotenv = require('dotenv');
const _ = require('lodash')
dotenv.config();
const senderAddress = process.env.senderAddress;
const commonHelper = require('../commonHelper')
const mailchimpClient = require("@mailchimp/mailchimp_transactional")("mUgRaOf0BFEZ5SpgdEVgvQ");

module.exports.sendMailchimpTemplate = async (email, type, datas) => {
    try {

        let email_temp = await commonHelper.static_mail_template(type, datas)
        var mail_content = "";
        mail_content += '<div style="background-color:rgb(237,239,244);padding-top:15px;padding-bottom:15px;width:100%;font-family:verdana, helvetica;"><div style="max-width:600px;margin:0 auto;background: #fff;border-radius: 5px;"><div style="width: 100%;background: #2a2b74;height: 5px;border-top-left-radius: 5px;border-top-right-radius: 5px;"></div><div style="text-align:center;width: 100%;"><img style="height:50px;padding:20px" src="' + process.env.APP_URL + '/static/media/logo.04ba26f8.png" alt="TransportCare" /></div><div style="padding:10px">';
        mail_content += email_temp.html;
        mail_content += '</div><div style="width: 100%;background: #f7a706;height: 5px;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;"></div></div></div>';

        const message = {
            to: [{ email }],
            from: senderAddress,
            html: mail_content,
            subject: email_temp.subject,
            text: email_temp.text
        };
        const response = await mailchimpClient.messages.sendTemplate({
            template_name: email_temp.template || "static template name",
            template_content: [{}],
            message: message,
        });
        console.log(response);
        return response
    } catch (error) {
        console.log("module.exports.sendMailchimpTemplate -> error", error)
        return { status: false, msg: "fail to send email" }
    }
};


module.exports.sendMailchimpMessage = async (email, type, datas) => {
    try {
        let email_temp = await commonHelper.static_mail_template(type, datas)
        var mail_content = "";
        mail_content += '<div style="background-color:rgb(237,239,244);padding-top:15px;padding-bottom:15px;width:100%;font-family:verdana, helvetica;"><div style="max-width:600px;margin:0 auto;background: #fff;border-radius: 5px;"><div style="width: 100%;background: #2a2b74;height: 5px;border-top-left-radius: 5px;border-top-right-radius: 5px;"></div><div style="text-align:center;width: 100%;"><img style="height:50px;padding:20px" src="' + process.env.APP_URL + '/static/media/logo.04ba26f8.png" alt="TransportCare" /></div><div style="padding:10px">';
        mail_content += email_temp.html;
        mail_content += '</div><div style="width: 100%;background: #f7a706;height: 5px;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;"></div></div></div>';

        const message1 = {
            to: [{ email, type: "to" }],
            from: "info@gigzzy.com",
            html: mail_content,
            subject: email_temp.subject,
            text: email_temp.text
        };

       
        const response = await mailchimpClient.messages.send({ message });
        console.log(response);
    } catch (error) {
        console.log("module.exports.sendMailchimpTemplate -> error", error)
        return { status: false, msg: "fail to send email" }
    }
};