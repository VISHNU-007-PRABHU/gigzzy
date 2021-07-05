const dotenv = require('dotenv');
dotenv.config();
let unirest = require('unirest');
/**
 * 
 * @param {*} data 
 * @returns {
            "access_token": "eD7AmyrjafN8myJBVaaNKaSI2dq9",
            "expires_in": "3599"
        }
 */

module.exports.safaricom_payment_authorization = async (data) => {
    try {
        console.log("ops")
        let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

        let headers = { 'Authorization': 'Basic YkVJclpKS0toSUNyclpyQTJJRDJOaUpUd3cxYWVPb2k6eEs0UkFmcXM5UHpDVEZmNQ' };
        let req = unirest('GET', url)
            .headers(headers)
            .send()
            .end(async res => {
                // console.log(res.raw_body);
                return { status: true, msg: "safaricom payment authorization success" }
            });
    } catch (error) {
        console.log("module.exports.safaricom_payment_authorization -> error", error)
        return { status: false, msg: "error in safaricom payment authorization" }
    }
}

/**
 * 
 * @param {*} data 
 * @returns {
            "OriginatorCoversationID": "33896-14867689-1",
            "ResponseCode": "0",
            "ResponseDescription": "success"
        }
 */
module.exports.safaricom_ctob_register = async (data) => {
    try {
        let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"

        let req = unirest('POST', url)
            .headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 7vlhEMUahXwCM6a3m1TTXLwprJee'
            })
            .send(JSON.stringify({
                "ShortCode": 600997,
                "ResponseType": "Completed",
                "ConfirmationURL": "https://1ca7f53434ad.ngrok.io/confirmation",
                "ValidationURL": "https://1ca7f53434ad.ngrok.io/validation",
            }))
            .end(res => {
                console.log(res.raw_body);
                return { status: true, msg: "safaricom ctob register success" }
            });
    } catch (error) {
        console.log("module.exports.safaricom_payment_authorization -> error", error)
        return { status: false, msg: "error in safaricom ctob register url" }
    }
}

/**
 * 
 * @param {*} data 
 * @returns {
            "OriginatorCoversationID": "33907-14863228-1",
            "ResponseCode": "0",
            "ResponseDescription": "Accept the service request successfully."
        }
 */
module.exports.safaricom_ctob_simulate = async (data) => {
    try {
        let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
        let req = unirest('POST', url)
            .headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 7vlhEMUahXwCM6a3m1TTXLwprJee',
                // 'Authorization': 'Basic cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ=='
                // 'Authorization': 'Bearer YkVJclpKS0toSUNyclpyQTJJRDJOaUpUd3cxYWVPb2k6eEs0UkFmcXM5UHpDVEZmNQ==' 
                // 'Authorization': 'Basic YkVJclpKS0toSUNyclpyQTJJRDJOaUpUd3cxYWVPb2k6eEs0UkFmcXM5UHpDVEZmNQ'
            })
            .send(JSON.stringify({
                "CommandID": "CustomerPayBillOnline",
                "Amount": "10",
                "Msisdn": "254724628580",
                "BillRefNumber": "h6dk0Ue2",
                "ShortCode": 600981
            }))
            .end(res => {
                console.log(res.raw_body, 'simulate');
                return { status: true, msg: "safaricom ctob register success" }
            });
    } catch (error) {
        console.log("module.exports.safaricom_payment_authorization -> error", error)
        return { status: false, msg: "error in safaricom ctob register url" }
    }
}

