const model = require('../../model_data');
const moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
const { createWriteStream, existsSync, mkdirSync, fs } = require("fs");
var Jimp = require('jimp');
const path = require("path");
const _ = require("lodash");
var commonHelper = require('../commonHelper');
var CommonFunction = require('../CommonFunction');
var saf = require('../safaricom');
const dotenv = require('dotenv');
var getDistanceBetweenPoints = require('get-distance-between-points');
const { pipeline } = require('stream');
const { match } = require('assert');
dotenv.config();

const files = [];
var User_model = model.user;
var Status_model = model.status;
var Detail_model = model.detail;
var Booking_model = model.booking;
var Address_model = model.address;
var Company_model = model.company;
var CompanyImage_model = model.company_images;
var CompanyProvider_model = model.companyProvider;
var DetailImage_model = model.DetailImage
module.exports.testmail = async (parent, args, context, info) => {
    return {
        msg: "test"
    }
}

module.exports.testinfmail = async (parent, args, context, info) => {
    try {
        // let data = await saf.safaricom_ctob_register();
        let data = {
            currency_code: 'EUR',
            convert_code: 'INR',
            amount: "500"
        }
        const ContractPayoutNotificationModule = require('../payment/ContractPayoutNotification')

        let contract_data = { _id: "6164360ccf243632f2547145" }
        ContractPayoutNotificationModule.accept_payout_notification(contract_data)
        console.log("module.exports.testinfmail -> contract_data", contract_data)
        //    let result = await CommonFunction.currency_calculation(data)
        //    console.log("module.exports.testinfmail -> result", result)
        // let user_detail ={
        //     country_code:91,
        //     phone_no:9894177165
        // }
        // await commonHelper.send_sms(user_detail.country_code, user_detail.phone_no, "scheduled_job", {})

        // let data = await saf.safaricom_lipesa_simulate('254705924459',"20");
        // let data =  await saf.safaricom_ctob_simulate('254705924459',"20")
        // console.log("module.exports.testinfmail -> data", data)
        // let msg = "testing email template"
        // let otp = 9890
        // var send_verification = await commonHelper.send_mail_sendgrid("vishnu@waioz.com", "otp", {otp});
        // console.log("module.exports.testinfmail -> send_verification", send_verification)

        // let chargePayment = await commonHelper.send_sms("254","705924459","otp",{otp:9213})
        // console.log("module.exports.testinfmail -> chargePayment", chargePayment)
        return { price: "500" };
    } catch (error) {
        // console.log("module.exports.testinfmail -> error", error)
        return { msg: error.msg };
    }
};
// find user (based on data)
module.exports.user = async (parent, args, context, info) => {
    //console.log('user-parent');
    //console.log(parent);
    var result;
    if (parent ? parent.user_parent : false) {
        result = await Detail_model.find({ _id: parent.user_id });
    } else {
        args.delete = 0;
        result = await Detail_model.find(args);
    }
    return result;
};

// find user (based on data)
module.exports.delete_all_user = async (parent, args, context, info) => {

    await Detail_model.remove({});
    return { status: "false", msg: "ops" };
};


module.exports.confirm_email = async (parent, args, context, info) => {
    var data = args;
    var len = 12;
    data.delete = 0;
    var data_count = await Detail_model.count(data);
    if (data_count > 0) {
        var result = await Detail_model.findOne(data);
        let msg = parseInt((Math.random() * 9 + 1) * Math.pow(10, len - 1), 10);
        let link = `<a> ${process.env.APP_URL}/confrim_password/${msg}</a>`;
        var update_reset_link = await Detail_model.updateOne({ _id: result._id }, { email_reset_link: String(msg) });
        if (update_reset_link.n == update_reset_link.nModified) {
            var send_resset_link = await commonHelper.send_mail_sendgrid(args.email, "reset_pwd", { link });
            return { msg: "Reset password link send to your E-mail", status: "success" };
        } else {
            return { msg: "Oops Error !", status: "failed" };
        }

    } else {
        return { msg: "Invalid E-mail", status: "failed" };
    }
}

module.exports.reset_password = async (parent, args, context, info) => {
    var data = args;
    var result = await Detail_model.count({ email_reset_link: data.id });
    if (result > 0) {
        var update_reset_link = await Detail_model.updateOne({ email_reset_link: data.id }, { email_reset_link: "", password: data.password });
        if (update_reset_link.n == update_reset_link.nModified) {
            return { msg: "Reset password successced", status: "success" };
        } else {
            return { msg: "Oops Error !", status: "failed" };
        }

    } else {
        return { msg: "This link is expired", status: "failed" };
    }
}



// find provider rating (based on booking data)
module.exports.provider_rating_by_category = async (parent, args, context, info) => {
    try {

        let match = {
            booking_status: 14,
            user_rating: { $ne: 0 },
            user_comments_status: 1,
        };
        if (args['root']) {
            match['provider_id'] = parent['provider_id']
            if (parent['category_id']) {
                match['category_id'] = ObjectId(parent['category_id'])
            }
        } else if (args['_id']) {
            match['provider_id'] = args['_id']
        }

        if (args['category_id']) {
            match['category_id'] = ObjectId(args['category_id'])
        }
        console.log("module.exports.provider_rating_by_category -> match", match)

        let pipeline = [
            {
                $match: match
            },
            {
                $group: {
                    _id: "$user_rating",
                    rating: { $sum: 1 },
                    totalSaleAmount: { $sum: { $multiply: ["$user_rating", { $sum: 1 }] } },
                }
            },
        ]

        var group_rating = await Booking_model.aggregate(pipeline)
        let rating_value = _.sumBy(group_rating, 'totalSaleAmount') || 0;
        let total_count_rating = _.sumBy(group_rating, 'rating') || 0;
        var rating = rating_value / total_count_rating
        rating = rating ? parseFloat(rating).toFixed(1).toString() : 0;
        return { rating };
    } catch (error) {
        return 0
    }

};

