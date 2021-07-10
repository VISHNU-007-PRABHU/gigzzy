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

var safaricom_payment_authorization =async function (data){
    return new Promise(async function (resolve, reject) {
        try {
            let url = `https://${commonHelper.mpesaURL()}/oauth/v1/generate?grant_type=client_credentials`;
            let password = Buffer.from(`${process.env.MPESA_CONSUMERKEY}:${process.env.MPESA_CONSUMERSECRET}`).toString('base64')
            let headers = { 'Authorization': `Basic ${password}` };
            let req = await unirest('GET', url)
                .headers(headers)
                .send()
                .end(async res => {
                    if (res.error) {
                        console.log("mpesa res.error", res.error)
                        return reject({ status: false, msg: "error in safaricom payment authorization" })
                    }
                    return resolve({ status: true, msg: "success in safaricom payment authorization", data: JSON.parse(res.raw_body) })
                });
        } catch (error) {
            console.log("mpesa authu error", error)
            return reject({ status: false, msg: "error in safaricom payment authorization" })
        }
    })
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
        let url = `https://${commonHelper.mpesaURL()}/mpesa/c2b/v1/registerurl`

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
            .end((error, raw_body) => {
                console.log(error, raw_body);
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

module.exports.safaricom_lipesa_simulate = async (PhoneNumber,amount) => {
    return new Promise(async function (resolve, reject) {
        try {
            if(!PhoneNumber || !amount){
                return reject({ status: false, msg: "Invailed params" })
            }
            let url = `https://${commonHelper.mpesaURL()}/mpesa/stkpush/v1/processrequest`
            let timeStamp = moment().format('YYYYMMDDHHmmss')
            let passKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
            let encodeString = `${process.env.MPESA_SHORT_CODE}${passKey}${timeStamp}`
            let token = await safaricom_payment_authorization()
            if (token && !token.status) {
                return reject({ status: false, msg: "safaricom Mpesa express failed" })
            }
            let password = Buffer.from(encodeString).toString('base64')
            let request_data = {
                "BusinessShortCode": process.env.MPESA_SHORT_CODE,
                "Password": password,
                "Timestamp": timeStamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": PhoneNumber,
                "PartyB": process.env.MPESA_PARTYB,
                "PhoneNumber": PhoneNumber,
                "CallBackURL": `${process.env.MPESA_CALLBACK_URL}/confimation`,
                "AccountReference": "CompanyXLTD",
                "TransactionDesc": "Payment of X"
            }
            let req = unirest('POST', url)
                .headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.data.access_token}`
                })
                .send(JSON.stringify(request_data))
                .end((res) => {
                    if (res.error) {
                        console.log("module.exports.safaricom_lipesa_simulate -> res.error", res.error)
                        return reject({ status: false, msg: "safaricom Mpesa express failed" })
                    }
                    return resolve({ status: true, msg: "safaricom lipesa success", data: JSON.parse(res.raw_body) })
                });
        } catch (error) {
            console.log("module.exports.safaricom_lipesa_simulate -> error", error)
            return reject({ status: false, msg: "Invalid Mpesa express request" })
        }
    })
}
