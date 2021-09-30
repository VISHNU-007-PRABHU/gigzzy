
const model = require('../../model_data');
const _ = require('lodash');

exports.update_provider_payout = async (booking_detail, booking_data) => {
    let update_provider_data = {
        provider_id: booking_detail.provider_id,
        booking_id: booking_detail._id,
        amount: String(booking_data.provider_fee),
        booking_status: booking_data.booking_status || 10
    };
    const update_provider_payout = new Payout_model(update_provider_data);
    const save = await update_provider_payout.save();
    return save
}

exports.accept_payout_notification = async (args, booking_detail, booking_data) => {
    return new Promise(async function (resolve, reject) {
        try {
            let booking_detail = await Booking_model.findOne({ _id: booking_detail._id }).lean()
            let app_user_detail = await Detail_model.findOne({ _id: booking_detail.user_id });
            let user_detail = await Detail_model.findOne({ _id: booking_detail.provider_id });

            // send push notification to provider
            if (user_detail && user_detail.device_id) {
                let notification = {
                    title: 'Accept',
                    body: "User Accept The Job",
                    click_action: ".activities.HomeActivity",
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
            
            // send sms for accept booking
            await commonHelper.send_sms(user_detail.country_code, user_detail.phone_no, "job_assign", {})
            await commonHelper.send_sms(app_user_detail.country_code, app_user_detail.phone_no, "job_placed", {})
            
            //send my appoinment
            const result = await Booking_model.find({ provider_id: booking_detail.provider_id, booking_status: 10 }).sort({ created_at: -1 });
            await pubsub.publish(APPOINTMENTS, { get_my_appointments: result });
            
            //send current booking data using subcription
            booking_detail['user_parent'] = true;
            booking_detail['msg'] = "user accept the job ";
            booking_detail['status'] = 'success';
            booking_detail['msg_status'] = 'to_provider';
            let user_booking_data= booking_detail
            user_booking_data['msg_status'] = 'to_user';
            await pubsub.publish(SEND_ACCEPT_MSG, { send_accept_msg: booking_detail });
            await pubsub.publish(SEND_ACCEPT_MSG, { send_accept_msg: user_booking_data });
            return resolve({ status: true, msg: "Payment Is success !", data })

        } catch (error) {
            reject({ msg: "Error in payment notification", status: false })
        }
    })
}