// find provider rating (based on booking data)
module.exports.provider_rating = async (parent, args, context, info) => {
    // console.log(args);
    var five_star_rating = await Booking_model.find({ 'booking_status': 14, 'user_comments_status': 1, 'provider_id': args.id, 'user_rating': 5 });
    var four_star_rating = await Booking_model.find({ 'booking_status': 14, 'user_comments_status': 1, 'provider_id': args.id, 'user_rating': 4 });
    var three_star_rating = await Booking_model.find({ 'booking_status': 14, 'user_comments_status': 1, 'provider_id': args.id, 'user_rating': 3 });
    var two_star_rating = await Booking_model.find({ 'booking_status': 14, 'user_comments_status': 1, 'provider_id': args.id, 'user_rating': 2 });
    var one_star_rating = await Booking_model.find({ 'booking_status': 14, 'user_comments_status': 1, 'provider_id': args.id, 'user_rating': 1 });
    five_star_rating = five_star_rating.length;
    four_star_rating = four_star_rating.length;
    three_star_rating = three_star_rating.length;
    two_star_rating = two_star_rating.length;
    one_star_rating = one_star_rating.length;
    var rating = (5 * five_star_rating + 4 * four_star_rating + 3 * three_star_rating + 2 * two_star_rating + 1 * one_star_rating)
    var total_count_rating = (five_star_rating + four_star_rating + three_star_rating + two_star_rating + one_star_rating)
    var total_rating = Number(rating) / Number(total_count_rating)
    if (Number.isNaN(total_rating)) {
        total_rating = '0'
    }
    else {
        total_rating = parseFloat(total_rating).toFixed(1).toString();
    }
    // console.log( total_rating);
    return [{ _id: args.id, rating: total_rating }];
};

module.exports.provider_rate = async (parent, args, context, info) => {
    // console.log(args);
    //console.log('vis', parent._id);
    var five_star_rating = await Booking_model.find({ 'booking_status': 14, 'user_comments_status': 1, 'provider_id': parent._id, 'user_rating': 5 });
    var four_star_rating = await Booking_model.find({ 'booking_status': 14, 'user_comments_status': 1, 'provider_id': parent._id, 'user_rating': 4 });
    var three_star_rating = await Booking_model.find({ 'booking_status': 14, 'user_comments_status': 1, 'provider_id': parent._id, 'user_rating': 3 });
    var two_star_rating = await Booking_model.find({ 'booking_status': 14, 'user_comments_status': 1, 'provider_id': parent._id, 'user_rating': 2 });
    var one_star_rating = await Booking_model.find({ 'booking_status': 14, 'user_comments_status': 1, 'provider_id': parent._id, 'user_rating': 1 });
    five_star_rating = five_star_rating.length;
    four_star_rating = four_star_rating.length;
    three_star_rating = three_star_rating.length;
    two_star_rating = two_star_rating.length;
    one_star_rating = one_star_rating.length;
    var rating = (5 * five_star_rating + 4 * four_star_rating + 3 * three_star_rating + 2 * two_star_rating + 1 * one_star_rating)
    var total_count_rating = (five_star_rating + four_star_rating + three_star_rating + two_star_rating + one_star_rating)
    var total_rating = Number(rating) / Number(total_count_rating)
    if (Number.isNaN(total_rating)) {
        total_rating = '0'
    }
    else {
        total_rating = parseFloat(total_rating).toFixed(1).toString();
    }
    // console.log( total_rating);
    return [{ _id: parent._id, rating: total_rating }];
};

// find user (based on data)
module.exports.available_booking_user = async (parent, args, context, info) => {
    let input_data = {}
    if (args['root_parent']) {
        input_data['_id'] = parent.provider_id
    } else {
        input_data['_id'] = parent.user_id
    }
    var result = await Detail_model.find(input_data);
    return result;
};

// find provider (based on data)
module.exports.available_booking_povider = async (parent, args, context, info) => {
    //console.log(parent);
    var result;
    result = await Detail_model.find({ _id: parent.provider_id });
    return result;
};


// find payout provider (based on data)
module.exports.find_payout_provider = async (parent, args, context, info) => {
    //console.log('payout provider');
    //console.log(parent);
    var result;
    result = await Detail_model.find({ _id: parent._id });
    return result;
};


// get user based on pagination
module.exports.get_user = async (parent, args, context, info) => {
    var limit = args.limit || 10;
    var page = args.page || 1;
    var offset = Number(page - 1) * Number(limit);
    var total = 0;
    var result = [];
    if (args.role == 2) {
        total = await Detail_model.count({ role: args.role, proof_status: args.proof_status, delete: 0 });
        result = await Detail_model.find({ role: args.role, proof_status: args.proof_status, delete: 0 }).sort({ created_at: -1 }).skip(Number(offset)).limit(args.limit);
    } else {
        total = await Detail_model.count({ role: args.role, delete: 0 });
        result = await Detail_model.find({ role: args.role, delete: 0 }).sort({ created_at: -1 }).skip(Number(offset)).limit(args.limit);
    }
    var pageInfo = { totalDocs: total, page: args.page }
    return { data: result, pageInfo };
};

// find details
module.exports.details = async (parent, args, context, info) => {
    args.delete = 0;
    const result = await Detail_model.find(args);
    //console.log(result);
    return result;
};

//add a new user(1) and provider(2) in admin panel
module.exports.admin_add_user = async (_, args) => {

    var final_status = true; // based on return msg
    const find_email = await Detail_model.find({ email: args.email, role: args.role, delete: 0 });
    if (find_email.length != 0) {
        return { info: { msg: "Already Email is exisit", status: "failed" } }
    }
    const find_phone = await Detail_model.find({ phone_no: args.phone_no, role: args.role, delete: 0 });
    //console.log(find_phone.length);
    if (find_phone.length != 0) {
        return { info: { msg: "Already Phone Number is exisit", status: "failed" } }
    }
    args.location = { type: 'Point', coordinates: [args.lng, args.lat] };

    if (typeof args.demo != "undefined" && args.demo != null && args.demo != '') {
        args.Upload_percentage = "50%";
        args.otp_verification = 1;
        args.email_otp_verification = 1;
        args.email_otp = String(Math.floor(100000 + Math.random() * 900000))
        args.otp = String(Math.floor(100000 + Math.random() * 900000))
        args.last_email_otp_verification = moment.utc().format();
        args.last_otp_verification = moment.utc().valueOf();
        // args.demo_end_time = moment.utc().add(5, 'minutes');
        args.demo_end_time = moment.utc().add(4, 'days').format("YYYY-MM-DD");

    }
    const add_user = new Detail_model(args);
    await add_user.save(async (err, data) => {
        if (err)
            console.log(err); final_status = false;
    });
    return final_status ? { info: { msg: "Add User Sucessfully !", status: "success" } } : { info: { msg: "Add User Failed !", status: "failed" } }
}

