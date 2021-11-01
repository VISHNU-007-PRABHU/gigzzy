const model = require('../../model_data');
const _ = require('lodash');
const moment = require('moment');
var Jimp = require('jimp');
var ObjectId = require('mongodb').ObjectID;
var CronJob = require('cron').CronJob;
var commonHelper = require('../commonHelper');
const { createWriteStream, existsSync, mkdirSync } = require("fs");
const payment_choose = require('../payment/choose')
const PushNotification = require('../notification/PushNotification')
const ContractPayoutNotificationModule = require('../payment/ContractPayoutNotification')
var getDistanceBetweenPoints = require('get-distance-between-points');
const path = require("path");
var fs = require('fs');
var Category_model = model.category;
var subCategory_model = model.sub_category;
var Detail_model = model.detail;
var ContractJob_model = model.contract_job;
var ContractJobImage_model = model.contract_job_images;
var Address_model = model.address
var Biding_model = model.Biding
var BidingMilestone_model = model.Milestone
var CategoryCurrency_model = model.CategoryCurrency;
var Currency_model = model.currency;
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
        let limit = args.limit || 1

        if (args.root) {
            match['contract_id'] = ObjectId(root['_id'])
        } else {
            if (args['contract_id']) {
                match['contract_id'] = ObjectId(args['contract_id'])
            }
        }
        if (args['image_type'] === "image") {
            match['doc_type'] = { $ne: 'pdf' }
        }

        let pipeline = [
            {
                $match: match
            },
        ]

        let grouped_images = await ContractJobImage_model.aggregate(pipeline)
        if (_.size(grouped_images)) {
            if (args.limit) {
                return _.take(grouped_images, limit)
            } else {
                return grouped_images
            }
        } else {
            return [{ small_image: '' }]
        }
    } catch (error) {
        console.log("module.exports.get_contract_files -> error", error)
        return [{ small_image: '' }]
    }
}

