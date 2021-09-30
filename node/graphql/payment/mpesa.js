
const model = require('../../model_data');
const _ = require('lodash');
const moment = require("moment");
const dotenv = require('dotenv');
dotenv.config();

var Detail_model = model.detail;
var Booking_model = model.booking;
var subCategory_model = model.sub_category;
var Category_model = model.category;
var message_model = model.message;
var Payout_model = model.payout;
var Extra_fee_model = model.Extra_fee;
var providerSubcategory_model = model.providerSubcategory_model;

exports.mpesa_payment = async (args, booking_detail) => {
    return new Promise(async function (resolve, reject) {
        try {
            if (!args.amount) {
                return reject({ msg: "Payment charge failed", status: false })
            }
            let amount = args.amount
            if (args['payment_type'] && args['payment_type'] === "c2b") {
                let booking_data = {
                    accept_date: moment.utc().format(),
                    admin_fee: String(parseFloat(args.admin_fee).toFixed(2)),
                    provider_fee: String(parseFloat(args.provider_fee).toFixed(2)),
                    total: String(parseFloat(args.total).toFixed(2)),
                    booking_status: 50, // 50 means waiting booking
                    phone_number: args.phone_number || "",
                    payment_type: "c2b",
                    payment_history:charge
                }
                let update_booking_data = { status: true, msg: "mpesa c2b payment waiting for user", data: booking_data }
                return resolve(update_booking_data)
            } else {
                var charge = await safaricom.safaricom_lipesa_simulate(args.phone_number, String(amount), booking_detail.booking_ref)
                if (charge.status == true && charge.data.ResponseCode === '0') {
                    let booking_data = {
                        accept_date: moment.utc().format(),
                        admin_fee: String(parseFloat(args.admin_fee).toFixed(2)),
                        provider_fee: String(parseFloat(args.provider_fee).toFixed(2)),
                        total: String(parseFloat(args.total).toFixed(2)),
                        booking_status: 50, // 50 means waiting booking
                        phone_number: args.phone_number,
                        payment_type: "lipesa",
                        // job_status: 10,
                        // payment_status: 1,
                        MerchantRequestID: charge.data.MerchantRequestID || 0,
                        CheckoutRequestID: charge.data.CheckoutRequestID || 0,
                        payment_history:charge
                    }
                    let update_booking_data = { status: true, msg: "mpesa safaricom lipesa simulate payment success", data: booking_data }
                    return resolve(update_booking_data)
                } else {
                    return reject({ msg: "Payment charge failed", status: false })
                }
            }

        } catch (err) {
            // console.log("err", err)
            return reject({ msg: "Mpesa Payment failed", status: false })
        }
    })
}







