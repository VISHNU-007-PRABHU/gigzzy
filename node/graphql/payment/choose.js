const model = require('../../model_data');
const _ = require('lodash');
const moment = require("moment");
const stripeModule = require('./stripe');
const mpesaModule = require('./mpesa');
const payoutNotificationModule = require('./payout_notification')

exports.choose_payment = async (args, booking_detail) => {
    return new Promise(async function (resolve, reject) {
        try {
            switch (args.payment_option) {
                case 'stripe':
                    let { msg, status, charge } = await stripeModule.stripe_payment(args, booking_detail)
                    if (charge.status == "succeeded" && charge.paid == true) {
                        await payoutNotificationModule.update_booking_after_payment(args, charge)
                        await payoutNotificationModule.update_provider_payout(booking_detail)
                        await payoutNotificationModule.accept_payout_notification(booking_detail)
                        return resolve({ msg: "payment success", status: true, data: booking_detail })
                    } else {
                        await payoutNotificationModule.error_payout_notification(booking_detail);
                        return reject({ msg: "payment failed", status: false, data: {} })
                    }
                case 'mpesa':
                    let { msg, status, charge } = await mpesaModule.mpesa_payment(args, booking_detail)
                    if (charge.status == "succeeded" && charge.paid == true) {
                        await payoutNotificationModule.update_booking_after_payment(args, charge)
                        return resolve({ msg: "payment success", status: true, data: booking_detail })
                    } else {
                        await payoutNotificationModule.error_payout_notification(booking_detail);
                        return reject({ msg: "payment failed", status: false, data: {} })
                    }
                default:
                    return reject({ msg: "payment failed", status: false, data: {} })
            }
        } catch (error) {
            console.log("exports.choose_payment -> error", error)
            return reject({ msg: "", status: false })
        }
    })
}

