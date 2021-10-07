const _ = require('lodash')
const model = require('../../model_data');
const commonHelper = require('../../graphql/commonHelper');
var Detail_model = model.detail;

const static_notification_template = (type, data) => {
    switch (type) {
        case 13:
            return {
                title: 'Complete',
                body: "User Complete the job",
                click_action: ".activities.HomeActivity",
            }
        case 10:
            return {
                title: 'Accept',
                body: "User Accept The Job",
                click_action: ".activities.HomeActivity",
            }

        default:
            return {
                title: '',
                body: "Thanks to using Gizzy",
                click_action: ".activities.HomeActivity",
            }
    }
}


exports.create_push_notification_msg = async (user_data) => {
    try {
        for (let i = 0; i < user_data.length; i++) {
            let user_detail = await Detail_model.findOne({ _id: user_data[i]['user_id'] });
            if (_.size(user_detail) && user_detail.device_id) {
                var message = {
                    to: user_detail.device_id,
                    notification: static_notification_template(user_data[i]['booking_status']),
                    data: {
                        my_key: commonHelper.pending,
                        my_another_key: commonHelper.pending,
                        booking_id: user_data[i]['booking_id']
                    }
                };
                await commonHelper.push_notifiy(message);
            }
        }
        return true
    } catch (error) {
        return false
    }


}