//update a user(1) and provider(2) in admin panel
module.exports.admin_update_user = async (_, args) => {

    //console.log(args);
    if (args.lat != undefined && args.lng != undefined) {
        args.location = { type: 'Point', coordinates: [args.lng, args.lat] };
    }
    if (args.country_code == '' || args.country_code == null) {
        delete args.country_code;
    }
    if (args.demo != '' && typeof args.demo != "undefined" && args.demo != null && args.demo != false) {
        args.Upload_percentage = "50%";
        args.otp_verification = 1;
        args.email_otp_verification = 1;
        args.email_otp = String(Math.floor(100000 + Math.random() * 900000))
        args.otp = String(Math.floor(100000 + Math.random() * 900000))
        args.last_email_otp_verification = moment.utc().format();
        args.last_otp_verification = moment.utc().valueOf();
        // args.demo_end_time = moment.utc().add(5, 'minutes');
        args.demo_end_time = moment.utc().add(4, 'days').format("YYYY-MM-DD");
    }
    var data = await Detail_model.findOne({ _id: args._id });
    if (args.phone_no) {
        const find_pn = await Detail_model.find({ delete: 0, phone_no: args.phone_no, role: args.role, _id: { $ne: args._id } });
        if (find_pn.length > 0) {
            return { msg: "mobile no exists", status: 'failed' }
        }
    }
    if (args.email != '') {
        if (args.email != null) {
            if (args.email != undefined) {
                const find_email = await Detail_model.find({ delete: 0, email: args.email, role: args.role, _id: { $ne: args._id } });
                if (find_email.length > 0) {
                    return { msg: "Email already exists", status: 'failed' }
                }
            }
        }
    }
    // args.last_otp_verification = moment.utc().valueOf();
    // args.last_email_otp_verification = moment.utc().valueOf();
    const update_user = await Detail_model.updateOne({ _id: args._id }, args);
    //console.log(update_user);
    if (update_user.n == update_user.nModified) {
        return { ...args, ...{ info: { "msg": "Update Process Success", status: 'success' } } };
    } else {
        return { ...args, ...{ info: { "msg": "Update Process Failed !", status: 'failed' } } };
    }
}

// add user details
module.exports.addDetails = async (parent, args) => {
    //console.log(args);
    var message;
    const get_role = await Detail_model.find({ _id: args._id });
    if (get_role[0].role == 1) {
        args.role = 1;
    } else {
        args.role = 2;
    }
    args.location = { type: 'Point', coordinates: [args.lng, args.lat] };
    const add_detail = new Detail_model(args);
    const save = await add_detail.save();
    if (get_role[0].role == 2) {
        if (args.email != '') {
            let otp = String(Math.floor(100000 + Math.random() * 900000));
            const update_opt = await Detail_model.updateOne({ _id: args.user_id }, { email_otp: otp, last_email_otp_verification: moment.utc().format() });
            var send_otp = await commonHelper.send_mail_sendgrid(args.email, "mail_register", { otp })
            return { ...args, msg: "send opt in your email", success: "success" }
        }
    }
    return { ...args, "msg": "User Detail Sucessfully Updated" };
};

//add user profile (image)
module.exports.update_profile = async (_, args, { file }) => {
    //console.log(args);
    if (args._id == undefined || args._id == "") {
        return { msg: "User_ID is required", status: "failed" };
    }
    if (args.file != '' && args.file != null && args.file != undefined) {
        const { createReadStream, filename } = await args.file;
        //console.log(filename);
        if (filename != undefined) {

            var file_name = moment().unix() + "_" + filename;
            await new Promise(res =>
                createReadStream().pipe(createWriteStream(path.join(__dirname, "../../images/user/profile", file_name))).on("close", res)
            );
            args['image'] = file_name;
            delete args.file;
            //delete old file
            var fs = require('fs');
            await Detail_model.find({ _id: args._id }, (err, data) => {
                if (typeof data[0].image == 'undefined' || data[0].image == '') {
                    //console.log(" file will be upload");
                }
                else {
                    var file = path.join(__dirname, "../../images/user/profile", data[0].image);
                    fs.unlink(file, function (err) { console.log("delete image"); });
                }
            });
            var result = await Detail_model.update({ _id: args._id }, { image: args.image });
            if (result.n == result.nModified) {
                var data = await Detail_model.findOne({ _id: args._id });
                var return_data = data;
                data.msg = "Image upload success";
                data.status = "success";
                return data;
            } else {
                return { msg: "image upload failed", status: "failed" };
            }
        } else {
            return { msg: "image is required", status: "failed" };
        }
    } else {
        return { msg: "image is required", status: "failed" };
    }
};


/**
 * 
 * @param {*} _  [file],_id,type,name,option,user_id,category,image_tag,model_type
 * @param {*} args 
 * @param {*} param2 
 * @returns 
 */



exports.provider_uploading_files = async (files, args) => {
    return new Promise(async function (resolve, reject) {
        try {
            _.forEach(files, async (file, i) => {
                if (file) {
                    const { createReadStream, filename } = await file;
                    var extension = filename.split('.').pop();
                    var file_name = `${args['user_id']}_${moment().valueOf()}_${filename}`;
                    var small_file_name = `${args['user_id']}_${moment().valueOf()}_${filename}_small.jpg`;
                    await new Promise(res =>
                        createReadStream().pipe(createWriteStream(path.join(__dirname, "../../images/user/profile", file_name))).on("close", res)
                    );
                    args['image'] = file_name;
                    var file_resize = await Jimp.read(path.join(__dirname, "../../images/user/profile", file_name))
                        .then(image => {
                            image.resize(260, Jimp.AUTO)
                                .quality(30)
                                .write(path.join(__dirname, "../../images/user/profile", small_file_name));
                        })
                        .catch(err => {
                        });

                    let img_data = {
                        small_image: small_file_name,
                        large_image: file_name,
                        doc_type: extension || "",
                    }
                    await DetailImage_model.updateOne({ _id: args['_id'] }, img_data).exec()
                }
                if (_.size(files) === i + 1) {
                    return resolve({ msg: "file update success", status: "success" });
                }
            })
        } catch (error) {
            reject(false)
        }
    })
}

module.exports.update_pro_profile_doc = async (parent, args, { file }) => {
    try {
        let files = args['file']
        let update_detail = {
            model_type: args['model_type'],
            image_tag: args['image_tag'] || "",
            user_id: args['user_id'],
            doc_type: args['doc_type']
        }
        if (args['_id']) {
            let find_query = {
                _id: args["_id"]
            }
            await DetailImage_model.updateOne(find_query, update_detail).exec()
            if (files && _.size(files)) {
                await this.provider_uploading_files(files, args)
            }
            let add_pro_img_record = await DetailImage_model.findOne(find_query).lean()
            add_pro_img_record['status'] = "success";
            add_pro_img_record['msg'] = "Milestone update success"
            return add_pro_img_record

        } else {
            let add_pro_img = new DetailImage_model(update_detail)
            let add_pro_img_record = await add_pro_img.save()
            if (files && _.size(files)) {
                args['_id'] = add_pro_img_record["_id"]
                await this.provider_uploading_files(files, args)
            }
            add_pro_img_record['status'] = "success";
            add_pro_img_record['msg'] = "Milestone added success"
            return add_pro_img_record
        }

    } catch (error) {
        console.log("module.exports.update_pro_profile_doc -> error", error)
        return { msg: "file update failed", status: "failed" };
    }
};



