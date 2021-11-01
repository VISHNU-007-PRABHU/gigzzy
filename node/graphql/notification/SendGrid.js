
const dotenv = require('dotenv');
const _ = require('lodash')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
dotenv.config();
const senderAddress = process.env.senderAddress;

exports.static_mail_template = (type, data) => {
    let { otp, msg, link } = data
    switch (type) {
        case "otp":
            return {
                subject: "GIGZZY OTP ✔",
                text: "OTP?",
                html: `<b>GIGZZY OTP : ${otp} </b>`
            }
        case "mail_register":
            return {
                subject: "GIGZZY Email Verification ✔",
                text: "Email verification otp?",
                html: `<b>GIGZZY EMAIL OTP : ${otp} </b>`
            }
        case "admin_approved":
            return {
                subject: "GIGZZY Profile verification ✔",
                text: "Please wait, admin will verified you profile?",
                html: `<b>${msg}</b>`
            }
        case "book_later":
            return {
                subject: "GIGZZY ✔",
                text: "Your job is booked successfully",
                html: `<b>Thanks for booking job, If any query please contact to our support team</b>`
            }
        case "schedule_job":
            return {
                subject: "GIGZZY ✔",
                text: "Your job is almost ready",
                html: `<b>${msg}</b>`
            }
        case "job_finished":
            return {
                subject: "GIGZZY ✔",
                text: "Job finished?",
                html: `<b>Your job is succesfully completed</b>`
            }
        case "reset_pwd":
            return {
                subject: "GIGZZY ✔",
                text: "Your reset password link",
                html: `<b>${link}</b>`
            }
        case "new_company_register":
            return {
                template: "New company register invitation",
                subject: "GIGZZY PRO✔",
                text: "Please accept your company request through  below the link",
                html: `<b>${link}</b>`
            }
        default:
            return {
                subject: "GIGZZY ✔",
                text: "Thanks for using gizzy",
                html: `<b>Thank's for using gizzy </b>`
            }
    }

}

module.exports.send_mail_sendgrid = async (email, type, datas) => {
    try {

        let email_temp = await this.static_mail_template(type, datas)

        var mail_content = "";
        mail_content += `
        <div style="background-color:rgb(237,239,244);padding-top:15px;padding-bottom:15px;width:100%;font-family:verdana, helvetica;">
        <div style="max-width:600px;margin:0 auto;background: #fff;border-radius: 5px;">
        <div style="width: 100%;background: #2a2b74;height: 5px;border-top-left-radius: 5px;border-top-right-radius: 5px;">
        </div>
        <div style="text-align:center;width: 100%;">
        <img style="height:50px;padding:20px" src="${process.env.APP_URL}/static/media/Gigzzy.b988be48.png" alt="Gigzzy" />
        </div><div style="padding:10px">`;
        mail_content += email_temp.html;
        mail_content += '</div><div style="width: 100%;background: #34a108;height: 5px;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;"></div></div></div>';

        const mail_msg = {
            to: email,
            from: senderAddress,
            html: mail_content,
            subject: email_temp.subject,
            text: email_temp.text
        };
        await sgMail.send(mail_msg);
        console.log("module.exports.send_mail_sendgrid -> mailResponse")
        return true
    } catch (error) {
        console.log("module.exports.send_mail_sendgrid -> error", error.response.body)
        return false
    }
}
