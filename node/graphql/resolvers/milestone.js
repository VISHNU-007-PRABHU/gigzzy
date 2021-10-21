const model = require('../../model_data');
const _ = require('lodash');
const moment = require('moment');
var Jimp = require('jimp');
var ObjectId = require('mongodb').ObjectID;
var CronJob = require('cron').CronJob;
var commonHelper = require('../commonHelper');
var contractResolver = require('../resolvers/contract');
const payment_choose = require('../payment/choose')
const PushNotification = require('../notification/PushNotification')
const { createWriteStream, existsSync, mkdirSync } = require("fs");
const path = require("path");
var fs = require('fs');
var Biding_model = model.Biding;
var BidingImage_model = model.BidingImage;
var BidingMilestone_model = model.Milestone;
var MilestoneImage_model = model.MilestoneImage
var ContractJob_model = model.contract_job


module.exports.get_biding_milestone_detail = async (root, args) => {
    try {
        let fetch_query = {}
        if (args['_id']) {
            fetch_query['_id'] = args['_id']
        }
        if (args['biding_id']) {
            fetch_query['biding_id'] = args['biding_id']
        }
        if (args['contract_id']) {
            fetch_query['contract_id'] = args['contract_id']
        }
        var final_result = await BidingMilestone_model.findOne(fetch_query).lean();
        return final_result
    } catch (err) {
        return { msg: "fecth error", status: "failed" };
    }
}

module.exports.get_biding_milestone = async (root, args) => {
    //console.log(args);
    try {

        let fetch_query = {
            is_delete:false
        }
        if (args['_id']) {
            fetch_query['_id'] = args['_id']
        }
        if (args['biding_id']) {
            fetch_query['biding_id'] = args['biding_id']
        }
        if (args['contract_id']) {
            fetch_query['contract_id'] = args['contract_id']
        }

        let sort = {
            order: 1,
            created_at: 1
        }
        var data = await BidingMilestone_model.find(fetch_query).sort(sort);
        return data;
    } catch (error) {
        return []
    }

}

module.exports.delete_milestone = async (root, args) => {
    try {
        let find_query = {
            _id: args["_id"]
        }
        let update_detail = {
            is_delete: true
        }
        await BidingMilestone_model.updateOne(find_query, update_detail).exec()
        return { status: "success", msg: "Milestone removed success" }
    } catch (error) {
        return { status: "failed", msg: "Milestone removed failed" }
    }
}

module.exports.delete_milestone_image = async (root, args) => {
    try {
        let find_query = {
            _id: args["_id"]
        }
        let update_detail = {
            delete: true
        }
        await MilestoneImage_model.updateOne(find_query, update_detail).exec()
        return { status: "success", msg: "Milestone images removed success" }
    } catch (error) {
        return { status: "failed", msg: "Milestone images removed failed" }
    }
}

exports.get_milestone_all_images = async (root, args) => {
    try {
        let match = {
            delete: false
        }

        if (args.root) {
            if (root['_id']) {
                match['milestone_id'] = ObjectId(root['_id'])
            }
        }
        let pipeline = [
            {
                $match: match
            },
        ]

        let grouped_images = await MilestoneImage_model.aggregate(pipeline)
        return grouped_images
    } catch (error) {
        console.log("module.exports.get_biding_files -> error", error)
        return []
    }
}
module.exports.update_milestone = async (root, args) => {
    try {
        let files = args['file']
        let update_detail = args['milestone_data'][0]
        if (update_detail['_id']) {
            let find_query = {
                _id: update_detail["_id"]
            }
            await BidingMilestone_model.updateOne(find_query, update_detail).exec()
            if (files && _.size(files)) {
                args['milestone_id'] = update_detail['_id']
                await this.uploading_milestone_files(files, args)
            }
            // if (args['booking_status'] === 9 && update_detail['biding_id']) {
            //     await Biding_model.updateOne({ _id: update_detail['biding_id'] }, { milestone_status: 9, current_milestone_id: args['_id'] }).exec()
            // }
            let fetch_bid = await BidingMilestone_model.findOne(find_query).lean()
            fetch_bid['status'] = "success";
            fetch_bid['msg'] = "Milestone update success"
            return fetch_bid

        } else {
            let get_current_user_currency = await contractResolver.get_current_user_currency(args);
            if (_.size(get_current_user_currency) && get_current_user_currency.status) {
                update_detail = { ...update_detail, ...get_current_user_currency }
            }
            let get_mpesa_reference = await contractResolver.genrate_mpesa_ref(args);
            if (_.size(get_mpesa_reference) && get_mpesa_reference.status) {
                update_detail = { ...update_detail, ...get_mpesa_reference }
            }
            let add_bid = new BidingMilestone_model(update_detail)
            let added_bid = await add_bid.save()
            if (files && _.size(files)) {
                args['milestone_id'] = added_bid['_id']
                await this.uploading_milestone_files(files, args)
            }
            // if (args['booking_status'] === 9 && update_detail['biding_id']) {
            //     await Biding_model.updateOne({ _id: update_detail['biding_id'] }, { milestone_status: 9, current_milestone_id: added_bid['_id'] }).exec()
            // }
            added_bid['status'] = "success";
            added_bid['msg'] = "Milestone added success"
            return added_bid
        }
    } catch (error) {
        console.log("module.exports.update_biding -> error", error)
        return { status: "failed", msg: "Milestone added failed" }
    }
}