module.exports.delete_pro_doc = async (root, args) => {
    try {
        let find_query = {
            doc_type: args["doc_type"]
        }
        let update_detail = {
            delete: true
        }
        await DetailImage_model.updateOne(find_query, update_detail).exec()
        return { status: "success", msg: "Milestone removed success" }
    } catch (error) {
        return { status: "failed", msg: "Milestone removed failed" }
    }
}

module.exports.delete_pro_doc_image = async (root, args) => {
    try {
        let find_query = {
            _id: args["_id"]
        }
        let update_detail = {
            delete: true
        }
        await DetailImage_model.updateOne(find_query, update_detail).exec()
        return { status: "success", msg: "Milestone images removed success" }
    } catch (error) {
        return { status: "failed", msg: "Milestone images removed failed" }
    }
}

module.exports.get_pro_profile_doc = async (parent, args) => {
    try {
        let match = {
            delete: false
        }
        if (args['user_id']) {
            match['user_id'] = ObjectId(args['user_id'])
        }
        if (args['model_type']) {
            match['model_type'] = args['model_type']
        }
        let pipeline = [
            {
                $match: match
            },
            {
                $group: {
                    _id: "$doc_type",
                    images: { $push: "$$ROOT" }
                }
            }
        ]

        let grouped_images = await DetailImage_model.aggregate(pipeline)
        console.log("module.exports.get_pro_profile_doc -> grouped_images", grouped_images)
        return grouped_images

    } catch (error) {
        console.log("module.exports.get_pro_profile_doc -> error", error)
        return []
    }
};

// add || update provider _availability
module.exports.updateAvailability = async (parent, args) => {
    // console.log(args);
    var data = {};
    data[args.weekday.day + "_availability"] = args.weekday.time;
    const add_detail = await Detail_model.update({ user_id: args.user_id }, { $push: data });
    //console.log(add_detail);
    return add_detail
};

// remove || pull  user availiability
module.exports.removeAvailability = async (parent, args) => {
    //console.log(args);
    var data = {};
    data[args.weekday.day + "_availability"] = { $in: args.weekday.time };
    //console.log(data);
    const add_detail = await Detail_model.update({ user_id: args.user_id }, { $pull: data });
    // console.log(add_detail);
    return add_detail
};

//delete user
module.exports.deleteUser = async (parent, args) => {
    var booking_data = await Booking_model.find({ $or: [{ provider_id: args._id, user_id: args._id }], booking_status: [10, 9, 4, 12, 13] });
    if (booking_data.length == 0) {
        var result = await Detail_model.remove({ _id: args._id });
        if (result.n == result.deletedCount) {
            return { "msg": "Delete Process Success", status: 'success' };
        } else {
            return { "msg": "Delete Process Failed !", status: 'failed' };
        }
    } else {
        return { "msg": "This user or provider committed a bookings !", status: 'failed' };
    }
};

//delete details
module.exports.deleteDetails = async (parent, args) => {
    var message;
    var result = await Detail_model.remove(args, async (err) => {
        if (err) {
            //console.log("msg");
            message = { "msg": "Error Occur" };
        } else {
            //console.log("msg");
            const change_emailverified = await Status_model.updateOne(args, { lastEmail_verification: "pending" });
        }
    });
    // console.log(result);
    if (result.n == result.deletedCount) {
        message = { ...message, "success": 1, "msg": "data is delete" }
    } else {
        message = { ...message, "success": 0, "msg": "data is not delete" }
    }
    return message;
};

// check otp from user
module.exports.email_checkOtp = async (_, args) => {
    const otp_verified = await Detail_model.find({ _id: args._id, email_otp: args.email_otp });
    const verified_content = await Detail_model.find({ _id: args._id, email_otp: args.email_otp });
    //console.log(otp_verified);
    if (otp_verified.length == 1) {
        const update_email = await Detail_model.updateOne({ _id: args._id }, { email_otp_verification: 1 });
        let message = {};
        if (otp_verified[0].provider_subCategoryID.length == 0 && otp_verified[0].role == 2 && otp_verified[0].Upload_percentage == 50) {
            verified_content.pending_status = 5;
            verified_content.msg = "category not upload";
            verified_content.status = "success";
        } else if (otp_verified[0].role == 2 && otp_verified[0].Upload_percentage == 50 && (otp_verified[0].personal_document == undefined || otp_verified[0].personal_document == '')) {
            verified_content.pending_status = 6;
            verified_content.msg = "personal_document not upload";
            verified_content.status = "success";
        } else if (otp_verified[0].role == 2 && otp_verified[0].Upload_percentage == 50 && (otp_verified[0].professional_document == undefined || otp_verified[0].personal_document == '')) {
            verified_content.pending_status = 7;
            verified_content.msg = "professional_document not upload";
            status = "success";
        } else {
            verified_content.pending_status = 0;
            verified_content.msg = "OTP verified";
            verified_content.status = "success"
        };
        // console.log({ ...otp_verified[0]._doc, ...message });
    } else {
        verified_content.msg = "Wrong OTP";
        verified_content.status = "failed";
    }
    // console.log(verified_content);
    return verified_content;
};

module.exports.resend_otp = async (_, args) => {
    const resend_otp = await Detail_model.findOne({ _id: args._id });
    //console.log(resend_otp);
    update_time = new Date(moment(resend_otp.last_email_otp_verification));
    current_time = new Date(moment.utc());
    //console.log(update_time);
    //console.log(current_time);

    otp_time_diff = Math.round(Math.abs(current_time - update_time) / 60000, 2);
    //console.log(otp_time_diff);

    if (otp_time_diff <= 15) {
        //console.log("otp is not change");
        const update_result = await Detail_model.findOne({ _id: args._id });
        commonHelper.send_mail_sendgrid(update_result.email, "otp", { otp: update_result.email_otp });
        return update_result;
    }
    else {
        //console.log("otp is change");
        let otp = String(Math.floor(100000 + Math.random() * 900000));
        //console.log(otp);
        //console.log(args.phone_no);
        const update_opt_time = await Detail_model.updateOne({ _id: args._id }, { email_otp: otp, last_email_otp_verification: moment.utc().format() });
        const update_result = await Detail_model.findOne({ _id: args._id });
        // console.log(send_otp);
        commonHelper.send_mail_sendgrid(update_result.email, "otp", { otp });
        return update_result;
    }

};

