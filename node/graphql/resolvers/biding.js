const model = require('../../model_data');
const _ = require('lodash');
const moment = require('moment');
var Jimp = require('jimp');
var ObjectId = require('mongodb').ObjectID;
var CronJob = require('cron').CronJob;
var commonHelper = require('../commonHelper');
var Biding_model = model.Biding;


module.exports.get_biding_pagination = async (root, args) => {
    console.log(args);
    try {

        var limits = args.limit || 10;
        var pages = args.page || 1;
        var offset = Number(pages - 1) * Number(limits);
        delete args.limit;
        delete args.page;
        let fetch_query = {
            is_delete: false
        }
        if (args['provider_id']) {
            fetch_query['provider_id'] = args['provider_id']
        }
        if (args['user_id']) {
            fetch_query['user_id'] = args['user_id']
        }
        if (args['contract_id']) {
            fetch_query['contract_id'] = args['contract_id']
        }

        var total = await Biding_model.count(fetch_query);
        var pageInfo = { totalDocs: total, page: pages }
        var BidingResult = await Biding_model.find(fetch_query).sort({ created_at: -1 }).skip(Number(offset)).limit(Number(limits));
        console.log("module.exports.get_biding_pagination -> BidingResult", BidingResult)
        return { data: BidingResult, pageInfo };
    } catch (error) {
        console.log("module.exports.get_biding_pagination -> error", error)
        return { data: [], pageInfo: { totalDocs: 0, page: 1 } };

    }
}

module.exports.get_biding_detail = async (root, args) => {
    //console.log(args);
    let fetch_query = {
        _id: args['_id']
    }
    var { } = await Biding_model.findOne(fetch_query);
    return {};
}


module.exports.get_biding_milestone_detail = async (root, args) => {
    //console.log(args);
    let fetch_query = {
    }
    if (args['_id']) {
        _id: args['_id']
    }
    if (args['bid_id']) {
        bid_id: args['bid_id']
    }
    var { } = await BidingMilestone_model.findOne(fetch_query);
    return {};
}

exports.BidingFileUpload = (id, files) => {
    _.forEach(files, file => {
        if (file) {
            // const { createReadStream, filename } = await args.file;
            // var file_name = `${id}_${moment().unix()}_${filename}`;
            // await new Promise(res =>
            //     createReadStream().pipe(createWriteStream(path.join(__dirname, "../../images/biding", file_name))).on("close", res)
            // );
            // args['image'] = file_name;
            // var file_resize = await Jimp.read(path.join(__dirname, "../../images/biding", file_name))
            //     .then(image => {
            //         image.resize(260, Jimp.AUTO)
            //             .quality(30)
            //             .write(path.join(__dirname, "../../images/biding", file_name + "_small.jpg"));
            //     })
            //     .catch(err => {
            //     });
        }
    })
}


module.exports.update_biding = async (root, args) => {
    try {
        let biding_detail = args['biding_data'][0]
        if (args['_id']) {
            let find_query = {
                _id: args["_id"]
            }
            let update_bid = await Biding_model.updateOne(find_query, biding_detail).exec()
            let fetch_bid = await Biding_model.findOne(find_query).lean()
            fetch_bid['status'] = "success";
            fetch_bid['msg'] = "Biding update success"
            return fetch_bid

        } else {
            console.log("module.exports.update_biding -> biding_detail", biding_detail)
            let add_bid = new Biding_model(biding_detail)
            let added_bid = await add_bid.save()
            console.log("module.exports.update_biding -> added_bid", added_bid)
            added_bid['status'] = "success";
            added_bid['msg'] = "Biding added success"
            return added_bid
        }
    } catch (error) {
        console.log("module.exports.update_biding -> error", error)
        return { status: "failed", msg: "Biding added failed" }
    }
}

module.exports.update_biding_milestone = async (root, args) => {
    try {
        let milestone_detail = args['milestone_detail'][0][0]
        if (args['_id']) {
            let find_query = {
                _id: args["_id"]
            }
            let update_milestone = await BidingMilestone_model.updateOne(find_query, milestone_detail).exec()
            let fetch_milestone = await BidingMilestone_model.findOne(find_query).lean()
            fetch_milestone['status'] = "success";
            fetch_milestone['msg'] = "Biding update success"
            return added_bid

        } else {
            let add_milestone = new BidingMilestone_model(biding_detail)
            let added_milestone = await add_milestone.save()
            added_milestone['status'] = "success";
            added_milestone['msg'] = "Biding added success"
            return added_milestone
        }
    } catch (error) {
        return { status: "failed", msg: "Biding added failed" }
    }
}


module.exports.user_accept_biding = async (root, args) => {
    try {
        let user_biding_detail = args['user_biding_detail'][0][0]
        if (args['_id']) {
            let find_query = {
                _id: args["_id"]
            }
            let biding_detail = args['user_biding_detail'][0][0]
            let update_bid = await UserAcceptBiding_model.updateOne(find_query, biding_detail).exec()
            let fetch_bid = await UserAcceptBiding_model.findOne(find_query).lean()
            fetch_bid['status'] = "success";
            fetch_bid['msg'] = "Biding update success"
            return fetch_bid

        } else {
            let add_user_bid = new UserAcceptBiding_model(user_biding_detail)
            let added_user_bid = await add_user_bid.save()
            added_user_bid['status'] = "success";
            added_user_bid['msg'] = "Biding added success"
            return added_user_bid
        }
    } catch (error) {
        return { status: "failed", msg: "Biding added failed" }
    }
}

module.exports.delete_biding = async (root, args) => {
    try {
        if (!args['_id']) {
            return { status: "failed", msg: "Invalid params" }
        }
        let find_query = {
            _id: args["_id"]
        }
        let update_detail = {
            is_delete: false
        }
        let update_bid = await Biding_model.updateOne(find_query, update_detail).exec()
        added_bid['status'] = "success";
        added_bid['msg'] = "Biding deleted success"
    } catch (error) {
        return { status: "failed", msg: "Biding added failed" }
    }
}

