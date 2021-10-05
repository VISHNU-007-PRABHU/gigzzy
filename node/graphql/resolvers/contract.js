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
var Address_model = model.address
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

module.exports.DeleteContractJobFile = async (root, args) => {
    try {
        let { _id } = args;
        if (!_id) {
            return { status: "failed", msg: "Invalid params" }
        }
        let fetch_images = await ContractJobImage_model.findOne({ _id: _id }).lean()
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

exports.uploading_files = async (files, args) => {
    console.log("exports.uploading_files -> files, args", files, args)
    return new Promise(async function (resolve, reject) {
        try {
            _.forEach(files, async (file, i) => {
                if (file) {
                    const { createReadStream, filename } = await file;
                    var extension = filename.split('.').pop();
                    var file_name = `${args['contract_id']}_${moment().valueOf()}_${filename}`;
                    var small_file_name = `${args['contract_id']}_${moment().valueOf()}_${filename}_small.jpg`;
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
                        contract_id: args['contract_id'],
                        small_image: small_file_name,
                        large_image: file_name,
                        image_tag: args['image_tag'] || "",
                        doc_type: extension || "",
                        doc_category: args['category'] || "others",
                    }
                    let add_contract_image_job = new ContractJobImage_model(img_data)
                    let added_contract_images_job = await add_contract_image_job.save()
                }
                if (_.size(files) === i + 1) {
                    return resolve(true)
                }
            })
        } catch (error) {
            reject(false)
        }
    })
}

module.exports.ContractJobFileUpload = async (root, args) => {
    try {
        let files = args['file']
        if (files && _.size(files)) {
            let filesUpload = await this.uploading_files(files, args)
            return { status: "success", msg: "File added success" }
        } else {
            let update_data = {
                doc_category: "others",
            }
            if (args['category']) {
                update_data['doc_category'] = args['category'];
            }
            if (args['image_tag']) {
                update_data['image_tag'] = args['image_tag'];
            }
            let add_contract_image_job = await ContractJobImage_model.updateOne({ _id: args['_id'] }, update_data).exec()
            return { status: "success", msg: "File update success" }
        }
    } catch (error) {
        console.log("module.exports.ContractJobFileUpload -> error", error)
        return { status: "failed", msg: "File upload failed" }
    }
}


module.exports.get_contract_files = async (root, args) => {
    try {
        let match = {
            delete: false
        }
        if (args['contract_id']) {
            match['contract_id'] = ObjectId(args['contract_id'])
        }
        let pipeline = [
            {
                $match: match
            },
            {
                $group: {
                    _id: "$doc_category",
                    images: { $push: "$$ROOT" }
                }
            }
        ]

        let grouped_images = await ContractJobImage_model.aggregate(pipeline)
        return grouped_images
    } catch (error) {
        console.log("module.exports.get_contract_files -> error", error)
        return []
    }
}

module.exports.get_contract_all_files = async (root, args) => {
    try {
        let match = {
            delete: false
        }
        let limit = args.limit || 0
        if (args['contract_id']) {
            match['contract_id'] = ObjectId(args['contract_id'])
        }
        let pipeline = [
            {
                $match: match
            },
            {$limit : limit }
        ]

        let grouped_images = await ContractJobImage_model.aggregate(pipeline)
        if(_.size(grouped_images)){
            return grouped_images
        }else{
            return [{
                small_image:commonHelper.no_image()
            }]
        }
    } catch (error) {
        console.log("module.exports.get_contract_files -> error", error)
        return []
    }
}

module.exports.get_contracts_pagination = async (parent, args, context, info) => {
    try {
        var limit = args.limit || 10;
        var page = args.page || 1;
        var offset = Number(page - 1) * Number(limit);
        var total = 0;
        var result = [];
        let find_query = { is_delete: false }
        if (args['search']) {
            find_query = { ...find_query, ...args['search'] }
        }
        if (args['company_id']) {
            find_query['_id'] = args['company_id']
        }
        if (args['contract_id']) {
            find_query['contract_id'] = args['contract_id']
        }
        if (args.role && args.role == 1 && args['user_id']) {
            find_query['user_id'] = ObjectId(args['user_id'])
        }

        if (args.role && args.role == 2  && args['user_id']) {
            // if (args.booking_status == 12) {
            find_query['available_provider'] = { $ne: [ObjectId(args.user_id)] }
            // } else {
            //     if (args.booking_status == 4) {
            //         find_query['provider_id'] = args._id;
            //         find_query['booking_status'] = { $in: [13, 4] }
            //     } else {
            //             find_query['provider_id'] = args._id ;
            //             find_query['booking_status'] = args.booking_status
            //         }
            //     }
        }

        total = await ContractJob_model.count(find_query);
        result = await ContractJob_model.find(find_query).sort({ created_at: -1 }).skip(Number(offset)).limit(args.limit);
        var pageInfo = { totalDocs: total, page: args.page }
        return { data: result, pageInfo };
    } catch (error) {
        return []
    }
};
module.exports.get_contracts = async (root, args) => {
    try {
        let find_query = { is_delete: false }
        if (args['company_id']) {
            find_query['company_id'] = args['company_id']
        }
        if (args['contract_id']) {
            find_query['_id'] = args['contract_id']
        }
        if (args['user_id']) {
            find_query['user_id'] = args['user_id']
        }
        let grouped_images = await ContractJob_model.find(find_query)
        return grouped_images
    } catch (error) {
        return []
    }
}


module.exports.get_contract_address_detail = async (parent, args, context, info) => {
    try {
        let find_query = {}
        if (root['address_id']) {
            find_query['_id'] = root['address_id']
        }
        console.log("module.exports.get_contract_address_detail -> find_query", find_query)
       let result = await Address_model.findOne(find_query);
        return result;
    } catch (error) {
        return {}
    }
};
/**
 * @info 'add contract job detail's
 * @info global.pubsub.publish('TEST_MSG', { test: { info: { message: "sd", status: "ok" } } });
 * @param {*} root 
 * @param {*} args 
 * @returns 
 */

module.exports.update_contract = async (root, args) => {
    try {
        let contract_detail = args['contract_data'][0]
        if (args['_id']) {
            let find_query = {
                _id: args["_id"]
            }
            let update_bid = await ContractJob_model.updateOne(find_query, contract_detail).exec()
            let fetch_bid = await ContractJob_model.findOne(find_query).lean()
            if (fetch_bid['contract_status'] === "c2") {
                // send notification SMS EMAIL
            }
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
        console.log("module.exports.update_contract -> error", error)
        return { status: "failed", msg: "contract job added failed" }
    }
}

exports.find_provider = async (contract_data) => {
    try {
        // get category data
        if (contract_data['cat']) {
            //  send request with in radius
            var filter = {
                role: 2,
                online: 1,
                delete: 0,
                proof_status: 1,
                location: { $near: { $maxDistance: 10000, $geometry: { type: "Point", coordinates: [args.lng, args.lat] } } },
                provider_subCategoryID: { $in: [args.category_id] },
            };
            let find_provider = await Detail_model.find(filter);
        } else {
            //  send request with al the location
        }
        let response = {}
        response['status'] = "success";
        response['msg'] = "Job sent nearest user"
        return response
    } catch (error) {
        return { status: "failed", msg: "Job failed to send user" }
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

