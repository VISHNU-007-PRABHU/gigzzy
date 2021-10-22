
const model = require('../../model_data');
const _ = require('lodash');
const safaricom = require('../safaricom');
const dotenv = require('dotenv');
dotenv.config();

exports.mpesa_payment = async (args, booking_detail) => {
    return new Promise(async function (resolve, reject) {
        try {
            if (!args.amount) {
                return reject({ msg: "Payment charge failed", status: false })
            }
            let amount = args.amount
            if (args['payment_type'] && args['payment_type'] === "c2b") {
                return resolve({ msg: "Payment success", status: true, charge: {status:true} })
            } else {
                var charge = await safaricom.safaricom_lipesa_simulate(args.phone_number, String(amount), booking_detail.milestone_ref)
                console.log("exports.mpesa_payment -> charge", charge)
                if (charge.status == true && charge.data.ResponseCode === '0') {
                    return resolve({ msg: "Payment success", status: true, charge })
                } else {
                    return reject({ msg: "Payment charge failed", status: false })
                }
            }
        } catch (err) {
            console.log("err mpesa", err)
            return reject({ msg: "Mpesa Payment failed", status: false })
        }
    })
}






