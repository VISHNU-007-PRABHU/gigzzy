const model = require('../../model_data');
const _ = require('lodash');
const moment = require("moment");
const stripeModule = require('./stripe');
const mpesaModule = require('./mpesa');
const payoutNotificationModule = require('./payout_notification')
const ContractPayoutNotificationModule = require('./ContractPayoutNotification')

exports.choose_payment = async (args, booking_detail) => {
    return new Promise(async function (resolve, reject) {
        try {
            switch (args.payment_option) {
                case 'stripe':
                    let stripe_charge = await stripeModule.stripe_payment(args,booking_detail)
                    if (stripe_charge.charge.status == "succeeded" && stripe_charge.charge.paid == true) {
                        await payoutNotificationModule.update_booking_after_payment(args, stripe_charge.charge)
                        await payoutNotificationModule.update_provider_payout(booking_detail)
                        await payoutNotificationModule.accept_payout_notification(booking_detail)
                        return resolve({ msg: "stripe payment success", status: true, data: booking_detail })
                    } else {
                        await payoutNotificationModule.error_payout_notification(booking_detail);
                        return reject({ msg: "stripe payment failed", status: false, data: {} })
                    }
                case 'mpesa':
                    let mpesa_charge = await mpesaModule.mpesa_payment(args, booking_detail)
                    if (mpesa_charge.charge.status == true) {
                        await payoutNotificationModule.update_booking_after_payment(args, mpesa_charge.charge)
                        return resolve({ msg: "mpesa payment success", status: true, data: booking_detail })
                    } else {
                        await payoutNotificationModule.error_payout_notification(booking_detail);
                        return reject({ msg: "mpesa payment failed", status: false, data: {} })
                    }
                default:
                    return reject({ msg: "payment failed", status: false, data: {} })
            }
        } catch (error) {
            console.log("exports.choose_payment -> error", error)
            return reject({ msg: "payment failed", status: false })
        }
    })
}

exports.choose_contract_payment = async (args,contract_detail,biding_detail) => {
    return new Promise(async function (resolve, reject) {
        try {
            switch (args.payment_option) {
                case 'stripe':
                    let stripe_charge = await stripeModule.stripe_payment(args, contract_detail )
                    if (stripe_charge.charge.status == "succeeded" && stripe_charge.charge.paid == true) {
                        await ContractPayoutNotificationModule.update_contract_after_payment(args, stripe_charge.charge,biding_detail)
                        await ContractPayoutNotificationModule.update_provider_payout(contract_detail)
                        await ContractPayoutNotificationModule.accept_payout_notification(contract_detail)
                        return resolve({ msg: "stripe payment success", status: true, data: contract_detail })
                    } else {
                        await ContractPayoutNotificationModule.error_payout_notification(contract_detail);
                        return reject({ msg: "stripe payment failed", status: false, data: {} })
                    }
                case 'mpesa':
                    let mpesa_charge = await mpesaModule.mpesa_payment(args, contract_detail)
                    if (mpesa_charge.charge.status == true) {
                        await ContractPayoutNotificationModule.update_contract_after_payment(args, mpesa_charge.charge,biding_detail)
                        return resolve({ msg: "mpesa payment success", status: true, data: contract_detail })
                    } else {
                        await ContractPayoutNotificationModule.error_payout_notification(contract_detail);
                        return reject({ msg: "mpesa payment failed", status: false, data: {} })
                    }
                default:
                    return reject({ msg: "payment failed", status: false, data: {} })
            }
        } catch (error) {
            console.log("exports.choose_payment -> error", error)
            return reject({ msg: "payment failed", status: false })
        }
    })
}
