const model = require('../../model_data');
const _ = require('lodash');
const PushNotification  = require("../notification/PushNotification")
var Detail_model = model.detail;
var Booking_model = model.booking;
var Payout_model = model.payout;
var Contract_model = model.contract_job


/**
 * 
 * @param {*} body  { TransID,TransAmount,TransTime ,ResultCode,ctob_billRef }
 * @returns 
 */

exports.c2b_contract_confiramtion =async (body) => {
    try {
        let is_success = true
        let find_data ={}

        if (body['ResultCode'] != 0 && pre_booking_detail['base_price'] != Number(body['TransAmount'])) {
            update_details['resultcode'] = body['ResultCode'] || 2;
            update_details['job_status'] = 11;
            update_details['booking_status'] = 11;
            is_success = false
        } else {
            update_details['job_status'] = 10;
            update_details['booking_status'] = 10;
            update_details['MpesaReceiptNumber'] = body["TransID"];
            update_details['TransactionDate'] = body["TransTime"];
        }
        
        update_details['payment_message'] = body['payment_message']
        if(body['payment_type'] ==="mpesa"){
            find_data['CheckoutRequestID'] = body['CheckoutRequestID'] 
        }else{
            find_data['ctob_billRef'] = body['ctob_billRef'] 
        }

        await Contract_model.updateOne(find_data, update_details)
        let contract_detail = await Contract_model.findOne(find_data).lean()
        let update_provider_data = {
            provider_id: contract_detail.provider_id,
            booking_id: contract_detail._id,
            amount: String(contract_detail.provider_fee),
            booking_status: 10
        };
        const update_provider = new Payout_model(update_provider_data);
        const save = await update_provider.save();

        if (is_success) {
            let notification_user_data =[
                {
                    user_id:contract_detail.provider_id,
                    booking_id:contract_detail._id,
                    booking_status:10
                }
            ]
            await PushNotification.create_push_notification_msg(notification_user_data);
            contract_detail['user_parent'] = true
            contract_detail['msg'] = "user accept the job "
            contract_detail['status'] = "success"
            contract_detail['msg_status'] = "to_provider"
            return resolve({ status: true, msg: "Payment Is success !", data: contract_detail })
        } else {
            return resolve({ status: true, msg: "Mpesa Payment failed !" })
        }
    } catch (error) {
        return resolve({ status: true, msg: "Mpesa Payment failed !" })
    }
}