// check otp from user
module.exports.checkOtp = async (parent, args) => {
    try {

        var result = await Detail_model.findOne({ _id: args._id, otp: args.otp });
        const otp_verified = await Detail_model.find({ _id: args._id, otp: args.otp });
        let pro_docs = await DetailImage_model.find({ user_id: args._id }).lean()
        console.log("module.exports.checkOtp -> _.size(pro_docs)", _.size(pro_docs))
        if (pro_docs && _.size(pro_docs)) {
            var pro_docs_certificate = _.size(_.find(pro_docs, { model_type: "certificate" })) 
            console.log("module.exports.checkOtp -> pro_docs_certificate", pro_docs_certificate)
            var pro_docs_license = _.size(_.find(pro_docs, { model_type: "license" }))
            var pro_docs_legal_document = _.size(_.find(pro_docs, { model_type: "legal_document" }))
        }

        if (otp_verified.length == 1) {
            if (result['user_type'] === "company") {
                let message = { pending_status: 0, company_register_status: 0 }
                message['msg'] = "OTP verified";
                message['status'] = "success";
                let pre_company_result = await Company_model.findOne({ user_id: args._id }).lean()
                message['company_id'] = pre_company_result['_id']
                if (pre_company_result && _.size(pre_company_result) && !pre_company_result['company_name']) {
                    message['company_register_status'] = 1
                } else if (pre_company_result && _.size(pre_company_result)) {
                    let pre_address_result = await Address_model.findOne({ company_id: pre_company_result._id }).lean()
                    if (!pre_address_result || !_.size(pre_address_result)) {
                        message['company_register_status'] = 2
                    }
                } else if (!result.provider_subCategory && !_.size(result.provider_subCategory)) {
                    message['company_register_status'] = 3
                } else if (!_.size(pro_docs) || !pro_docs_certificate) {
                    message['company_register_status'] = 4
                } else if ( !pro_docs_license) {
                    message['company_register_status'] = 5
                } else if ( !pro_docs_legal_document) {
                    message['company_register_status'] = 6
                }
                return { ...result._doc, ...message };
            } else {
                let message = {}
                let user_address_result = await Address_model.findOne({ user_id: args._id }).lean()
                if (!result.email) {
                    message = { pending_status: 1, msg: "Go to registration page", status: "success" };
                } else if (!user_address_result || !_.size(user_address_result) && result.role == 2) {
                    message = { pending_status: 2, msg: " address pending", status: "success" };
                } else if (result.provider_subCategoryID.length == 0 && result.role == 2 && result.Upload_percentage == 50) {
                    message = { pending_status: 3, msg: " category not upload", status: "success" };
                } else if (result.role == 2 &&  !_.size(pro_docs) || pro_docs_certificate) {
                    message = { pending_status: 4, msg: "pro_docs_certificate not upload", status: "success" };
                } else if (result.role == 2 && pro_docs_license) {
                    message = { pending_status: 5, msg: "pro_docs_license not upload", status: "success" };
                } else if (result.role == 2 && pro_docs_legal_document) {
                    message = { pending_status: 6, msg: "pro_docs_legal_document not upload", status: "success" };
                } else { message = { pending_status: 0, msg: "OTP verified", status: "success" } };
                result = { ...result._doc, ...message };

            }

        } else {
            //console.log("please check the data");
            let message = { msg: "Wrong OTP", status: 'failed' };
            result = { ...message };
        }
        return result;
    } catch (error) {
        console.log("module.exports.checkOtp -> error", error)
        let message = { msg: "Checkotp Error", status: 'failed' };
        return message;
    }

};

module.exports.sign_up = async (_, args) => {
    // console.log(args);
    var result = await Detail_model.findOne({ role: args.role, email: args.email, password: args.password, delete: 0 });
    const email_verification = await Detail_model.find({ role: args.role, email: args.email, password: args.password, delete: 0 });
    // console.log(email_verification);
    // console.log(email_verification.length);
    if (email_verification.length == 1 && email_verification[0].role == 2) {                            //provider
        // console.log('provider');
        if (args.device_id != null && args.device_id != undefined && args.device_id != '') {
            const add_detail = await Detail_model.updateOne({ _id: email_verification[0]._id }, { device_id: args.device_id });
        }
        var email_verified = await Detail_model.find({ _id: email_verification[0]._id });
        var email_verified_data = await Detail_model.findOne({ _id: email_verification[0]._id });

        let msg = {};
        if (email_verified[0].provider_subCategoryID.length == 0 && email_verified[0].role == 2 && email_verified[0].Upload_percentage == 50) {
            email_verified_data.pending_status = 5,
                email_verified_data.msg = " category not upload",
                email_verified_data.status = "success"

        } else if (email_verified[0].role == 2 && email_verified[0].Upload_percentage == 50 && (email_verified[0].personal_document == undefined || email_verified[0].personal_document == '')) {
            email_verified_data.pending_status = 6,
                email_verified_data.msg = "personal_document not upload",
                email_verified_data.status = "success"
            // msg = { pending_status: 6, msg: "personal_document not upload", status: "success" };
        } else if (email_verified[0].role == 2 && email_verified[0].Upload_percentage == 50 && (email_verified[0].professional_document == undefined || email_verified[0].personal_document == '')) {
            email_verified_data.pending_status = 7,
                email_verified_data.msg = "professional_document not upload",
                email_verified_data.status = "success"
        } else {
            email_verified_data.pending_status = 0,
                email_verified_data.msg = "Email Verified",
                email_verified_data.status = "success"
        }
        return email_verified_data;
    }
    else if (email_verification.length == 1 && email_verification[0].role == 1) {                           //user
        // console.log('user');
        if (args.device_id != null && args.device_id != undefined && args.device_id != '') {
            const add_detail = await Detail_model.updateOne({ _id: email_verification[0]._id }, { device_id: args.device_id });
        }
        result.msg = "user Verified";
        result.status = 'success';
        return result
    }
    else {
        // console.log("please check the data");
        return { msg: "Worng Email or Password", status: 'failed' };
    }
};