module.exports.get_contracts_pagination = async (parent, args, context, info) => {
    try {
        var limit = Number(args.limit) || 10;
        var page = args.page || 1;
        var offset = Number(page - 1) * Number(limit);
        var total = 0;
        let find_query = {
            is_delete: false,
            close_date: { $gte: moment() }
        }
        let sort_option = {
            created_at: -1
        }

        if (args.rating_sort) {
            sort_option['rating'] = args.rating_sort
        } else if (args.budget_sort) {
            sort_option['budget'] = args.budget_sort
        }

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

        if (args.role && args.role == 2 && args['provider_id']) {
            if (args['booking_status'] && args['booking_status'] === commonHelper.booking_status.ACCEPT) {
                if (args['page_option'] && args['page_option'] === "bids") {
                    find_query['applied_provider'] = { $in: [args.provider_id] }
                } else {
                    find_query['available_provider'] = { $in: [args.provider_id] }
                }
            } else {
                find_query['provider_id'] = ObjectId(args['provider_id'])
            }
        }
        if (args['booking_status']) {
            if (args.booking_status === commonHelper.booking_status.START) {
                find_query['booking_status'] = { $in: [commonHelper.booking_status.END, commonHelper.booking_status.START] }
            } else if (args.role == 1 && args.booking_status === commonHelper.booking_status.ACCEPT) {
                find_query['booking_status'] = { $in: [commonHelper.booking_status.ACCEPT, commonHelper.booking_status.WAITING_ADMIN] }
            } else if (args.booking_status === commonHelper.booking_status.COMPLETE) {
                find_query['booking_status'] = { $in: [commonHelper.booking_status.COMPLETE, commonHelper.booking_status.CANCEL] }
            } else {
                find_query['booking_status'] = args['booking_status']
            }
        }

        total = await ContractJob_model.count(find_query);
        let result = await ContractJob_model.find(find_query).sort(sort_option).skip(Number(offset)).limit(Number(limit));
        var pageInfo = { totalDocs: total, page: args.page }
        return { data: result, pageInfo };
    } catch (error) {
        console.log("module.exports.get_contracts_pagination -> error", error)
        return { data: [], pageInfo: { totalDocs: 0, page: 1 } };
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


module.exports.get_contract_address_detail = async (root, args, context, info) => {
    try {
        let find_query = {}
        if (root['address_id']) {
            find_query['_id'] = root['address_id']
        }
        let result = await Address_model.findOne(find_query);
        return result;
    } catch (error) {
        return {}
    }
};
/**
 * @info 'add contract job detail's
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
            let get_current_user_currency = await this.get_current_user_currency(args);
            if (_.size(get_current_user_currency) && get_current_user_currency.status) {
                contract_detail = { ...contract_detail, ...get_current_user_currency }
            }
            if (contract_detail['category_id']) {
                let get_category = await this.get_catgeory_data(contract_detail);
                if (get_category && get_category['status']) {
                    let close_day = get_category['contract_close_day'] || 5;
                    contract_detail['close_date'] = moment().add(close_day, 'days');
                }
            }
            await ContractJob_model.updateOne(find_query, contract_detail).exec()
            let fetch_contract = await ContractJob_model.findOne(find_query).lean()
            fetch_contract['status'] = "success";
            fetch_contract['msg'] = "contract job update success"
            return fetch_contract
        } else {
            contract_detail['location'] = { coordinates: [args.lng, args.lat] }
            contract_detail['booking_ref'] = String(Math.floor(1000 + Math.random() * 9000));
            contract_detail['base_price'] = String(parseFloat(contract_detail.budget).toFixed(2));
            contract_detail['job_status'] = 12;
            contract_detail['booking_status'] = 15
            contract_detail['contract_status'] = 15
            if (contract_detail['category_id']) {
                let get_category = await this.get_catgeory_data(contract_detail);
                if (get_category && get_category['status']) {
                    let close_day = get_category['contract_close_day'] || 5;
                    contract_detail['close_date'] = moment().add(close_day, 'days');
                }
            }
            contract_detail['contract_status'] = 9
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


exports.get_catgeory_data = async (detail) => {
    return new Promise(async function (resolve, reject) {
        try {
            let response = {
                status: true
            }
            var category_data = {}
            if (detail.category_type === 1) {
                category_data = await Category_model.findOne({ _id: detail.category_id }).lean()
            } else if (detail.category_type === 2) {
                category_data = await subCategory_model.findOne({ _id: detail.category_id }).lean()
            }
            category_data['status'] = true
            return resolve(category_data)
        } catch (error) {
            return reject({ status: false })
        }
    })
}

exports.get_admin_fee = async (detail) => {
    return new Promise(async function (resolve, reject) {
        try {
            let response = {
                status: true
            }
            var category_data = {}
            if (detail.category_type === 1) {
                category_data = await Category_model.findOne({ _id: detail.category_id }).lean()
            } else if (detail.category_type === 2) {
                category_data = await subCategory_model.findOne({ _id: detail.category_id }).lean()
            }
            let admin_fee = 0;
            let service_fee = 15;
            if (_.size(category_data) && category_data['service_fee']) {
                service_fee = category_data['service_fee']
            }
            admin_fee = (service_fee / 100) * detail['budget'];
            if (admin_fee < 1) {
                admin_fee = 1
            }
            response['admin_fee'] = String(parseFloat(admin_fee || 0).toFixed(2));
            response['service_fee'] = String(parseFloat(service_fee || 0).toFixed(2));
            return resolve(response)
        } catch (error) {
            return reject({ status: false })
        }
    })
}
exports.get_current_user_currency = async (args) => {
    return new Promise(async function (resolve, reject) {
        try {
            let comman_currency = {
                status: true
            }
            var default_currency = await Currency_model.findOne({ default_currency: 1, is_delete: false }).lean()
            comman_currency['default_currency_rate'] = default_currency.rate;

            if (args.local_location_code) {
                var local_currency = await Currency_model.findOne({ location: args.local_location_code }).lean()
                if (!_.size(local_currency)) {
                    return { msg: "invalid location code", status: "failed" }
                } else {
                    comman_currency['currency_id'] = local_currency._id;
                    comman_currency['symbol'] = local_currency.symbol || "";
                    comman_currency['currency_detail'] = local_currency;
                    comman_currency['currenct_local_rate'] = local_currency.rate;
                }
            }
            return resolve(comman_currency)
        } catch (error) {
            console.log("exports.get_current_user_currency -> error", error)
            return reject({ status: false })
        }
    })
}


exports.genrate_mpesa_ref = async (args) => {
    try {
        let mpesa_detail = { status: true }
        var random = Math.floor(Math.random() * 90000) + 10000;
        var chars = "abcdefghijklmnopqrstufwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890"
        var random = _.join(_.sampleSize(chars, 20), "")
        var digit = `${random}`;
        var check_p_id = await model.contract_job.find({ "ctob_billRef": digit });
        if (check_p_id.length) {
            await this.genrate_mpesa_ref()
        }
        mpesa_detail['ctob_shotcode'] = process.env.MPESA_SHORT_CODE;
        mpesa_detail['ctob_billRef'] = digit
        return mpesa_detail
    } catch (error) {
        let error_mpesa_detail = { status: false }
        error_mpesa_detail['ctob_shotcode'] = process.env.MPESA_SHORT_CODE;
        error_mpesa_detail['ctob_billRef'] = "00000000000"
        return error_mpesa_detail
    }
}

/**
 * @info global.pubsub.publish('TEST_MSG', { test: { info: { message: "sd", status: "ok" } } });
 * @param {*} contract_data 
 * @returns 
 */
exports.find_provider = async (contract_data, address) => {
    try {

        var filter = {
            role: 2,
            delete: 0,
            proof_status: 1,
            provider_subCategoryID: { $in: [contract_data.category_id] },
            // location: { $near: { $maxDistance: 81 * 1000, $geometry: { type: "Point", coordinates: [parseFloat(address.lng), parseFloat(address.lat)] } } },
        };
        let find_provider_data = await Detail_model.find(filter);
        console.log("exports.find_provider -> find_provider_data", _.size(find_provider_data))
        var available_provider = []
        let notification_user_data = []
        for (let i = 0; i < find_provider_data.length; i++) {
            available_provider.push(find_provider_data[i]._id);
            notification_user_data.push({
                user_id: find_provider_data[i]._id,
                booking_id: contract_data._id,
                booking_status: 9
            })
        }
        await PushNotification.create_push_notification_msg(notification_user_data);
        contract_data['available_provider'] = available_provider;
        contract_data['user_parent'] = true;
        await ContractJob_model.updateOne({ _id: contract_data['_id'] }, { available_provider }).exec()
        global.pubsub.publish('SEND_CONTRACT_JOB_MSG', { send_contract_jobs_provider: contract_data });
        return { status: "success", msg: "Job socket notification sent success" }
    } catch (error) {
        console.log("exports.find_provider -> error", error)
        return { status: "failed", msg: "Job socket notification sent failed" }
    }
}



module.exports.user_accept_biding = async (root, args) => {
    try {
        let user_biding_detail = args['user_biding_detail'][0]
        if (args['_id']) {
            let find_query = {
                _id: args["_id"]
            }
            let biding_detail = args['user_biding_detail'][0]
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


/**
 * 
 * @param {*} root 
 * @param {*} args  {contract_id,user_id,biding_id,booking_status,payment_option,payment_type}
 * @param {*} args  {location_code}
 */
exports.manage_contract_booking = async (root, args) => {
    try {
        if (args['booking_status'] === commonHelper.booking_status.CANCEL) {
            await Biding_model.updateOne({ _id: args.biding_id }, { is_delete: true });
            return { msg: "Contract rejected success", status: 'failed' }
        } else if (args['booking_status'] === commonHelper.booking_status.ACCEPT) {
            let update_contract_data = {
                booking_status: 9
            }
            await this.update_contract_status(args, update_contract_data)

            let fetch_contract = await ContractJob_model.findOne({ _id: args.contract_id }).lean()
            let address = await Address_model.findOne({ _id: fetch_contract.address_id }).lean()
            await this.find_provider(fetch_contract, address)
            return { msg: "Contract updated success", status: 'success' }
        } else if (args['booking_status'] === 10) {
            let preview_contract_data = await ContractJob_model.findOne({ _id: args.contract_id }).lean()
            let biding = await Biding_model.findOne({ _id: args.biding_id }).lean()

            if (args.booking_status === 10 && preview_contract_data.booking_status === 9) {
                let removed_users = [
                    ...preview_contract_data.applied_provider,
                    ...preview_contract_data.available_provider
                ]
                let update_contract_data = {
                    biding_id: args['biding_id'],
                    provider_id: biding['provider_id'],
                    accept_date: moment.utc().format(),
                    booking_status: 10,
                    job_status: 10,
                    payment_status: 1,
                    applied_provider: [],
                    available_provider: []
                }

                let biding_data = {
                    booking_status: 10,
                    payment_status: "paid"
                }

                let update_contract_res = await this.update_contract_status(args, update_contract_data)
                let update_biding_res = await this.update_biding_status(args, biding_data)
                var findBooking = await ContractJob_model.findOne({ _id: args.contract_id }).lean();
                findBooking['user_parent'] = true;
                findBooking['msg'] = "user accept the contract";
                findBooking['status'] = 'success';
                findBooking['removed_users'] = removed_users;
                await ContractPayoutNotificationModule.accept_payout_notification(findBooking)
                return findBooking

            } else {
                return { msg: "Contract update failed", status: 'failed' }
            }
        } else if (args['booking_status'] === 4) {
            let input_data = {
                booking_status: 4
            }
            var update_contract_status = await this.update_contract_status(args, input_data);
            var findBooking = await ContractJob_model.findOne({ _id: args.contract_id }).lean();
            findBooking['user_parent'] = true;
            findBooking['msg'] = "start the contract";
            findBooking['status'] = 'success';
            return findBooking
        } else if (args['booking_status'] === 13) {
            let input_data = {
                booking_status: 13
            }
            var update_contract_status = await this.update_contract_status(args, input_data);
            var findBooking = await ContractJob_model.findOne({ _id: args.contract_id }).lean();
            findBooking['user_parent'] = true;
            findBooking['msg'] = "start the contract";
            findBooking['status'] = 'success';
            return findBooking
        }

    } catch (error) {
        console.log("exports.manage_contract_booking -> error", error)
        return { msg: "Contract update process failed", status: 'failed' }
    }
}

exports.update_contract_status = async (args, data) => {
    return new Promise(async function (resolve, reject) {
        try {
            await ContractJob_model.updateOne({ _id: args.contract_id }, data, { new: true }).exec()
            return resolve(true)
        } catch (error) {
            return reject(false)
        }
    })
}
exports.update_biding_status = async (args, data) => {
    return new Promise(async function (resolve, reject) {
        try {
            await Biding_model.updateOne({ _id: args.biding_id }, data, { new: true }).exec();
            return resolve(true)
        } catch (error) {
            return reject(false)
        }
    })
}

exports.manage_milestone_booking = async (root, args) => {
    try {
    } catch (error) {
        console.log("exports.manage_contract_booking -> error", error)
        return { msg: "Contract Payment failed", status: 'failed' }
    }
}

exports.update_milestone_status = async (args, data) => {
    return new Promise(async function (resolve, reject) {
        try {
            await BidingMilestone_model.updateOne({ _id: args.milestone_id }, data)
            return resolve(true)
        } catch (error) {
            return reject(false)
        }
    })
}

exports.find_kilometer = async (parent, args) => {
    try {
        var result = await ContractJob_model.findOne({ _id: parent._id });
        var address = await Address_model.findOne({ _id: result['address_id'] });

        if (_.size(address) && address.lat && address.lng && args.lat && args.lng) {
            if (args.lat == address['lat'] && args.lng == address['lng']) {
                return { kilometre: 0 };
            } else {

                var distanceInMeters = getDistanceBetweenPoints.getDistanceBetweenPoints(
                    address.lat, address.lng, // Lat, Long of point A
                    args.lat, args.lng// Lat, Long of point B
                );
                if (distanceInMeters) {
                    return { kilometre: String(parseFloat(distanceInMeters * 0.001).toFixed(2)) };
                } else {
                    return { kilometre: 0 }
                }
            }
        } else {
            return { kilometre: 0 };
        }

    } catch (error) {
        console.log("module.exports.kilometer -> error", error)
        return { kilometre: 0 };
    }
}