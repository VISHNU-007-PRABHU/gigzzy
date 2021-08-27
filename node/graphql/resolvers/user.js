const model = require('../../model_data');
const moment = require('moment');
var ObjectId = require('mongodb').ObjectID;
const { createWriteStream, existsSync, mkdirSync, fs } = require("fs");
var Jimp = require('jimp');
const path = require("path");
const _ = require("lodash");
var commonHelper = require('../commonHelper');
var saf = require('../safaricom');
const dotenv = require('dotenv');
var getDistanceBetweenPoints = require('get-distance-between-points');
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
module.exports.testmail = async (parent, args, context, info) => {
    return {
        msg: "test"
    }
}

module.exports.testinfmail = async (parent, args, context, info) => {
    try {
        let data = await saf.safaricom_ctob_register();
        // let data = await saf.safaricom_lipesa_simulate('254705924459',"20");
        // let data =  await saf.safaricom_ctob_simulate('254705924459',"20")
        // console.log("module.exports.testinfmail -> data", data)
        // let msg = "testing email template"
        // let otp = 9890
        // var send_verification = await commonHelper.send_mail_sendgrid("vishnu@waioz.com", "otp", {otp});
        // console.log("module.exports.testinfmail -> send_verification", send_verification)

        // let chargePayment = await commonHelper.send_sms("254","705924459","otp",{otp:9213})
        // console.log("module.exports.testinfmail -> chargePayment", chargePayment)
        return { msg: "success test api" };
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
    //console.log('booking_based_user-parent');
    var result;
    result = await Detail_model.find({ _id: parent.user_id });
    return result;
};

// find provider (based on data)
module.exports.available_booking_povider = async (parent, args, context, info) => {
    //console.log('booking_provider');
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
    if (args.phone_no != '' && args.phone_no != null && typeof args.phone_no != "undefined") {
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


// add new user(1) and provider(2) with otp process
module.exports.addUser = async (_, args) => {
    const user = await Detail_model.find({ role: args.role, phone_no: args.phone_no, delete: 0 });
    // console.log(user);
    //console.log("user");
    //add new user 
    if (args.option == "add") {
        const get_role = await Detail_model.find({ _id: args._id });
        //console.log(args.email);
        if (get_role[0].role == 1) {
            args.role = 1;
        } else {
            args.role = 2;
        }
        if (args.phone_no != '') {
            if (args.phone_no != null) {
                if (args.phone_no != undefined) {
                    const find_pn = await Detail_model.find({ delete: 0, phone_no: args.phone_no, role: args.role, _id: { $ne: args._id } });
                    if (find_pn.length > 0) {
                        return { msg: "mobile no exists", status: 'failed' }
                    }
                }
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
        args.Upload_percentage = 50;
        if (get_role[0].role == 2) {
            if (args.email != '') {
                let otp = String(Math.floor(100000 + Math.random() * 900000));
                args.email_otp = otp;
                args.last_email_otp_verification = moment.utc().format();
                var send_otp = await commonHelper.send_mail_sendgrid(args.email, "mail_register", { otp });
            }
        }
        if (args.old_password != undefined && args.old_password != '') {
            if (args.old_password != get_role[0].password) {
                return { ...args, "msg": "Wrong Current Password", status: "failed" };
            }
            else {
                delete args.old_password;
            }
        }
        if (args.lat != undefined && args.lng != undefined) {
            args.location = { type: 'Point', coordinates: [args.lng, args.lat] };
        }
        const add_detail = await Detail_model.updateOne({ _id: args._id }, args);
        // console.log(add_detail);
        var data = await Detail_model.findOne({ _id: args._id });
        if (add_detail.n == add_detail.nModified) {
            data.msg = "User Detail Sucessfully Updated";
            data.status = "success";
            //console.log(data);
            return data
        } else {
            data.msg = "User Detail Update  Process Failed";
            data.status = "failed";
            return data;
        }
    } else if (user.length == 0 && args.option == "otp") {

        let otp = String(Math.floor(1000 + Math.random() * 9000));
        args.otp = otp;
        args.last_otp_verification = moment.utc().format();
        args.Upload_percentage = 25;
        //console.log(args);
        const add_user = new Detail_model(args);
        await add_user.save();
        var data = await Detail_model.findOne({ role: args.role, phone_no: args.phone_no, delete: 0 });
        if (args.device_id != null && args.device_id != undefined && args.device_id != '') {
            const add_detail = await Detail_model.updateOne({ _id: data._id }, { device_id: args.device_id });
        }
        data.msg = "New User";
        data.status = "success";
        await commonHelper.send_sms(data.country_code, data.phone_no, "otp", { otp })
        return data;
    } else if (args.phone_no == undefined || args.phone_no == '') {
        return { ...args, "msg": "Please Enter phone Number", status: "failed" };
    }
    else {
        //already insert and check the otp time and reset
        update_time = new Date(moment(user[0].last_otp_verification));
        current_time = new Date(moment.utc());
        let otp_time_diff = Math.round(Math.abs(current_time - update_time) / 60000, 2);
        // "otp is not change"
        var return_msg = {};
        var data = await Detail_model.findOne({ phone_no: args.phone_no, role: args.role, delete: 0 });
        if (args.device_id != null && args.device_id != undefined && args.device_id != '') {
            const add_detail = await Detail_model.updateOne({ _id: data._id }, { device_id: args.device_id });
        }
        if (otp_time_diff <= 15) {
            if (data.Upload_percentage == 25) {
                data.msg = "New User"; data.status = 'success';
            } else {
                data.msg = "otp no change", data.status = 'failed';
            }
            // console.log({ ...data._doc, ...return_msg });
            await commonHelper.send_sms(data.country_code, data.phone_no, "otp", { otp })
            return data;
        }
        //"otp is change"
        else {

            let otp = String(Math.floor(1000 + Math.random() * 9000));
            if (args.device_id != null && args.device_id != undefined && args.device_id != '') {
                const update_opt_time = await Detail_model.updateOne({ phone_no: args.phone_no, role: args.role }, { device_id: args.device_id, otp: otp, last_otp_verification: moment.utc().format() });
            } else {
                const update_opt_time = await Detail_model.updateOne({ phone_no: args.phone_no, role: args.role }, { otp: otp, last_otp_verification: moment.utc().format() });
            }
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
};

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
module.exports.checkOtp = async (_, args) => {
    var result = await Detail_model.findOne({ _id: args._id, otp: args.otp });
    const otp_verified = await Detail_model.find({ _id: args._id, otp: args.otp });
    // console.log(otp_verified);
    if (otp_verified.length == 1) {
        const check_user = await Detail_model.find({ _id: args._id });
        if (check_user[0].Upload_percentage == 25) {
            let message = { pending_status: 1, msg: "new user", status: "success" };
            result = { ...result._doc, ...message };
        } else {
            let message = {}
            if (check_user[0].role == 2 && check_user[0].Upload_percentage == 50 && (check_user[0].email_otp_verification == 0)) {
                message = { pending_status: 2, msg: "Email not verified", status: "success" };
            } else if (check_user[0].provider_subCategoryID.length == 0 && check_user[0].role == 2 && check_user[0].Upload_percentage == 50) {
                message = { pending_status: 5, msg: " category not upload", status: "success" };
            } else if (check_user[0].role == 2 && check_user[0].Upload_percentage == 50 && (check_user[0].personal_document == undefined || check_user[0].personal_document == '')) {
                message = { pending_status: 6, msg: "personal_document not upload", status: "success" };
            } else if (check_user[0].role == 2 && check_user[0].Upload_percentage == 50 && (check_user[0].professional_document == undefined || check_user[0].personal_document == '')) {
                message = { pending_status: 7, msg: "professional_document not upload", status: "success" };
            } else { message = { pending_status: 0, msg: "OTP verified", status: "success" } };
            result = { ...result._doc, ...message };
        }
    } else {
        //console.log("please check the data");
        let message = { msg: "Wrong OTP", status: 'failed' };
        result = { ...message };
    }
    // console.log(result);
    return result;
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
        if (email_verified[0].role == 2 && email_verified[0].Upload_percentage == 50 && (email_verified[0].email_otp_verification == 0)) {
            email_verified_data.pending_status = 2,
                email_verified_data.msg = "Email not verified",
                email_verified_data.status = "success"
        } else if (email_verified[0].provider_subCategoryID.length == 0 && email_verified[0].role == 2 && email_verified[0].Upload_percentage == 50) {
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
                console.log("module.exports.kilometer -> error", "size zero")
                return { kilometre: 0 };
            }

            if (args.lat == result.location.coordinates[1] && args.lng == result.location.coordinates[0]) {
                console.log("module.exports.kilometer -> error", "zero")
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
        // console.log(result);
        if (result.n == result.nModified) {
            return { "status": "success", "msg": "update success" }
        } else {
            return { "status": 'failed', "msg": "update failed" }
        }
    } else if (args.option == 3) {
        const result = await Address_model.updateOne({ _id: args._id }, { delete: 1 }, { new: true });
        if (result.n == result.nModified) {
            return { "status": "success", "msg": "deleted success" }
        } else {
            return { "status": 'failed', "msg": "deleted failed" }
        }
    }
}

module.exports.user_address = async (parent, args, context, info) => {
    // console.log(args);
    var result = await Address_model.find({ user_id: args.user_id, delete: 0 });
    return result;
}


module.exports.user_search = async (parent, args, context, info) => {
    console.log(args)
    return await Detail_model.find(args.data);
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
        let find_query= { delete: false }
        if(args['search']){
            find_query = {...find_query,...args['search']}
        }
        if(args['company_id']){
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

module.exports.get_company_provider = async (parent, args, context, info) => {
    try {
        var limit = args.limit || 10;
        var page = args.page || 1;
        var offset = Number(page - 1) * Number(limit);
        var total = 0;
        var result = [];
        let find_query= { delete: false }
        if(args['search']){
            find_query = {...find_query,...args['search']}
        }
        if(args['provider_id']){
            find_query['provider_id']=args['provider_id']
        }
        total = await CompanyProvider_model.count(find_query);
        result = await CompanyProvider_model.find(find_query).sort({ created_at: -1 }).skip(Number(offset)).limit(args.limit);
        var pageInfo = { totalDocs: total, page: args.page }
        console.log("module.exports.get_company_detail -> pageInfo", pageInfo)
        return { data: result, pageInfo };
    } catch (error) {
        return []
    }
};

module.exports.get_parent_company_provider = async (parent, args, context, info) => {
    try {
        let find_query= { delete: false }
        if(args['provider_search']){
            find_query = {...find_query,...args['provider_search']}
        }
        if(args['provider_id']){
            find_query['provider_id']=args['provider_id']
        }
        if(args['company_id']){
            find_query['company_id']=args['company_id']
        }
        result = await CompanyProvider_model.find(find_query);
        return result;
    } catch (error) {
        return []
    }
};

module.exports.get_company_address_detail = async (parent, args, context, info) => {
    try {
        let find_query= { }
        if(args['company_id']){
            find_query['company_id'] = args['company_id']
        }
        if(args['option']){
            find_query['option']=args['option']
        }
        if(args['type']){
            find_query['type']=args['type']
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
        let find_query= { }
        if(args['company_id']){
            find_query['company_id'] = args['company_id']
        }
        if(args['option']){
            find_query['option']=args['option']
        }
        if(args['image_tag']){
            find_query['image_tag']=args['image_tag']
        }
        console.log("module.exports.get_company_images -> find_query", find_query)
        result = await CompanyImage_model.find(find_query);
        return result;
    } catch (error) {
        return []
    }
};



module.exports.deleteCompany = async (parent, args, context, info) => {
    try {
        let company_query ={}
        let company_pro_query ={}
        if(args['company_id']){
            company_query['_id'] =  args['company_id']
            company_pro_query['company_id']=args['company_id']
        }
        await Company_model.updateOne(company_query,{delete:true}).exec();
        await CompanyProvider_model.updateOne(company_pro_query,{delete:true}).exec();
        return {status:"success",msg:"Deleted success"};
    } catch (error) {
        return {status:"failed",msg:"Deleted failed"};
    }
};

module.exports.deleteCompanyProvider = async (parent, args, context, info) => {
    try {
        let find_query ={}
        if(args['provider_id']){
            find_query['provider_id']=args['provider_id']
        }
        if(args['company_id']){
            find_query['company_id']=args['company_id']
        }
        if(args['_id']){
            find_query['_id']=args['_id']
        }
        await CompanyProvider_model.updateOne(find_query,{delete:true}).exec();
        return {status:"success",msg:"Deleted success"};
    } catch (error) {
        return {status:"failed",msg:"Deleted failed"};
    }
};


module.exports.CompanyFileUpload =async (parent, args, context, info) => {
    try {
        console.log("module.exports.CompanyFileUpload -> args", args)
        if(!args['_id']){
            return {msg:"Invalid ID",status:"failed"}
        }
        _.forEach(args['file'],async file =>{
        if (file) {
            const { createReadStream, filename } = await file;
            var file_name = `${ args['_id']}_${moment().valueOf()}_${filename}`;
            var small_file_name = `${ args['_id']}_${moment().valueOf()}_${filename}_small.jpg`;
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
        console.log(args['company_data'])
        let company_data = args['company_data'][0]
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
            if (company_data['provider_email'] && _.size(company_data['provider_email'])) {
                let CompanyProviderDetail = await this.SendCompanyProviders(added_detail['_id'], company_data['provider_email'])
            }
            added_detail['msg'] = "updated success"
            added_detail['status'] = "success"
            return added_detail;
        }
    } catch (error) {
        console.error("module.exports.update_company_detail -> error", error);
        let error_msg ="Update failed"
        if(error.message){
            error_msg = error.message
        }
        return { msg: error_msg, status: 'failed' };
    }
}

exports.SendCompanyProviders = (company_id, emails) => {
    try {
        _.forEach(emails, async emailData => {
            let find_query = {
                email: _.trim(emailData),
                company_id: company_id,
                delete:false,
            }
            let update_query ={
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
            register_status:"success",
            email:fetch_provider['email'],
            delete:false
        }).lean()
        if(fetch_provider_by_email && _.size(fetch_provider_by_email)){
            return { status: "failed", msg: "This email already registered to another company",link:error_link }  
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
        return { status: "failed", msg: "User acepted failed",link:error_link }
    }
}