/*
 @params(parent._id,lat,lng)
*/
module.exports.kilometer = async (parent, args, context, info) => {
    try {
        var result;
        if (parent._id) {
            result = await Booking_model.findOne({ _id: parent._id });

            if (!_.size(result) || !result.location.coordinates[1] || !result.location.coordinates[0] || !args.lat || !args.lng) {
                // console.log("module.exports.kilometer -> error", "size zero")
                return { kilometre: 0 };
            }

            if (args.lat == result.location.coordinates[1] && args.lng == result.location.coordinates[0]) {
                // console.log("module.exports.kilometer -> error", "zero")
                return { kilometre: 0 };
            }
            var distanceInMeters = getDistanceBetweenPoints.getDistanceBetweenPoints(
                result.location.coordinates[1], result.location.coordinates[0], // Lat, Long of point A
                args.lat, args.lng// Lat, Long of point B
            );
            if (distanceInMeters && distanceInMeters > 0) {
                return { kilometre: String(parseFloat(distanceInMeters * 0.001).toFixed(2)) };
            } else {
                console.log("module.exports.kilometer -> error", distanceInMeters)

                return { kilometre: 0 }
            }
        } else {
            console.log("module.exports.kilometer -> error", "null parent")
            return { kilometre: 0 };
        }
    } catch (error) {
        console.log("module.exports.kilometer -> error", error)
        return { kilometre: 0 };
    }

};

/*
    1.insert ,2.update, 3.delete
*/
module.exports.modified_address = async (parent, args, context, info) => {
    try {

        if (args.option == 1) {
            delete args.option;
            args.delete = 0;
            const add_user_address = new Address_model(args);
            var data = await add_user_address.save();
            data.msg = "success";
            data.status = "success";
            return data

        } else if (args.option == 2) {
            delete args.option;
            const result = await Address_model.updateOne({ _id: args._id }, args, { new: true });
            return { "status": "success", "msg": "update success" }

        } else if (args.option == 3) {
            const result = await Address_model.updateOne({ _id: args._id }, { delete: 1 }, { new: true });
            return { "status": "success", "msg": "deleted success" }
        }
    } catch (error) {
        return { "status": 'failed', "msg": "deleted failed" }
    }

}

module.exports.user_address = async (parent, args, context, info) => {
    // console.log(args);
    var result = await Address_model.find({ user_id: args.user_id, delete: 0 });
    return result;
}


module.exports.user_search = async (parent, args, context, info) => {
    let find_data = {}
    if (args.data && _.size(args.data)) {
        find_data = args.data
        return await Detail_model.find(find_data);
    } else {
        if (args.email) {
            find_data['email'] = { "$regex": `.*${args.email}.*`, "$options": "i" }
        } else {
            return []
        }
        if (args.role) {
            find_data['role'] = args.role
        }
        if (args.type) {
            find_data['type'] = args.type
        }
        return await Detail_model.find(find_data);
    }

}

module.exports.forget_password = async (parent, args, context, info) => {
    return await Detail_model.find({ delete: 0, role: args.role, email: args.email });
}

module.exports.check_demo_app = async (parent, args, context, info) => {
    var data = await Detail_model.find({ _id: args._id });
    if (data.length) {
        if (data[0].delete == 1) {
            return { msg: "demo account ended", status: 'success' };
        } else {
            return { msg: "demo account still now", status: 'failed' };
        }
    } else {
        return { msg: "demo account still now", status: 'failed' };
    }
}

module.exports.get_company_detail = async (parent, args, context, info) => {
    try {
        var limit = args.limit || 10;
        var page = args.page || 1;
        var offset = Number(page - 1) * Number(limit);
        var total = 0;
        var result = [];
        let find_query = { delete: false }
        if (args['search']) {
            find_query = { ...find_query, ...args['search'] }
        }
        if (args['company_id']) {
            find_query['_id'] = args['company_id']
        }
        total = await Company_model.count(find_query);
        result = await Company_model.find(find_query).sort({ created_at: -1 }).skip(Number(offset)).limit(args.limit);
        var pageInfo = { totalDocs: total, page: args.page }
        return { data: result, pageInfo };
    } catch (error) {
        return []
    }
};

exports.get_company_root_detail = async (parent, args, context, info) => {
    try {
        let pro_finder = { delete: false }
        if (parent['_id']) {
            pro_finder['provider_id'] = ObjectId(parent['_id'])
        }

        let company_result = await CompanyProvider_model.findOne(pro_finder).lean();
        if (_.size(company_result)) {
            let find_query = { delete: false }
            if (company_result['company_id']) {
                find_query['_id'] = ObjectId(company_result['company_id'])
            }
            let final_result = await Company_model.findOne(find_query).lean();
            return final_result
        } else {
            return { msg: "error in company detail", status: "failed" }
        }
    } catch (error) {
        return { msg: "error in company detail", status: "failed" }
    }
};

module.exports.get_company_provider = async (parent, args, context, info) => {
    try {
        var limit = args.limit || 10;
        var page = args.page || 1;
        var offset = Number(page - 1) * Number(limit);
        var total = 0;
        var result = [];
        let find_query = { delete: false }
        if (args['search']) {
            find_query = { ...find_query, ...args['search'] }
        }
        if (args['provider_id']) {
            find_query['provider_id'] = args['provider_id']
        }
        total = await CompanyProvider_model.count(find_query);
        result = await CompanyProvider_model.find(find_query).sort({ created_at: -1 }).skip(Number(offset)).limit(args.limit);
        var pageInfo = { totalDocs: total, page: args.page }
        // console.log("module.exports.get_company_detail -> pageInfo", pageInfo)
        return { data: result, pageInfo };
    } catch (error) {
        return []
    }
};

module.exports.get_parent_company_provider = async (parent, args, context, info) => {
    try {
        let find_query = { delete: false }
        if (args['provider_search']) {
            find_query = { ...find_query, ...args['provider_search'] }
        }
        if (args['provider_id']) {
            find_query['provider_id'] = args['provider_id']
        }
        if (args['company_id']) {
            find_query['company_id'] = args['company_id']
        }
        console.log("module.exports.get_parent_company_provider -> find_query", find_query)
        let result = await CompanyProvider_model.find(find_query);
        console.log("module.exports.get_parent_company_provider -> result", result)
        return result;
    } catch (error) {
        console.log("module.exports.get_parent_company_provider -> error", error)
        return []
    }
};

module.exports.get_company_address_detail = async (parent, args, context, info) => {
    try {
        let find_query = {}
        if (args['company_id']) {
            find_query['company_id'] = args['company_id']
        }
        if (args['option']) {
            find_query['option'] = args['option']
        }
        if (args['type']) {
            find_query['type'] = args['type']
        }
        console.log("module.exports.get_company_address_detail -> find_query", find_query)
        result = await Address_model.find(find_query);
        return result;
    } catch (error) {
        return []
    }
};
module.exports.get_company_images = async (parent, args, context, info) => {
    try {
        let find_query = {}
        if (args['company_id']) {
            find_query['company_id'] = args['company_id']
        }
        if (args['option']) {
            find_query['option'] = args['option']
        }
        if (args['image_tag']) {
            find_query['image_tag'] = args['image_tag']
        }
        result = await CompanyImage_model.find(find_query);
        return result;
    } catch (error) {
        return []
    }
};


