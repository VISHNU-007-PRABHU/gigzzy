const model = require('../../model_data');
const _ = require('lodash');
const moment = require("moment");
const dotenv = require('dotenv');
const payoutNotificationModule = require('./payout_notification');
const { booking } = require('../../model_data');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
dotenv.config();

var Detail_model = model.detail;
var Booking_model = model.booking;
var subCategory_model = model.sub_category;
var Category_model = model.category;
var message_model = model.message;
var Payout_model = model.payout;
var Extra_fee_model = model.Extra_fee;
var providerSubcategory_model = model.providerSubcategory_model;

exports.stripe_payment = async (args,booking_detail) => {
    return new Promise(async function (resolve, reject) {
        try {
            let amount = args.amount;
            let payment_country_code = "INR"
            const token = await stripe.tokens.create({
                card: {
                    number: '4242424242424242',
                    exp_month: 9,
                    exp_year: 2022,
                    cvc: '314',
                },
            });
            let change_data = {
                "amount": Number(amount) * 100,
                "currency": payment_country_code,
                "source": args.stripe_token || token.id
            }
            var charge = await stripe.charges.create(change_data);
            if (charge.status == "succeeded" && charge.paid == true) {
                let booking_data = {
                    accept_date: moment.utc().format(),
                    admin_fee: String(parseFloat(args.admin_fee).toFixed(2)),
                    provider_fee: String(parseFloat(args.provider_fee).toFixed(2)),
                    total: String(parseFloat(args.total).toFixed(2)),
                    booking_status: 10, 
                    phone_number: args.phone_number,
                    payment_type: "stripe",
                    job_status: 10,
                    payment_status: 1,
                    payment_history:charge
                }
                let update_provider_payout = await payoutNotificationModule.update_provider_payout(booking_detail,booking_data)
                let update_payout_notification = await payoutNotificationModule.payout_notification(args,booking_detail,booking_data)
                console.log("exports.stripe_payment -> update_payout_notification", update_payout_notification)
                resolve({ msg: "payment success", status: true,data:booking_data })
            } else {
                reject({ msg: "payment failed", status: false,data:{} })
            }
        } catch (error) {
            console.log("exports.stripe_payment -> error", error)
            reject({ msg: "Stripe error", status: false })
        }
    })
}

exports.stripe_refund_payment = async (args) => {
    return new Promise(async function (resolve, reject) {
        try {
            let refund_data = args
            var charge = await stripe.refunds.create(refund_data)
            console.log("exports.stripe_payment -> charge", charge)
            if (charge.status == "succeeded" && charge.refunded == true) {
                resolve({ msg: "", status: true })
            } else {
                reject({ msg: "", status: false })
            }
        } catch (error) {
            reject({ msg: "", status: false })
        }
    })
}


