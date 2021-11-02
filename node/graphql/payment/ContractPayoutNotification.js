
const model = require('../../model_data');
const _ = require('lodash');
const moment = require("moment");
const commonHelper = require('../commonHelper')
const PushNotification = require('../notification/PushNotification')
var Detail_model = model.detail;
var Booking_model = model.booking;
var Payout_model = model.payout;
var Contract_model = model.contract_job
var Biding_model = model.Biding

exports.update_provider_payout = async (contract_data) => {
    let booking_detail = await Contract_model.findOne({ _id: contract_data._id }).lean()
    if (booking_detail.booking_status === "base_paid") {
        let update_provider_data = {
            provider_id: booking_detail.provider_id,
            amount: String(booking_detail.service_fee),
            booking_status: booking_detail.booking_status || 10,
            job_type: "contract",
            contract_id: "contract_data._id",
        };
        const update_provider_payout = new Payout_model(update_provider_data);
        const save = await update_provider_payout.save();
        return save
    }
}

exports.update_milestone_provider_payout = async (detail) => {
    let update_provider_data = {
        // provider_id: detail.provider_id,
        amount: String(detail.amount),
        booking_status: 10,
        job_type: "contract",
        pay_type: "milestone",
        contract_id: detail['contract_id'],
        milestone_id: detail['_id'],
    };
    const update_provider_payout = new Payout_model(update_provider_data);
    const save = await update_provider_payout.save();
    return save
}

exports.update_contract_after_payment = async (args, charge, biding) => {
    return new Promise(async function (resolve, reject) {
        try {
            let contract_data = {
                service_fee: String(parseFloat(args.amount).toFixed(2)),
                provider_fee: String(parseFloat(args.amount).toFixed(2)),
                phone_number: args.phone_number,
                payment_type: args.payment_type,
                payment_option: args.payment_option,
                payment_history: charge,
            }

            if (args.booking_status ===4) {
                contract_data['accept_date'] = moment.utc().format();
                if (args.payment_option === "mpesa") {
                    contract_data['booking_status'] = 50;
                } else {
                    contract_data['booking_status'] = 4;
                    contract_data['job_status'] = 10;
                    contract_data['milestones_status'] = commonHelper.booking_status.PENDING,
                    contract_data['payment_status'] = 1;
                }
            } else {
                contract_data['end_date'] = moment.utc().format();
                if (args.payment_option === "mpesa") {
                    contract_data['mpeas_payment_callback'] = true
                    if (args.payment_type !== "c2b") {
                        contract_data['MerchantRequestID'] = charge.data.MerchantRequestID || 0;
                        contract_data['CheckoutRequestID'] = charge.data.CheckoutRequestID || 0;
                    }
                } else {
                    contract_data['booking_status'] = 14;
                    contract_data['extra_payment_callback'] = false;
                    contract_data['payment_status'] = 5;
                    contract_data['job_status'] = 14;
                }
            }

            let biding_data = {
                booking_status: 4,
                service_fee: String(parseFloat(args.amount).toFixed(2)),
                payment_status: "paid"
            }
            await Contract_model.updateOne({ _id: args.contract_id }, contract_data, { new: true });
            await Biding_model.updateOne({ _id: args.biding_id }, biding_data, { new: true });
            return resolve({ msg: "update success", status: true });
        } catch (error) {
            console.log("exports.update_booking_after_payment -> error", error)
            return reject({ msg: "update booking table after payment failed", status: false })
        }
    })
}

