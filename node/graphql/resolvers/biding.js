const model = require('../../model_data');
const _ = require('lodash');
const moment = require('moment');
var Jimp = require('jimp');
var ObjectId = require('mongodb').ObjectID;
var CronJob = require('cron').CronJob;
var commonHelper = require('../commonHelper');
var Biding_model = model.Biding;
var BidingImage_model = model.BidingImage;
var BidingMilestone_model = model.Milestone;

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

        let sort = { created_at: 1 }

        if (args.created_at_sort) {
            sort["created_at"] = args['created_at_sort']
        } else if (args.budget_sort) {
            sort["budget"] = args['budget_sort']
        } else if (args.review_sort) {
            sort["review"] = args['review_sort']
        }

        var total = await Biding_model.count(fetch_query);
        var pageInfo = { totalDocs: total, page: pages }
        var BidingResult = await Biding_model.find(fetch_query).sort(sort).skip(Number(offset)).limit(Number(limits));
        return { data: BidingResult, pageInfo };
    } catch (error) {
        return { data: [], pageInfo: { totalDocs: 0, page: 1 } };

    }
}

module.exports.biding_count = async (root, args) => {
    try {
        return await Biding_model.count({ contract_id: root._id });
    } catch (error) {
        return 0
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



exports.uploading_files = async (files, args) => {
    return new Promise(async function (resolve, reject) {
        try {
            _.forEach(files, async (file, i) => {
                if (file) {
                    const { createReadStream, filename } = await file;
                    var extension = filename.split('.').pop();
                    var file_name = `${args['biding_id']}_${moment().valueOf()}_${filename}`;
                    var small_file_name = `${args['biding_id']}_${moment().valueOf()}_${filename}_small.jpg`;
                    await new Promise(res =>
                        createReadStream().pipe(createWriteStream(path.join(__dirname, "../../images/biding", file_name))).on("close", res)
                    );
                    args['image'] = file_name;
                    var file_resize = await Jimp.read(path.join(__dirname, "../../images/biding", file_name))
                        .then(image => {
                            image.resize(260, Jimp.AUTO)
                                .quality(30)
                                .write(path.join(__dirname, "../../images/biding", small_file_name));
                        })
                        .catch(err => {
                        });

                    /**
                     * @info add biding info after file update
                     */
                    let img_data = {
                        biding_id: args['biding_id'],
                        small_image: small_file_name,
                        large_image: file_name,
                        // image_tag: args['image_tag'] || "",
                        doc_type: extension || "",
                        // doc_category: args['category'] || "others",
                    }
                    let add_biding_image_job = new BidingImage_model(img_data)
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


exports.BidingFileUpload = async (id, files) => {
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
            let add_biding_image_job = await BidingImage_model.updateOne({ _id: args['_id'] }, update_data).exec()
            return { status: "success", msg: "File update success" }
        }
    } catch (error) {
        console.log("module.exports.BidingFileUpload -> error", error)
        return { status: "failed", msg: "File upload failed" }
    }
}

module.exports.update_biding = async (root, args) => {
    try {
        let files = args['file']
        let biding_detail = args['biding_data'][0]
        if (args['_id']) {
            let find_query = {
                _id: args["_id"]
            }
            let update_bid = await Biding_model.updateOne(find_query, biding_detail).exec()
            if (files && _.size(files)) {
                args['biding_id'] = args['_id']
                let filesUpload = await this.uploading_files(files, args)
            }
            let fetch_bid = await Biding_model.findOne(find_query).lean()
            fetch_bid['status'] = "success";
            fetch_bid['msg'] = "Biding update success"
            return fetch_bid

        } else {
            console.log("module.exports.update_biding -> biding_detail", biding_detail)
            biding_detail['service_fee'] = "20"
            let add_bid = new Biding_model(biding_detail)
            let added_bid = await add_bid.save()
            if (files && _.size(files)) {
                args['biding_id'] = added_bid['_id']
                let filesUpload = await this.uploading_files(files, args)
            }
            added_bid['status'] = "success";
            added_bid['msg'] = "Biding added success"
            return added_bid
        }
    } catch (error) {
        console.log("module.exports.update_biding -> error", error)
        return { status: "failed", msg: "Biding added failed" }
    }
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



module.exports.get_biding_milestone = async (root, args) => {
    //console.log(args);
    try {

        let fetch_query = {
        }
        if (args['_id']) {
            _id: args['_id']
        }
        if (args['bid_id']) {
            biding_id: args['biding_id']
        }
        var data = await BidingMilestone_model.find(fetch_query);
        return data;
    } catch (error) {
        return []
    }

}


module.exports.update_milestone = async (root, args) => {
    try {
        let milestone_detail = args['milestone_detail']

        if (args['_id']) {
            let find_query = {
                _id: args["_id"]
            }
            let update_milestone = await BidingMilestone_model.updateOne(find_query, milestone_detail[0]).exec()
            let fetch_milestone = await BidingMilestone_model.find(find_query)
            return fetch_milestone

        } else {
            let inputdata = _.size(milestone_detail)
            for (let i = 0; i < inputdata; i++) {
                let add_milestone = new BidingMilestone_model(milestone_detail[i])
                await add_milestone.save()
            }
            let find_query = {
                biding_id: args['_id']
            }
            let fetch_milestone = await BidingMilestone_model.find(find_query)
            return fetch_milestone
        }
    } catch (error) {
        return { status: "failed", msg: "Biding added failed" }
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

module.exports.get_biding_files = async (root, args) => {
    try {
        let match = {
            delete: false
        }
        if (args['biding_id']) {
            match['biding_id'] = ObjectId(args['biding_id'])
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

        let grouped_images = await BidingImage_model.aggregate(pipeline)
        return grouped_images
    } catch (error) {
        console.log("module.exports.get_biding_files -> error", error)
        return []
    }
}

module.exports.get_biding_all_files = async (root, args) => {
    try {
        let match = {
            delete: false
        }

        if (args.root) {
            if (root['_id']) {
                match['biding_id'] = ObjectId(root['_id'])
            }
        } else {
            if (args['biding_id']) {
                match['biding_id'] = ObjectId(args['biding_id'])
            }
        }
        let pipeline = [
            {
                $match: match
            },
        ]

        console.log("module.exports.get_biding_all_files -> pipeline", pipeline)
        let grouped_images = await BidingImage_model.aggregate(pipeline)
        return grouped_images
    } catch (error) {
        console.log("module.exports.get_biding_files -> error", error)
        return []
    }
}

