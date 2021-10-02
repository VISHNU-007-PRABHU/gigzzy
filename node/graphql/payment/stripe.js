const model = require('../../model_data');
const _ = require('lodash');
const moment = require("moment");
const dotenv = require('dotenv');
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

const stripe_country_code =[{
    code:"IN",
    stripe_code:"INR"
},{
    code:"US",
    stripe_code:"usd"
}]

exports.stripe_payment = async (args, booking_detail) => {
    return new Promise(async function (resolve, reject) {
        try {
            let amount = args.amount;
            let payment_country_code = _.find(stripe_country_code,["code",_.upperCase(args.location_code)])['stripe_code'] 
            let change_data = {
                "amount": Number(amount) * 100,
                "currency": payment_country_code || 'usd',
                "source": args.stripe_token
            }
            console.log("exports.stripe_payment -> change_data", change_data)
            var charge = await stripe.charges.create(change_data);
            return resolve({ msg: "Payment success", status: true,charge })
        } catch (error) {
            console.log("exports.stripe_payment -> error", error)
            return reject({ msg: "Stripe error", status: false })
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


