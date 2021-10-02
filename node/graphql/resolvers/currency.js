const model = require('../../model_data');
var moment = require("moment");
var _ = require("lodash");
var ObjectId = require('mongodb').ObjectID;
var Currency_model = model.currency;
var Detail_model = model.detail;
module.exports.get_currencys = async (root, args) => {

    try {
        var limit = args.limit || 10;
        var page = args.page || 1;
        var offset = Number(page - 1) * Number(limit);
        let match = { is_delete: false }
        if (args['_id']) {
            match['_id'] = ObjectId(args['_id'])
        }
        if (args.search && _.size(args.search)) {
            if (args.search.$ne) {
                let new_ids = []
                args.search.$ne.map(data => {
                    new_ids.push(ObjectId(data))
                })
                match['_id'] = { $nin: new_ids }
            }
        }
        let pipeline = []
        if (args.pagination && args.pagination === true) {
            pipeline = [
                { $match: match },
                { $skip: Number(offset) },
                { $limit: Number(limit) }
            ]
        } else {
            pipeline = [
                { $match: match },
            ]
        }
        const admin_email = await Currency_model.aggregate(pipeline)
        var pageInfo={}
        if (args.pagination && args.pagination === true) {
            var total = await Currency_model.count({ is_delete: false });
            pageInfo = { totalDocs: total, page: args.page }
        }
        return { pageInfo, data: admin_email }
    } catch (error) {
        return []
    }
}

module.exports.get_currency = async (root, args) => {
    try {
        let match = { is_delete: false }
        if (args['_id']) {
            match['_id'] = ObjectId(args['_id'])
        }
        if (args['country_code']) {
            match['country_code'] = args['country_code']
        }
        if (args['location_code']) {
            match['location'] = _.toUpper(args['location_code'])
        }

        if (args.user_id) {
            const user_detail = await Detail_model.findOne({ _id: ObjectId(args.user_id) }).lean()
            if (user_detail && user_detail.location_code) {
                match['location'] = ObjectId(user_detail['location_code'])
            }
        }
        var currency = await Currency_model.findOne(match).lean()
        if (!_.size(currency)) {
            currency = await Currency_model.findOne({ default_currency: "1" }).lean()
        }
        return currency
    } catch (error) {
        return { "msg": "Error in curreny fetch", status: 'failed' };
    }
}


module.exports.get_parent_currency = async (root, args) => {
    try {
        let match = { is_delete: false }
        if (root['currency_id']) {
            match['_id'] = ObjectId(root['currency_id'])
        }
        const currency = await Currency_model.findOne(match).lean()
        return currency
    } catch (error) {
        return { "msg": "Error in curreny fetch", status: 'failed' };
    }
}

module.exports.update_currency = async (root, args) => {
    try {
        if (args['location']) {
            args['location'] = _.toUpper(args['location'])
        }
        if (args['_id']) {
            var result = await Currency_model.update({ _id: args._id }, args.currency_data);
            return { "msg": "Update Process Success", status: 'success' };
        } else {
            let add_location = new Currency_model(args.currency_data)
            let added_location = await add_location.save()
            added_location['status'] = "success";
            added_location['msg'] = "currency added success"
            return added_location
        }
    } catch (error) {
        return { "msg": "Error in currency update", status: 'failed' };
    }
}

module.exports.delete_currency = async (root, args) => {
    try {
        var result = await Currency_model.update({ _id: args._id }, { is_delete: true });
        return { "msg": "delete Process Success", status: 'success' };

    } catch (error) {
        return { "msg": "Error in currency delete", status: 'failed' };
    }
}