exports.addUser = async (parent, args) => {
    try {
        console.log("exports.addUser -> args", args)
        const user = await Detail_model.find({ role: args.role, phone_no: args.phone_no, delete: 0 });
        //add new user 
        if (_.size(user) || args._id) {
            let comman_update = {}
            if (args.location_code) {
                comman_update['location_code'] = args.location_code
            }
            if (args.device_id) {
                comman_update['device_id'] = args.device_id
            }
            let _id = args._id || user[0]._id
            if (_.size(comman_update)) {
                await Detail_model.updateOne({ _id }, comman_update);
            }
        }
        if (args.option == "add") {
            const get_role = await Detail_model.findOne({ _id: args._id }).lean();
            //console.log(args.email);
            if (get_role.role == 1) {
                args.role = 1;
            } else {
                args.role = 2;
            }
            if (args.phone_no) {
                const find_pn = await Detail_model.find({ delete: 0, phone_no: args.phone_no, role: args.role, _id: { $ne: args._id } });
                if (_.size(find_pn)) {
                    return { msg: "mobile no exists", status: 'failed' }
                }
            }
            if (args.email) {
                const find_email = await Detail_model.find({ delete: 0, email: args.email, role: args.role, _id: { $ne: args._id } });
                if (_.size(find_email)) {
                    return { msg: "Email already exists", status: 'failed' }
                }
            }

            args.Upload_percentage = 50;
            if (get_role.role == 2) {
                if (args.email != '') {
                    let otp = String(Math.floor(100000 + Math.random() * 900000));
                    args.email_otp = otp;
                    args.last_email_otp_verification = moment.utc().format();
                    // var send_otp = await commonHelper.send_mail_sendgrid(args.email, 'otp', { otp });
                }
            }
            if (args.old_password) {
                if (args.old_password != get_role.password) {
                    return { ...args, "msg": "Wrong Current Password", status: "failed" };
                }
                else {
                    delete args.old_password;
                }
            }
            if (args.lat && args.lng) {
                args.location = { type: 'Point', coordinates: [args.lng, args.lat] };
            }

            var preview_data = get_role.provider_subCategoryID;
            var check_category = false;
            if (Array.isArray(args.provider_subCategoryID)) {
                for (let i = 0; i < args.provider_subCategoryID.length; i++) {
                    check_category = preview_data.includes(args.provider_subCategoryID[i]);
                    if (!check_category) {
                        args.proof_status = 0;
                        var msg = "please wait for admin confrimation in new category";
                        // console.log('true')
                        // ================= push_notifiy ================== //
                        var message = {
                            to: get_role.device_id,
                            collapse_key: 'your_collapse_key',
                            notification: {
                                title: "Proof Status",
                                body: msg,
                                click_action: ".activities.HomeActivity",
                            },
                            data: {
                                my_key: commonHelper.on_going,
                                my_another_key: commonHelper.on_going
                            }
                        };
                        await commonHelper.push_notifiy(message);
                        // ================= push_notifiy ================== //  
                        var send_verification = await commonHelper.send_mail_sendgrid(get_role.email, "admin_approved", { msg });
                        await commonHelper.send_sms(get_role.country_code, get_role.phone_no, "admin_apporved", {})
                        await global.pubsub.publish("PROOF_STATUS", { proof_status: 0, _id: args._id });
                        break;
                    }
                }
            }

            await Detail_model.updateOne({ _id: args._id }, args);
            var data = await Detail_model.findOne({ _id: args._id });
            if (args['user_type'] && args['user_type'] === "company") {
                let company_data = await Company_model.findOne({ user_id: data['_id'] }, { _id: 1 })
                if (_.size(company_data)) {
                    data['company_id'] = company_data['_id']
                } else {
                    let company_data = {
                        user_id: data['_id']
                    }
                    let add_company_detail = new Company_model(company_data)
                    var added_com_detail = await add_company_detail.save()
                    data['company_id'] = added_com_detail['_id']
                    console.log(" data['company_id']", data['company_id'])
                }
            }
            data.msg = "User Detail Sucessfully Updated";
            data.status = "success";
            return data

        } else if (user.length == 0 && args.option == "otp") {

            let otp = String(Math.floor(1000 + Math.random() * 9000));
            args.otp = otp;
            args.last_otp_verification = moment.utc().format();
            args.Upload_percentage = 25;

            const add_user = new Detail_model(args);
            await add_user.save();
            var data = await Detail_model.findOne({ role: args.role, phone_no: args.phone_no, delete: 0 });

            await commonHelper.send_sms(data.country_code, data.phone_no, "otp", { otp })
            data.msg = "New User";
            data.status = "success";
            return data;
        } else if (!args.phone_no) {
            return { ...args, "msg": "Please Enter phone Number", status: "failed" };
        }
        else {
            //already insert and check the otp time and reset
            update_time = new Date(moment(user[0].last_otp_verification));
            current_time = new Date(moment.utc());
            let otp_time_diff = Math.round(Math.abs(current_time - update_time) / 60000, 2);
            var data = await Detail_model.findOne({ phone_no: args.phone_no, role: args.role, delete: 0 });
            if (otp_time_diff <= 15) {
                if (data.Upload_percentage == 25) {
                    data.msg = "New User"; data.status = 'success';
                } else {
                    data.msg = "otp no change", data.status = 'success';
                }
                await commonHelper.send_sms(data.country_code, data.phone_no, "otp", { otp: data.otp })
                return data;
            }
            else {
                //"otp is change"
                let otp = String(Math.floor(1000 + Math.random() * 9000));
                let updatedata = {
                    otp: otp,
                    last_otp_verification: moment.utc().format()
                };
                await Detail_model.updateOne({ phone_no: args.phone_no, role: args.role }, updatedata);
                const update_result = await Detail_model.findOne({ phone_no: args.phone_no, role: args.role });
                if (update_result.Upload_percentage == 25) {
                    update_result.msg = "New User"; update_result.status = 'success';
                } else {
                    update_result.msg = "otp changed"; update_result.status = 'failed';
                }
                await commonHelper.send_sms(update_result.country_code, update_result.phone_no, "otp", { otp })
                return update_result;
            }
        }
    } catch (error) {
        console.log("exports.addUser -> error", error)
        return {
            msg: "User Detail Update  Process Failed",
            status: "failed"
        }
    }
}

