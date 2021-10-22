var moment = require("moment");
const model = require('../../model_data');
var ObjectId = require('mongodb').ObjectID;
var commonHelper = require('../commonHelper');
var CommonFunction = require('../CommonFunction');
const PushNotification = require('../notification/PushNotification')
var Detail_model = model.detail;
var Booking_model = model.booking;
var Contract_model = model.contract_job;


exports.add_message = async (parent, args, context, info) => {
    try {
        var msg_count_data = {};
        args.message_date = moment.utc().format();
        const add_msg = new message_model(args);
        var data = await add_msg.save();
        var booking = await Booking_model.findOne({ _id: args.booking_id });
        if (args.role == 1) {
            msg_count_data['provider_msg_count'] = Number(booking.provider_msg_count) + 1;
            msg_count_data['provider_msg_is_read'] = 1;
        } else if (args.role == 2) {
            msg_count_data['user_msg_count'] = Number(booking.user_msg_count) + 1;
            msg_count_data['user_msg_is_read'] = 1;
        }

        var msg_count = await Booking_model.findOneAndUpdate({ _id: args.booking_id }, msg_count_data, { new: true });
        var datas = await message_model.findOne({ _id: data._id });
        await global.pubsub.publish('MESSAGE_CREATED', { messageSent: datas });
        await global.pubsub.publish('SEND_ACCEPT_MSG', { send_accept_msg: msg_count });
        // ================= push_notifiy ================== //
        var user_data = {};
        if (args.role == 1) {
            user_data = { _id: booking.provider_id }
        } else if (args.role == 2) {
            user_data = { _id: booking.user_id }
        }
        var user = await Detail_model.findOne(user_data);
        msg_count_data['booking_id'] = args.booking_id;
        var message = {
            to: user.device_id,
            collapse_key: 'your_collapse_key',
            notification: {
                title: "Message",
                body: msg_count_data,
                click_action: ".activities.HomeActivity",
            },
            data: {
                my_key: commonHelper.chat,
                my_another_key: commonHelper.chat,
                booking_id: args.booking_id
            }
        };
        await commonHelper.push_notifiy(message);
        return datas;
    } catch (error) {
        return { msg: "failed to sent message", status: "failed" }
    }
}


exports.live_chating = async (parent, args, context, info) => {
    try {
        var msg_count_data = {};
        let data = await this.add_chating(args)
        var booking = await Contract_model.findOne({ _id: args.contract_id });
        if (args.role == 1) {
            msg_count_data['provider_msg_count'] = Number(booking.provider_msg_count) + 1;
            msg_count_data['provider_msg_is_read'] = 1;
        } else if (args.role == 2) {
            msg_count_data['user_msg_count'] = Number(booking.user_msg_count) + 1;
            msg_count_data['user_msg_is_read'] = 1;
        }
        var msg_count = await Contract_model.findOneAndUpdate({ _id: args.contract_id }, msg_count_data, { new: true });
        var datas = await message_model.findOne({ _id: data._id });
        await global.pubsub.publish('MESSAGE_CREATED', { messageSent: datas });
        await global.pubsub.publish('SEND_ACCEPT_MSG', { send_accept_msg: msg_count });

        msg_count_data['booking_id'] = args.contract_id;
        let notification_user_data = [{
            user_id: user.device_id,
            booking_status: "msg_1",
            booking_id: args['contract_id'],
            key: commonHelper.chat,
            another_key: commonHelper.chat,
            option_data: msg_count_data,
        }]

        await PushNotification.create_push_notification_msg(notification_user_data);

        return datas;
    } catch (error) {
        return { msg: "failed to sent message", status: "failed" }
    }
}

exports.add_chating = (args) => {
    return new Promise(async function (resolve, reject) {
        try {
            args.message_date = moment.utc().format();
            const add_msg = new message_model(args);
            var data = await add_msg.save();
            return resolve(data)
        } catch (error) {
            return reject({ status: false, msg: 'message added failed' })
        }
    })
}

module.exports.get_chat_message = async (parent, args, context, info) => {
    let find_data = {}
    if (args['contract_id']) {
        find_data['contract_id'] = args['contract_id']
    }
    if (args['booking_id']) {
        find_data['booking_id'] = args['booking_id']
    }
    var result = await message_model.find(find_data);
    return result;
};
