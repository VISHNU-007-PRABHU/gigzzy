var moment = require("moment");
const model = require('../../model_data');
const _ = require('lodash');
const moment = require('moment');
var Jimp = require('jimp');
var ObjectId = require('mongodb').ObjectID;
var CronJob = require('cron').CronJob;
var commonHelper = require('../commonHelper');
var Category_model = model.category;
var subCategory_model = model.sub_category;
var Detail_model = model.detail;
var Booking_model = model.booking;
var Payout_model = model.payout;
var Extra_model = model.Extra_fee;

module.exports.get_my_biding = async (root, args) => {
    //console.log(args);
    var limits = args.limit || 10;
    var pages = args.page || 1;
    var offset = Number(pages - 1) * Number(limits);
    delete args.limit;
    delete args.page;
    let fetch_query={
    }
    if(args['provider_id']){
        fetch_query['provider_id']= args['provider_id']
    }
    if(args['user_id']){
        fetch_query['user_id']= args['user_id']
    }
  
    var total = await Biding_model.count(fetch_query);
    var pageInfo = { totalDocs: total, page: pages }
    var result = await Biding_model.find(fetch_query).sort({ created_at: -1 }).skip(Number(offset)).limit(Number(limits));
    return { data: result, pageInfo };
}

module.exports.get_biding_detail = async (root, args) => {
    //console.log(args);
    let fetch_query ={
        _id:args['_id']
    }
    var result = await Biding_model.findOne(fetch_query);
    return result;
}


module.exports.get_biding_milestone_detail = async (root, args) => {
    //console.log(args);
    let fetch_query ={
    }
    if(args['_id']){
        _id:args['_id']
    }
    if(args['bid_id']){
        bid_id:args['bid_id']
    }
    var result = await BidingMilestone_model.findOne(fetch_query);
    return result;
}

exports.BidingFileUpload = (id, files) => {
    _.forEach(files, file => {
        if (file) {
            const { createReadStream, filename } = await args.file;
            var file_name = `${id}_${moment().unix()}_${filename}`;
            await new Promise(res =>
                createReadStream().pipe(createWriteStream(path.join(__dirname, "../../images/biding", file_name))).on("close", res)
            );
            args['image'] = file_name;
            var file_resize = await Jimp.read(path.join(__dirname, "../../images/biding", file_name))
                .then(image => {
                    image.resize(260, Jimp.AUTO)
                        .quality(30)
                        .write(path.join(__dirname, "../../images/biding", file_name + "_small.jpg"));
                })
                .catch(err => {
                });
        }
    })
}


module.exports.update_biding = async (root, args) => {
    try {
        let biding_detail = args['biding_detail'][0][0]
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
            let add_bid = new Biding_model(biding_detail)
            let added_bid = await add_bid.save()
            added_bid['status'] = "success";
            added_bid['msg'] = "Biding added success"
            return added_bid
        }
    } catch (error) {
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

