const dotenv = require('dotenv');
dotenv.config();
let unirest = require('unirest');
const commonHelper = require('./commonHelper')
const moment = require('moment')

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
                console.log(res.raw_body);
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
        let PhoneNumber ="254708374149"
        let url = `https://${commonHelper.mpesaURL}/mpesa/stkpush/v1/processrequest`
        let timeStamp =  moment().format('YYYYMMDDHHmmss')
        let passKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
        let encodeString =`${process.env.MPESA_SHORT_CODE}${passKey}${timeStamp}`
        let password = Buffer.from(encodeString).toString('base64')
        let request_data = {
            "BusinessShortCode": process.env.MPESA_SHORT_CODE,
            "Password": password,
            "Timestamp":timeStamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": "1",
            "PartyA": PhoneNumber,
            "PartyB": process.env.MPESA_PARTYB,
            "PhoneNumber": PhoneNumber,
            "CallBackURL": `${process.env.APP_URL}/confimation`,
            "AccountReference": "CompanyXLTD",
            "TransactionDesc": "Payment of X"
        }
        console.log("module.exports.safaricom_lipesa_simulate -> request_data", request_data)
        let req = unirest('POST', url)
            .headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer    '
            })
            .send(JSON.stringify(request_data))
            .end(res => {
                console.log(res.raw_body);
                return { status: true, msg: "safaricom lipesa success" }
            });
    } catch (error) {
        console.log("module.exports.safaricom_payment_authorization -> error", error)
        return { status: false, msg: "Invalid Mpesa express request" }
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