module.exports.deleteCompany = async (parent, args, context, info) => {
    try {
        let company_query = {}
        let company_pro_query = {}
        if (args['company_id']) {
            company_query['_id'] = args['company_id']
            company_pro_query['company_id'] = args['company_id']
        }
        await Company_model.updateOne(company_query, { delete: true }).exec();
        await CompanyProvider_model.updateOne(company_pro_query, { delete: true }).exec();
        return { status: "success", msg: "Deleted success" };
    } catch (error) {
        return { status: "failed", msg: "Deleted failed" };
    }
};

module.exports.deleteCompanyProvider = async (parent, args, context, info) => {
    try {
        let find_query = {}
        if (args['provider_id']) {
            find_query['provider_id'] = args['provider_id']
        }
        if (args['company_id']) {
            find_query['company_id'] = args['company_id']
        }
        if (args['_id']) {
            find_query['_id'] = args['_id']
        }
        await CompanyProvider_model.updateOne(find_query, { delete: true }).exec();
        return { status: "success", msg: "Deleted success" };
    } catch (error) {
        return { status: "failed", msg: "Deleted failed" };
    }
};


module.exports.CompanyFileUpload = async (parent, args, context, info) => {
    try {
        if (!args['_id']) {
            return { msg: "Invalid ID", status: "failed" }
        }
        if (args['file']) {
            const { createReadStream, filename } = await args['file'];
            var file_name = `${args['_id']}_${moment().valueOf()}_${filename}`;
            var small_file_name = `${args['_id']}_${moment().valueOf()}_${filename}_small.jpg`;
            await new Promise(res =>
                createReadStream().pipe(createWriteStream(path.join(__dirname, "../../images/company", file_name))).on("close", res)
            );
            args['image'] = file_name;
            var file_resize = await Jimp.read(path.join(__dirname, "../../images/company", file_name))
                .then(image => {
                    image.resize(260, Jimp.AUTO)
                        .quality(30)
                        .write(path.join(__dirname, "../../images/company", small_file_name));
                })
                .catch(err => {
                });

            /**
             * @info add company info after file update 
             */
            let img_data = {
                company_id: args['_id'],
                small_image: small_file_name,
                large_image: file_name,
                image_tag: args['option'],
                doc_category: "Approvals",
            }
            let add_company_image_job = new CompanyImage_model(img_data)
            let added_company_image_job = await add_company_image_job.save()
            added_company_image_job['status'] = "success";
            added_company_image_job['msg'] = "company profiles added success"
            // return added_company_image_job
        }
        return { status: "success", msg: "File upload success" }
    } catch (error) {
        return { status: "failed", msg: "File upload failed" }
    }
}

module.exports.update_company_detail = async (parent, args, context, info) => {
    try {
        let company_data = args['company_data'][0]
        console.log("module.exports.update_company_detail -> company_data", company_data)
        if (!_.size(company_data)) {
            return { msg: "Invalid company data", status: 'failed' };
        }
        if (args['_id']) {
            let find_query = { _id: args['_id'] }
            if (company_data['provider_email'] && _.size(company_data['provider_email'])) {
                let CompanyProviderDetail = await this.SendCompanyProviders(args['_id'], company_data['provider_email'])
            }
            let update_company_detail = await Company_model.updateOne(find_query, company_data).exec()
            let fetch_data = await Company_model.findOne(find_query).lean()
            fetch_data['msg'] = "updated success"
            fetch_data['status'] = "success"
            return fetch_data;
        } else {
            let add_company_detail = new Company_model(company_data)
            let added_detail = await add_company_detail.save()

            let update_query = {
                email: "",
                provider_id: ObjectId(company_data['user_id']),
                company_id: ObjectId(added_detail['_id']),
                register_link_status: "accepted",
                register_status: "success",
                user_type: "Owner"
            }
            let defaul_user = new CompanyProvider_model(update_query)
            await defaul_user.save()
            if (company_data['provider_email'] && _.size(company_data['provider_email'])) {
                let CompanyProviderDetail = await this.SendCompanyProviders(added_detail['_id'], company_data['provider_email'])
            }
            added_detail['msg'] = "updated success"
            added_detail['status'] = "success"
            return added_detail;
        }
    } catch (error) {
        console.error("module.exports.update_company_detail -> error", error);
        let error_msg = "Update failed"
        return { msg: error_msg, status: 'failed' };
    }
}

exports.SendCompanyProviders = (company_id, emails) => {
    try {
        _.forEach(emails, async emailData => {
            let find_query = {
                email: _.trim(emailData),
                company_id: company_id,
                delete: false,
            }
            let update_query = {
                email: _.trim(emailData),
                company_id: company_id,
                register_link_status: "Pending",
                register_status: "Pending",
            }
            let fetch_data = await CompanyProvider_model.findOne(find_query).lean()
            if (_.size(fetch_data)) {
                console.log("already send register link in this email in same company")
            } else {
                console.log("new send register link in this email")
                let add_email = new CompanyProvider_model(update_query)
                let added_detail = await add_email.save()
                let link = `${process.env.APP_URL}/company_user_accepted?sid=${added_detail['_id']}`
                await commonHelper.send_mail_sendgrid(emailData, "new_company_register", { link });
            }
        })
        return true
    } catch (error) {
        return false
    }
}

module.exports.confrimation_company_worker = async (data) => {
    try {
        let { sid } = data
        let link = '/provider_login'
        let error_link = '/ops'
        let find_query = { _id: sid }
        let update_query = { register_link_status: "accepted" }
        let fetch_provider = await CompanyProvider_model.findOne(find_query).lean()
        let fetch_provider_by_email = await CompanyProvider_model.findOne({
            register_link_status: "accepted",
            register_status: "success",
            email: fetch_provider['email'],
            delete: false
        }).lean()
        if (fetch_provider_by_email && _.size(fetch_provider_by_email)) {
            return { status: "failed", msg: "This email already registered to another company", link: error_link }
        }
        if (fetch_provider && _.size(fetch_provider)) {
            let detail_find_query = {
                email: fetch_provider['email'],
                role: 2
            }
            let fetch_pro_detail = await Detail_model.findOne(detail_find_query).lean()
            if (fetch_pro_detail && _.size(fetch_pro_detail)) {
                update_query['provider_id'] = fetch_pro_detail['_id']
                update_query['register_status'] = "success"
            }
        }
        let update_email_data = await CompanyProvider_model.updateOne(find_query, update_query).exec()
        return { status: "success", msg: "User acepted", link }
    } catch (error) {
        let error_link = '/ops'
        return { status: "failed", msg: "User acepted failed", link: error_link }
    }
}