module.exports.safaricom_lipesa_simulate = async (data) => {
    try {
        /*
This code uses callbacks to handle asynchronous function responses.
It currently demonstrates using an async-await pattern.
AWS supports both the async-await and promises patterns.
For more information, see the following:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/calling-services-asynchronously.html
https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
*/

        "use strict";
        const nodemailer = require("nodemailer");

        // If you're using Amazon SES in a region other than US West (Oregon),
        // replace email-smtp.us-west-2.amazonaws.com with the Amazon SES SMTP
        // endpoint in the appropriate AWS Region.
        const smtpEndpoint = "email-smtp.us-east-2.amazonaws.com";

        // The port to use when connecting to the SMTP server.
        const port = 587;

        // Replace sender@example.com with your "From" address.
        // This address must be verified with Amazon SES.
        const senderAddress = "Mary Major <vijayaraj@waioz.com>";

        // Replace recipient@example.com with a "To" address. If your account
        // is still in the sandbox, this address must be verified. To specify
        // multiple addresses, separate each address with a comma.
        var toAddresses = "vishnu@waioz.com";

        // CC and BCC addresses. If your account is in the sandbox, these
        // addresses have to be verified. To specify multiple addresses, separate
        // each address with a comma.
        var ccAddresses = "cc-recipient0@example.com,cc-recipient1@example.com";
        var bccAddresses = "bcc-recipient@example.com";

        // Replace smtp_username with your Amazon SES SMTP user name.
        const smtpUsername = "AKIA3FIPGWKBWRXCMHPQ";

        // Replace smtp_password with your Amazon SES SMTP password.
        const smtpPassword = "BFOsoC8dh/K6MTPTPbbvsRFVoutGri8VJkd7j9M6Uo6d";

        // (Optional) the name of a configuration set to use for this message.
        var configurationSet = "ConfigSet";

        // The subject line of the email
        var subject = "Amazon SES test (Nodemailer)";

        // The email body for recipients with non-HTML email clients.
        var body_text = `Amazon SES Test (Nodemailer)
---------------------------------
This email was sent through the Amazon SES SMTP interface using Nodemailer.
`;

        // The body of the email for recipients whose email clients support HTML content.
        var body_html = `<html>
        <head></head>
        <body>
        <h1>Gigzzy email testing from waioz</h1>
        <p>Thanks</p>
        </body>
        </html>`;

        // The message tags that you want to apply to the email.
        var tag0 = "key0=value0";
        var tag1 = "key1=value1";

        async function main() {

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
                to: toAddresses,
                subject: subject,
                text: body_text,
                html: body_html,
                // Custom headers for configuration set and message tags.
                headers: {
                    'X-SES-MESSAGE-TAGS': tag0,
                    'X-SES-MESSAGE-TAGS': tag1
                }
            };

            // Send the email.
            let info = await transporter.sendMail(mailOptions)

            console.log("Message sent! Message ID: ", info.messageId);
        }

        main().catch(console.error);


        // let url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        // let request_data = {
        //     "BusinessShortCode": "174379",
        //     "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjEwNjMwMTE0ODUw",
        //     "Timestamp": "20160216165627",
        //     "TransactionType": "CustomerPayBillOnline",
        //     "Amount": "1",
        //     "PartyA": "254721236262",
        //     "PartyB": "174379",
        //     "PhoneNumber": "254708374149",
        //     "CallBackURL": `${process.env.APP_URL}/confimation`,
        //     "AccountReference": "Test",
        //     "TransactionDesc": "Test"
        // }
        // let req = unirest('POST', url)
        //     .headers({
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer 7vlhEMUahXwCM6a3m1TTXLwprJee'
        //     })
        //     .send(JSON.stringify(request_data))
        //     .end(res => {
        //         console.log(res.raw_body);
        //         return { status: true, msg: "safaricom lipesa success" }
        //     });
    } catch (error) {
        console.log("module.exports.safaricom_payment_authorization -> error", error)
        return { status: false, msg: "error in safaricom lipesa simulate url" }
    }
}

module.exports.safaricom_transaction_status = async (data) => {
    try {
        let url = "https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query"
        let req = unirest('POST', url)
            .headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer DuvB1Gd3o8Rgy0qHeBNcQmztBwiC'
            })
            .send(JSON.stringify({
                'initiator': 'testapi',
                "SecurityCredential": "GpnjE42B5nb1XhNtrT/ooagA5y+mHduQ28+cXGg4QHo4QFdVrLDlS4K6DHYGOIMp77jpWn5QdB4FSEwwZiX6edMhQ/CphkGqOzRdAQhjeQFGZ9hH3gD0AD8v4XEnPhBpd14MWoyfIzlXhmwvz9NFJf4F2l+ohsjAjXDfI32+4zXEPvSxX7Hr7Pq2e7KguAxTrQQHpVOXhISja4doDFF4Omi64cJsNKmcCTR2aPAMG26c0mkYVF4UsFcoeQMp5pkC9UtW4aLMWXH4fLSmNXPbPd2zXuwnJlemyenblF1WK4xzb2mjWD3vL/Fy547wkCdWmwYevXGXCw6AwcJkaSxdig==",
                "CommandID": "TransactionStatusQuery",
                "TransactionID": "OEI2AK4Q16",
                "PartyA": 600977,
                "IdentifierType": 4,
                "ResultURL": "https://1ca7f53434ad.ngrok.io/confirmation",
                "QueueTimeOutURL": "https://1ca7f53434ad.ngrok.io/confirmation",
                "Remarks": "asd",
                "Occassion": "null",
            }))
            .end(res => {
                console.log(res.raw_body, 'transcation');
                return { status: true, msg: "safaricom ctob register success" }
            });
    } catch (error) {
        console.log("module.exports.safaricom_payment_authorization -> error", error)
        return { status: false, msg: "error in safaricom ctob register url" }
    }
}


// {
//     "MerchantRequestID": "81482-32509263-1",
//     "CheckoutRequestID": "ws_CO_020720210748582028",
//     "ResponseCode": "0",
//     "ResponseDescription": "Success. Request accepted for processing",
//     "CustomerMessage": "Success. Request accepted for processing"
//   }

// we are check all apis , we got this success response.
// but callback (*ngrok ) url is not worked
// Does callback work in sandbox account?

// {
//     "OriginatorCoversationID": "6062-30676741-1",
//     "ResponseCode": "0",
//     "ResponseDescription": "Accept the service request successfully."
// }

// {
//     "OriginatorConversationID": "101429-31519915-1",
//     "ConversationID": "AG_20210701_00004b24d0f305252bda",
//     "ResponseCode": "0",
//     "ResponseDescription": "Accept the service request successfully."
//   }

// {
//     "ResponseCode": "0",
//     "ResponseDescription": "The service request has been accepted successsfully",
//     "MerchantRequestID": "7458-31672407-1",
//     "CheckoutRequestID": "ws_CO_020720210907487697",
//     "ResultCode": "1",
//     "ResultDesc": "The balance is insufficient for the transaction"
//   }