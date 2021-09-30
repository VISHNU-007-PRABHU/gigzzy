const model = require('../../model_data');
const _ = require('lodash');
const moment = require("moment");
const stripeModule = require('./stripe');
const mpesaModule = require('./mpesa');

exports.choose_payment = async (args,booking_detail) => {
    return new Promise(async function (resolve, reject) {
        try {
            console.log("exports.choose_payment -> args", args)
            switch (args.payment_option) {
                case 'stripe':
                    let stripe_data = await stripeModule.stripe_payment(args,booking_detail)
                    resolve(stripe_data)
                    break
                case 'mpesa':
                    let mpesa_data = await mpesaModule.mpesa_payment(args,booking_detail)
                    resolve(mpesa_data)
                    break
                default:
                    break
            }
        } catch (error) {
            console.log("exports.choose_payment -> error", error)
            reject({ msg: "", status: false })
        }
    })
}

