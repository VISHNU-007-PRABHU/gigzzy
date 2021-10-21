
const model = require('../../model_data');
const _ = require('lodash');
const moment = require("moment");
const commonHelper = require('../commonHelper')
const PushNotification = require('../notification/PushNotification')
var Detail_model = model.detail;
var Payout_model = model.payout;
var Contract_model = model.contract_job
var Biding_model = model.Biding
var BidingMilestone_model = model.Milestone;

exports.update_milestone_provider_payout = async (detail) => {
    let update_provider_data = {
        // provider_id: detail.provider_id,
        amount: String(detail.amount),
        booking_status: 10,
        job_type: "contract",
        pay_type:"milestone",
        contract_id: detail['contract_id'],
        milestone_id: detail['_id'],
    };
    const update_provider_payout = new Payout_model(update_provider_data);
    const save = await update_provider_payout.save();
    return save
}

exports.update_milestone_after_payment = async (args, charge, biding) => {
    return new Promise(async function (resolve, reject) {
        try {
            let milestone_data = {
                provider_fee: String(parseFloat(args.amount).toFixed(2)),
                phone_number: args.phone_number,
                payment_type: args.payment_type,
                payment_option: args.payment_option,
                payment_history: charge,
            }

            if (args.booking_status === 10) {
                milestone_data['accept_date'] = moment.utc().format();
                if (args.payment_option === "mpesa") {
                    milestone_data['booking_status'] = 50;
                } else {
                    milestone_data['booking_status'] = 10;
                    milestone_data['job_status'] = 10;
                    milestone_data['payment_status'] = 1;
                }
            } else {
                milestone_data['end_date'] = moment.utc().format();
                if (args.payment_option === "mpesa") {r
                    milestone_data['mpeas_payment_callback'] = true
                    if (args.payment_type !== "c2b") {
                        milestone_data['MerchantRequestID'] = charge.data.MerchantRequestID || 0;
                        milestone_data['CheckoutRequestID'] = charge.data.CheckoutRequestID || 0;
                    }
                } else {
                    milestone_data['booking_status'] = 14;
                    milestone_data['extra_payment_callback'] = false;
                    milestone_data['payment_status'] = 5;
                    milestone_data['job_status'] = 14;
                }
            }

            let contract_data = {
                currenct_milestone_status: 10,
                currenct_milestone_id: args['_id']
            }
            await Contract_model.updateOne({ _id: args.contract_id }, contract_data, { new: true });
            await BidingMilestone_model.updateOne({ _id: args._id }, milestone_data, { new: true });
            return resolve({ msg: "update success", status: true });
        } catch (error) {
            console.log("exports.update_booking_after_payment -> error", error)
            return reject({ msg: "update booking table after payment failed", status: false })
        }
    })
}

exports.accept_milestone_payout_notification = async (milestone_data) => {
    return new Promise(async function (resolve, reject) {
        try {
            let booking_detail = await Contract_model.findOne({ _id: contract_data._id }).lean()
            let milestone_detail = await Contract_model.findOne({ _id: contract_data._id }).lean()
            let app_user_detail = await Detail_model.findOne({ _id: contract_data.user_id });
            let user_detail = await Detail_model.findOne({ _id: contract_data.provider_id });

            // send push notification to provider
            let notification_user_data = [{
                user_id: user_detail.device_id,
                booking_status: milestone_detail.booking_status,
                booking_id: milestone_detail._id
            }]

            await PushNotification.create_push_notification_msg(notification_user_data);
         
            if (booking_detail.booking_status === 13) {
                await commonHelper.send_sms(app_user_detail.country_code, app_user_detail.phone_no, "job_finished", {})
                return resolve({ job_status: 14, msg: "job is completed successfully", status: 'success' });

            } else {
                // send sms for accept booking
                // await commonHelper.send_sms(user_detail.country_code || 0, user_detail.phone_no, "job_assign", {})
                // await commonHelper.send_sms(app_user_detail.country_code || 0, app_user_detail.phone_no, "job_placed", {})
                //send my appoinment
                // const result = await Booking_model.find({ provider_id: booking_detail.provider_id, booking_status: 10 }).sort({ created_at: -1 });
                // await global.pubsub.publish("APPOINTMENTS", { get_my_appointments: result });

                //send current booking data using subcription
                milestone_detail['user_parent'] = true;
                milestone_detail['msg'] = "user accept the job ";
                milestone_detail['status'] = 'success';
                milestone_detail['msg_status'] = 'to_provider';
                let  = milestone_detail
                user_contract_data['msg_status'] = 'to_user';
                await global.pubsub.publish("GET_MY_MILESTONE", { get_my_milestone: user_contract_data });
                return resolve({ status: true, msg: "Payment Is success !", data: user_contract_data })
            }

        } catch (error) {
            console.log("exports.accept_payout_notification -> error", error)
            return reject({ msg: "Error in payment notification", status: false })
        }
    })
}



