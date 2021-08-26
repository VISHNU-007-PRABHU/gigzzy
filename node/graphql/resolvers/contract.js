const model = require('../../model_data');
const _ = require('lodash');
const moment = require('moment');
var Jimp = require('jimp');
var ObjectId = require('mongodb').ObjectID;
var CronJob = require('cron').CronJob;
var commonHelper = require('../commonHelper');
const message = require('../../model/booking/message');
var Category_model = model.category;
var subCategory_model = model.sub_category;
var Detail_model = model.detail;
var ContractJob_model = model.contract_job;
var ContractJobImage_model = model.contract_job_images;
const { createWriteStream, existsSync, mkdirSync } = require("fs");
const path = require("path");
var fs = require('fs');

module.exports.get_my_biding = async (root, args) => {
    //console.log(args);
    var limits = args.limit || 10;
    var pages = args.page || 1;
    var offset = Number(pages - 1) * Number(limits);
    delete args.limit;
    delete args.page;
    let fetch_query = {
    }
    if (args['provider_id']) {
        fetch_query['provider_id'] = args['provider_id']
    }
    if (args['user_id']) {
        fetch_query['user_id'] = args['user_id']
    }

    var total = await Biding_model.count(fetch_query);
    var pageInfo = { totalDocs: total, page: pages }
    var result = await Biding_model.find(fetch_query).sort({ created_at: -1 }).skip(Number(offset)).limit(Number(limits));
    return { data: result, pageInfo };
}

module.exports.get_biding_detail = async (root, args) => {
    //console.log(args);
    let fetch_query = {
        _id: args['_id']
    }
    var result = await Biding_model.findOne(fetch_query);
    return result;
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
    var result = await BidingMilestone_model.findOne(fetch_query);
    return result;
}

module.exports.DeleteContractJobFile = async (root, args) => {
    try {
        let { _id } = args;
        console.log("module.exports.DeleteContractJobFile -> _id", _id)
        if (!_id) {
            return { status: "failed", msg: "Invalid params" }
        }
        let fetch_images = await ContractJobImage_model.findOne({ _id: _id }).lean()
        console.log("module.exports.DeleteContractJobFile -> fetch_images", fetch_images)
        let image_array = ['small_image', 'large_image']
        _.forEach(image_array, file_data => {
            var file = path.join(__dirname, "../../images/contract", fetch_images[file_data]);
            console.log("module.exports.DeleteContractJobFile -> file", file)
            fs.unlink(file, function (err) { });
        })
        await ContractJobImage_model.updateOne({ _id }, { delete: true }).lean()

        return { status: "success", msg: "file has been deleted success" }

    } catch (error) {
        console.log("module.exports.DeleteContractJobFile -> error", error)
        return { status: "failed", msg: "Delete file has been failed" }
    }
}


module.exports.ContractJobFileUpload = (root, args) => {
    try {
        let { id, contract_id, contract_job_image, type, lable } = args
        console.log(args.data[0])
        if (!_.size(contract_job_image)) {
            return { msg: "Invalid contract_job_image size", status: "failed" }
        }
        _.forEach(contract_job_image, async file => {
            if (file) {
                const { createReadStream, filename } = await file;
                var file_name = `${id}_${moment().valueOf()}_${filename}`;
                var small_file_name = `${id}_${moment().valueOf()}_${filename}_small.jpg`;
                await new Promise(res =>
                    createReadStream().pipe(createWriteStream(path.join(__dirname, "../../images/contract", file_name))).on("close", res)
                );
                args['image'] = file_name;
                var file_resize = await Jimp.read(path.join(__dirname, "../../images/contract", file_name))
                    .then(image => {
                        image.resize(260, Jimp.AUTO)
                            .quality(30)
                            .write(path.join(__dirname, "../../images/contract", small_file_name));
                    })
                    .catch(err => {
                    });

                /**
                 * @info add contract info after file update
                 */
                let img_data = {
                    contract_id: contract_id,
                    small_image: small_file_name,
                    large_image: file_name,
                    image_tag: "Layout plan",
                    doc_type: "pdf",
                    doc_category: "Approvals",
                }
                let add_contract_image_job = new ContractJobImage_model(img_data)
                let added_contract_images_job = await add_contract_image_job.save()
                added_contract_images_job['status'] = "success";
                added_contract_images_job['msg'] = "contract job added success"
                return added_contract_images_job
            }
        })
        return { status: "success", msg: "File upload success" }
    } catch (error) {
        return { status: "failed", msg: "File upload failed" }
    }
}

/**
 * @info 'add contract job detail's
 * @info global.pubsub.publish('TEST_MSG', { test: { info: { message: "sd", status: "ok" } } });
 * @param {*} root 
 * @param {*} args 
 * @returns 
 */

module.exports.update_contract = async (root, args) => {
    try {
        let contract_detail = args['contract_data'][0][0]
        if (args['_id']) {
            let find_query = {
                _id: args["_id"]
            }
            let update_bid = await ContractJob_model.updateOne(find_query, contract_detail).exec()
            let fetch_bid = await ContractJob_model.findOne(find_query).lean()
            fetch_bid['status'] = "success";
            fetch_bid['msg'] = "contract job update success"
            return fetch_bid
        } else {
            let add_contract_job = new ContractJob_model(contract_detail)
            let added_contract_job = await add_contract_job.save()
            added_contract_job['status'] = "success";
            added_contract_job['msg'] = "contract job added success"
            return added_contract_job
        }
    } catch (error) {
        return { status: "failed", msg: "contract job added failed" }
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

