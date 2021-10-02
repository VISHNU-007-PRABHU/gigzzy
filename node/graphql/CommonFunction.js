const fs = require("fs");
const util = require("util");
const dotenv = require('dotenv');
const model = require('../model_data');
var ObjectId = require('mongodb').ObjectID;

var Currency_model = model.currency;
var Booking_model = model.booking;
dotenv.config();


exports.currency_calculation = async (args) => {
    try {
        let { currency_code, convert_code, amount } = args;
        console.log("exports.currency_calculation -> args", args)
        let default_currency = await Currency_model.findOne({ default_currency: "1" }).lean()
        let currency_data = await Currency_model.findOne({ code: currency_code }).lean()
        // amount =500 / rate =73.66 (currency_code inr) = 6.57 doller
        // currency_code INR convert to doller
        let usd_amount = amount / currency_data['rate'];
        let current_currency = currency_code ? currency_code : default_currency['code'];
        if (current_currency == "USD") {
            return `${currency_data.symbol}${amount}`;
        } else {
            // DOLLER convert to Conversion Code (Euro)
            let convert_data = await Currency_model.findOne({ code: convert_code }).lean()
            let rate = default_currency['rate']
            let symbol = default_currency['symbol']
            if (convert_data && convert_data['rate']) {
                rate = convert_data['rate']
                symbol = convert_data.symbol
            }
            let final_amount = usd_amount * rate;
            return `${symbol} ${String(parseFloat(final_amount).toFixed(2))}`
        }
    } catch (error) {
        return args.amount || 0.00
    }
}

exports.get_current_currency = async (args) => {
    try {
        let default_currency = await Currency_model.findOne({ code: args.code }).lean()
        return default_currency
    } catch (error) {
        return { status: "falied", msg: "error in currency" }
    }
}

exports.get_total_payout = async (data, default_currency) => {
    try {
        let total = 0;
        let pipeline = {
            provider_id: ObjectId(data),
            booking_status: 14,
            provider_fee: { $ne: 'NaN' },
        }
        var records = await Booking_model.find(pipeline);
        records.forEach(element => {
            if (element.provider_fee) {
                if (default_currency['_id'] == element['currency_id']) {
                    total += Number(element['provider_fee'])
                }
                else {
                    let usd_amount = element['provider_fee'] / element['default_currency_rate'];
                    let local_amount = usd_amount * element['currenct_local_rate'];
                    if(local_amount){
                        total += Number(local_amount)
                    }
                }
            }
        });
        return total
    } catch (error) {
        console.log("exports.get_total_payout -> error", error)
        return 0
    }
}