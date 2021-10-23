
const model = require('../../model_data');
const _ = require('lodash');
const moment = require("moment");
const commonHelper = require('../commonHelper')
var Detail_model = model.detail;
var Booking_model = model.booking;
var Payout_model = model.payout;

exports.update_provider_payout = async (bookingData) => {
    let booking_detail = await Booking_model.findOne({ _id: bookingData._id }).lean()
    if (booking_detail.booking_status === 10) {
        let update_provider_data = {
            provider_id: booking_detail.provider_id,
            booking_id: booking_detail.booking_id,
            amount: String(booking_detail.provider_fee),
            booking_status: booking_detail.booking_status || 10
        };
        const update_provider_payout = new Payout_model(update_provider_data);
        const save = await update_provider_payout.save();
        return save
    } else {
        var pay_detail = await Payout_model.update({ booking_id: booking_detail._id }, { booking_status: 14 });
        return {}
    }
}

exports.update_booking_after_payment = async (args, charge) => {
    return new Promise(async function (resolve, reject) {
        try {
            let booking_data = {
                admin_fee: String(parseFloat(args.admin_fee).toFixed(2)),
                provider_fee: String(parseFloat(args.provider_fee).toFixed(2)),
                phone_number: args.phone_number,
                payment_type: args.payment_type,
                payment_option: args.payment_option,
                payment_history: charge
            }

            if (args.booking_status === 10) {
                booking_data['accept_date'] = moment.utc().format();
                if (args.payment_option === "mpesa") {
                    booking_data['booking_status'] = 50;
                } else {
                    booking_data['booking_status'] = 10;
                    booking_data['job_status'] = 10;
                    booking_data['payment_status'] = 1;
                }
            } else {
                booking_data['end_date'] = moment.utc().format();
                if (args.payment_option === "mpesa") {
                    booking_data['mpeas_payment_callback'] = true
                    if (args.payment_type !== "c2b") {
                        booking_data['MerchantRequestID'] = charge.data.MerchantRequestID || 0;
                        booking_data['CheckoutRequestID'] = charge.data.CheckoutRequestID || 0;
                    }
                } else {
                    booking_data['booking_status'] = 14;
                    booking_data['extra_payment_callback'] = false;
                    booking_data['payment_status'] = 5;
                    booking_data['job_status'] = 14;
                }
            }

            await Booking_model.update({ _id: args.booking_id }, booking_data, { new: true });
            return resolve({ msg: "update success", status: true });
        } catch (error) {
            console.log("exports.update_booking_after_payment -> error", error)
            return reject({ msg: "update booking table after payment failed", status: false })
        }
    })
}

exports.accept_payout_notification = async (booking_data) => {
    return new Promise(async function (resolve, reject) {
        try {
            let booking_detail = await Booking_model.findOne({ _id: booking_data._id }).lean()
            let app_user_detail = await Detail_model.findOne({ _id: booking_detail.user_id });
            let user_detail = await Detail_model.findOne({ _id: booking_detail.provider_id });

            // send push notification to provider
            if (user_detail && user_detail.device_id) {
                let notification = {}
                if (booking_detail.booking_status === 13) {
                    notification = {
                        title: 'Complete',
                        body: "User Complete the job",
                        click_action: ".activities.HomeActivity",
                    }
                } else {
                    notification = {
                        title: 'Accept',
                        body: "User Accept The Job",
                        click_action: ".activities.HomeActivity",
                    }
                }
                var message = {
                    to: user_detail.device_id,
                    notification: notification,
                    data: {
                        my_key: commonHelper.pending,
                        my_another_key: commonHelper.pending,
                        booking_id: booking_detail.booking_id
                    }
                };
            }
            await commonHelper.push_notifiy(message);

            if (booking_detail.booking_status === 13) {
                await commonHelper.send_sms(app_user_detail.country_code, app_user_detail.phone_no, "job_finished", {})
                return resolve({ job_status: 14, msg: "job is completed successfully", status: 'success' });

            } else {
                // send sms for accept booking
                await commonHelper.send_sms(user_detail.country_code, user_detail.phone_no, "job_assign", {})
                await commonHelper.send_sms(app_user_detail.country_code, app_user_detail.phone_no, "job_placed", {})

                //send my appoinment
                const result = await Booking_model.find({ provider_id: booking_detail.provider_id, booking_status: 10 }).sort({ created_at: -1 });
                await global.pubsub.publish("APPOINTMENTS", { get_my_appointments: result });

                //send current booking data using subcription
                booking_detail['user_parent'] = true;
                booking_detail['msg'] = "user accept the job ";
                booking_detail['status'] = 'success';
                booking_detail['msg_status'] = 'to_provider';
                let user_booking_data = booking_detail
                user_booking_data['msg_status'] = 'to_user';
                await global.pubsub.publish("SEND_ACCEPT_MSG", { send_accept_msg: booking_detail });
                await global.pubsub.publish("SEND_ACCEPT_MSG", { send_accept_msg: user_booking_data });
                return resolve({ status: true, msg: "Payment Is success !", data: booking_detail })
            }

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
            let error_payment_issues = await global.pubsub.publish(SEND_ACCEPT_MSG, { send_accept_msg: error_invoice_user_data });
            return resolve({ status: true, msg: "Mpesa Payment failed !" })

        } catch (error) {
            reject({ msg: "Error in payment notification", status: false })
        }
    })
}

