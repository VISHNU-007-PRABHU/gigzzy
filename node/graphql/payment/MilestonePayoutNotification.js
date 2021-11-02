
const model = require('../../model_data');
const _ = require('lodash');
const moment = require("moment");
const commonHelper = require('../commonHelper')
const PushNotification = require('../notification/PushNotification')
const ContractPayoutNotificationModule = require('./ContractPayoutNotification')
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
                if (args.payment_option === "mpesa") {
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
            console.log("exports.update_milestone_after_payment -> milestone_data", milestone_data)
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
            let contract_data = await Contract_model.findOne({ _id: milestone_data['contract_id'] }).lean()
            let app_user_detail = await Detail_model.findOne({ _id: contract_data.user_id });
            let user_detail = await Detail_model.findOne({ _id: contract_data.provider_id });

            // send push notification to provider
            let notification_user_data = [{
                user_id: user_detail._id,
                booking_status: `milestone_${milestone_data.booking_status}`,
                booking_id: milestone_data._id
            }]

            await PushNotification.create_push_notification_msg(notification_user_data);
         
            await ContractPayoutNotificationModule.particular_contract_notification(contract_data)
            if (milestone_data.booking_status === 14) {
                await commonHelper.send_sms(app_user_detail.country_code, app_user_detail.phone_no, "job_finished", {})
                return resolve({ job_status: 14, msg: "job is completed successfully", status: 'success' });

            } else {
                //send current booking data using subcription
                milestone_data['user_parent'] = true;
                milestone_data['msg'] = "user accept the job ";
                milestone_data['status'] = 'success';
                milestone_data['msg_status'] = 'to_provider';
                let user_contract_data = milestone_data
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



