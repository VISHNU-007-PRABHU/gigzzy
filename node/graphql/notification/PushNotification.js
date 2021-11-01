const _ = require('lodash')
const model = require('../../model_data');
const commonHelper = require('../../graphql/commonHelper');
var Detail_model = model.detail;

const static_notification_template = (type, data) => {
    switch (type) {
        case 14:
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
        case 9:
            return {
                title: 'New Job Invitation',
                body: "User post a new contract",
                click_action: ".activities.HomeActivity",
            }
        case 4:
            return {
                title: 'User start the job',
                body: "User start the job",
                click_action: ".activities.HomeActivity",
            }
        case 13:
            return {
                title: 'Provider end the job',
                body: "Provider end the job",
                click_action: ".activities.HomeActivity",
            }
        case 8:
            return {
                title: 'You job cancelled',
                body: "You job cancelled",
                click_action: ".activities.HomeActivity",
            }
        case "miles_start":
            return {
                title: 'Your milestone start',
                body: "Your milestone start",
                click_action: ".activities.HomeActivity",
            }
        case 'biding_9':
            return {
                title: 'New Biding',
                body: "Provider sent new biding proposal",
                click_action: ".activities.HomeActivity",
            }
        case 'msg_1':
            return {
                title: "Message",
                body: data,
                click_action: ".activities.HomeActivity",
            }
        case 'job_closed':
            return {
                title: 'Job closed ',
                body: "Your job is closed for due no  more action ",
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
                    notification: static_notification_template(user_data[i]['booking_status'], user_data[i]['option_data']),
                    data: {
                        my_key: user_data[i]['key'] || commonHelper.pending,
                        my_another_key: user_data[i]['another_key'] || commonHelper.pending,
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