exports.uploading_milestone_files = async (files, args) => {
    return new Promise(async function (resolve, reject) {
        try {
            _.forEach(files, async (file, i) => {
                if (file) {
                    const { createReadStream, filename } = await file;
                    var extension = filename.split('.').pop();
                    var file_name = `${args['milestone_id']}_${moment().valueOf()}_${filename}`;
                    var small_file_name = `${args['milestone_id']}_${moment().valueOf()}_${filename}_small.jpg`;
                    await new Promise(res =>
                        createReadStream().pipe(createWriteStream(path.join(__dirname, "../../images/milestone", file_name))).on("close", res)
                    );
                    args['image'] = file_name;
                    var file_resize = await Jimp.read(path.join(__dirname, "../../images/milestone", file_name))
                        .then(image => {
                            image.resize(260, Jimp.AUTO)
                                .quality(30)
                                .write(path.join(__dirname, "../../images/milestone", small_file_name));
                        })
                        .catch(err => {
                        });

                    /**
                     * @info add biding info after file update
                     */
                    let img_data = {
                        milestone_id: args['milestone_id'],
                        small_image: small_file_name,
                        large_image: file_name,
                        // image_tag: args['image_tag'] || "",
                        doc_type: extension || "",
                        // doc_category: args['category'] || "others",
                    }
                    let add_biding_image_job = new MilestoneImage_model(img_data)
                    await add_biding_image_job.save()
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


/**
 * 
 * @param {*} root 
 * @param {*} args  {contract_id,user_id,biding_id,booking_status,payment_option,payment_type}
 * @param {*} args  {location_code}
 */
exports.manage_milestone_booking = async (root, args) => {
    try {
        let preview_milestone_data = await BidingMilestone_model.findOne({ _id: args._id }).lean()

        if (args.milestones_status === 9) {
            let update_detail = {
                title: "start",
                description: "Start the contract based on teams & condition",
                booking_status: 9,
            }
            if(args['contract_id']){
                update_detail['contract_id'] = args['contract_id']
            }
            if(args['biding_id']){
                update_detail['biding_id'] = args['biding_id']
            }
            let add_start_milestone = new BidingMilestone_model(update_detail)
            await add_start_milestone.save()
            await ContractJob_model.updateOne({ _id: args['contract_id'] }, { milestones_status:9, booking_status: commonHelper.bookink_status.PENDING }).exec()
            add_start_milestone['msg'] = "contract milestone updated has been started";
            add_start_milestone['status'] = 'success';
            return add_start_milestone
        } else if (args.booking_status === 9) {
            await BidingMilestone_model.updateOne({ _id: args._id }, { booking_status: 14, end_date: moment.utc().format() }).exec()    
            await ContractJob_model.updateOne({ _id: args['contract_id'] }, { milestones_status:10,booking_status: commonHelper.bookink_status.START }).exec()
            //send notification
            let findBooking = {}
            findBooking['msg'] = "contract has been started";
            findBooking['status'] = 'success';
            return findBooking
        } else if (args.booking_status === 10 && preview_milestone_data.booking_status === 9) {
            if (!preview_milestone_data.pay_option) {
                await BidingMilestone_model.updateOne({ _id: args._id }, { booking_status: 14, end_date: moment.utc().format() }).exec()
                var findBooking = await BidingMilestone_model.findOne({ _id: args._id }).lean();
                findBooking['user_parent'] = true;
                findBooking['msg'] = "user paid the milestone";
                findBooking['status'] = 'success';
                return findBooking
            } else {
                args['amount'] = preview_milestone_data['budget'];
                let payment_data = await payment_choose.choose_milestone_payment(args, preview_milestone_data)
                if (payment_data.status) {
                    var findBooking = await BidingMilestone_model.findOne({ _id: args._id }).lean();
                    findBooking['user_parent'] = true;
                    findBooking['msg'] = "user paid the milestone";
                    findBooking['status'] = 'success';
                    return findBooking
                } else {
                    return { msg: "Milestone Payment failed", status: 'failed' }
                }
            }
        } else if (args.booking_status === 14) {
            let update_detail = {
                title: "Complete",
                description: "Completed the contract based on teams & condition",
                booking_status: 14,
            }
            if(args['contract_id']){
                update_detail['contract_id'] = args['contract_id']
            }
            if(args['biding_id']){
                update_detail['biding_id'] = args['biding_id']
            }
            let add_start_milestone = new BidingMilestone_model(update_detail)
            await add_start_milestone.save()
            await ContractJob_model.updateOne({ _id: args['contract_id'] }, { milestones_status:14,booking_status: commonHelper.bookink_status.COMPLETE }).exec()
            //send notification
            let findBooking = {}
            findBooking['msg'] = "contract has been started";
            findBooking['status'] = 'success';
        } else {
            return { msg: "Milestone Payment failed", status: 'failed' }
        }
    } catch (error) {
        console.log("exports.manage_Milestone_booking -> error", error)
        return { msg: "Milestone Payment failed", status: 'failed' }
    }
}