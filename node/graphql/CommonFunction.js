const fs = require("fs");
const util = require("util");
const dotenv = require('dotenv');
const model = require('../model_data');
var Currency_model = model.currency;
dotenv.config();


exports.currency_calculation = async (args) => {
    try {
        let { currency_code, convert_code, amount } = args;
        console.log("exports.currency_calculation -> currency_code, convert_code, amount ", currency_code, convert_code, amount )
        let default_currency = await Currency_model.findOne({ default_currency: 1 }).lean()
        let currency_data = await Currency_model.findOne({ code: currency_code }).lean()
        // amount =500 / rate =73.66 (currency_code inr) = 6.57 doller
        // currency_code INR convert to doller
        let usd_amount = amount / currency_data['rate'];
        let current_currency = currency_code ? currency_code : default_currency['code'];
        if (current_currency == "USD") {
            return  `${currency_data.symbol}${amount}`;
        } else {
            // DOLLER convert to Conversion Code (Euro)
            let convert_data = await Currency_model.findOne({ code: convert_code }).lean()
            let final_amount = usd_amount * convert_data['rate'];
            return `${convert_data.symbol} ${String(parseFloat(final_amount).toFixed(2))}`
        }
    } catch (error) {
        return 0.00
    }
}

exports.get_current_currency = async (args) => {
    try {
        let default_currency = await Currency_model.findOne({ code: args.code }).lean()
        return default_currency
    } catch (error) {
        return {status:"falied",msg:"error in currency"}
    }
}