exports.accept_payout_notification = async (contract_data) => {
    return new Promise(async function (resolve, reject) {
        try {
            let booking_detail = await Contract_model.findOne({ _id: contract_data._id }).lean()
            let app_user_detail = await Detail_model.findOne({ _id: booking_detail.user_id });
            let provider_detail = await Detail_model.findOne({ _id: booking_detail.provider_id });

            let notification_user_data = [{
                user_id: provider_detail._id,
                booking_status: booking_detail.booking_status,
                booking_id: booking_detail._id
            }]

            await PushNotification.create_push_notification_msg(notification_user_data);
            await global.pubsub.publish("CONTRACT_DETAIL", { contract_details: booking_detail });

            if (booking_detail.booking_status === 13) {
                await commonHelper.send_sms(app_user_detail.country_code, app_user_detail.phone_no, "job_finished", {})
                return resolve({ job_status: 14, msg: "job is completed successfully", status: 'success' });
            } else {
                // send sms for accept booking
                // await commonHelper.send_sms(provider_detail.country_code || 0, provider_detail.phone_no, "job_assign", {})
                // await commonHelper.send_sms(app_user_detail.country_code || 0, app_user_detail.phone_no, "job_placed", {})

                if (contract_data.booking_status === 10) {
                    await global.pubsub.publish("GET_MY_CONTRACTS", { get_my_contracts: [contract_data] });
                } else {
                    //send my appoinment
                    let find_socket_result = {
                        provider_id: booking_detail.provider_id,
                        booking_status: booking_detail.booking_status
                    }
                    const result = await Contract_model.find(find_socket_result).sort({ created_at: -1 });
                    await global.pubsub.publish("GET_MY_CONTRACTS", { get_my_contracts: result });
                }

                //send current booking data using subcription
                booking_detail['user_parent'] = true;
                booking_detail['msg'] = "user accept the job ";
                booking_detail['status'] = 'success';
                booking_detail['msg_status'] = 'to_provider';
                let user_contract_data = booking_detail
                user_contract_data['msg_status'] = 'to_user';
                // await global.pubsub.publish("SEND_ACCEPT_MSG", { send_accept_msg: booking_detail });
                // await global.pubsub.publish("SEND_ACCEPT_MSG", { send_accept_msg: user_contract_data });
                return resolve({ status: true, msg: "Payment Is success !", data: booking_detail })
            }

        } catch (error) {
            console.log("exports.accept_payout_notification -> error", error)
            return reject({ msg: "Error in payment notification", status: false })
        }
    })
}


exports.particular_contract_notification = async (contract_data) => {
    return new Promise(async function (resolve, reject) {
        try {
            let booking_detail = await Contract_model.findOne({ _id: contract_data._id }).lean()
            let app_user_detail = await Detail_model.findOne({ _id: booking_detail.user_id });
            let provider_detail = await Detail_model.findOne({ _id: booking_detail.provider_id });

            let notification_user_data = [{
                user_id: app_user_detail._id,
                booking_status: booking_detail.booking_status,
                booking_id: booking_detail._id
            }]
            if (provider_detail) {
                notification_user_data.push({
                    user_id: provider_detail._id,
                    booking_status: booking_detail.booking_status,
                    booking_id: booking_detail._id
                })
            }

            await PushNotification.create_push_notification_msg(notification_user_data);
            console.log("exports.particular_contract_notification -> CONTRACT_DETAIL")
            await global.pubsub.publish("CONTRACT_DETAIL", { contract_details: contract_data });
            return resolve({ status: true, msg: "Payment Is success !" })

        } catch (error) {
            console.log("exports.accept_payout_notification -> error", error)
            return reject({ msg: "Error in payment notification", status: false })
        }
    })
}

exports.error_payout_notification = async (booking_data) => {
    return new Promise(async function (resolve, reject) {
        try {
            let update_details = {
                payment_message: "",
                resultcode: "001",
                payment_message: "stripe payment error"
            }

            update_details['job_status'] = 11;
            update_details['booking_status'] = 11;
            await Booking_model.updateOne({ _id: booking_data._id }, update_details)
            const error_result = await Booking_model.find({ provider_id: booking_data.provider_id }).sort({ created_at: -1 });
            let error_booking_detail = await Booking_model.findOne({ CheckoutRequestID }).lean()
            let data = {
                user_parent: true,
                ...error_booking_detail,
                msg: update_details['payment_message'],
                status: 'failed',
                msg_status: 'to_provider'
            }
            await global.pubsub.publish(APPOINTMENTS, { get_my_appointments: error_result });
            await global.pubsub.publish(SEND_ACCEPT_MSG, { send_accept_msg: data });
            // to user
            let error_invoice_user_data = {
                user_parent: true,
                ...error_booking_detail,
                msg: update_details['payment_message'],
                status: 'failed',
                msg_status: 'to_user'
            }
            await global.pubsub.publish(SEND_ACCEPT_MSG, { send_accept_msg: error_invoice_user_data });
            return resolve({ status: true, msg: "Mpesa Payment failed !" })

        } catch (error) {
            reject({ msg: "Error in payment notification", status: false })
        }
    })
}

