const model = require('../../model_data');
var moment = require("moment");
var ObjectId = require('mongodb').ObjectID;
const { permission } = require('../../model_data');
var Admin_model = model.admin;
var Roles_model = model.roles;
var Permission_model = model.permission;

module.exports.get_admin_permission = async (_, args) => {
    try {
        let pipeline = [
            { $match: { is_delete: false } },
            {
                $group: {
                    _id: "$type",
                    permission: { $push: "$$ROOT" },
                    count: { $sum: 1 },
                }
            },
        ]
        const admin_email = await Permission_model.aggregate(pipeline)
        console.log("module.exports.get_admin_permission -> admin_email", admin_email)
        return admin_email
    } catch (error) {
        console.log("module.exports.get_admin_permission -> error", error)
        return [];
    }
}

module.exports.add_admin_permission = async (_, args) => {
    try {
        const add_permission = new Permission_model(args);
        const save = await add_permission.save();
        return { status: 'success', msg: "Permission added successfully" }
    } catch (error) {
        console.log("module.exports.add_admin_permission -> error", error)
        return { status: 'success', msg: "Permission added failed" }
    }
}

module.exports.delete_admin_permission = async (_, args) => {
    try {
        let find_query = { _id: args['_id'] }
        let update_query = { is_delete: true }
        const delete_permission = await Permission_model.updateOne(find_query, update_query).exec();
        return { status: 'success', msg: "Permission deleted successfully" }
    } catch (error) {
        return { status: 'success', msg: "Permission deleted failed" }
    }
}

module.exports.add_admin_roles = async (_, args) => {
    try {
        const add_roles = new Roles_model(args);
        const save = await add_roles.save();
        return { status: 'success', msg: "Roles added successfully" }
    } catch (error) {
        console.log("module.exports.add_admin_permission -> error", error)
        return { status: 'success', msg: "Roles added failed" }
    }
}

module.exports.update_admin_roles = async (_, args) => {
    try {
        let find_query = { _id: args['_id'] }
        let update_query = {}
        if (args['fun_type'] === "add") {
            update_query['$push'] = { "roles": { args } }
        } else {
            update_query['$pull'] = { "roles": { key: args['key'] } }

        }
        const update_roles = await Roles_model.updateOne(find_query,);
        return { status: 'success', msg: "Roles updated successfully" }
    } catch (error) {
        console.log("module.exports.add_admin_permission -> error", error)
        return { status: 'success', msg: "Roles updated failed" }
    }
}