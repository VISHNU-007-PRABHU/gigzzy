const model = require('../../model_data');
var moment = require("moment");
var _ = require("lodash");
var ObjectId = require('mongodb').ObjectID;
var Currency_model = model.currency;

module.exports.get_currencys = async (root, args) => {
    try {
        var limit = args.limit || 10;
        var page = args.page || 1;
        var offset = Number(page - 1) * Number(limit);
        let match = { is_delete: false }
        if (args['_id']) {
            match['_id'] = ObjectId(args['_id'])
        }
        if(args.search && _.size(args.search)){
            match = {...match,...args['search'] }
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
        console.log("module.exports.get_currencys -> admin_email", admin_email)
        var total = await Currency_model.count({ is_delete: false });
        var pageInfo = { totalDocs: total, page: args.page }
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
            match['country_code'] = ObjectId(args['country_code'])
        }
        if (args['location_code']) {
            match['location_code'] = ObjectId(args['location_code'])
        }
        const currency = await Currency_model.findOne(match).lean()
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
        
        console.log("module.exports.get_parent_currency -> match", match)
        const currency = await Currency_model.findOne(match).lean()
        return currency
    } catch (error) {
        return { "msg": "Error in curreny fetch", status: 'failed' };
    }
}

module.exports.update_currency = async (root, args) => {
    try {
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
        var result = await Currency_model.update({ _id: args._id }, {is_delete:true});
        return { "msg": "delete Process Success", status: 'success' };

    } catch (error) {
        return { "msg": "Error in currency delete", status: 'failed' };
    }
}
