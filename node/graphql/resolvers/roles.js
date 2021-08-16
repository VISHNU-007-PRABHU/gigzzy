const model = require('../../model_data');
var moment = require("moment");
const _ = require('lodash');
var ObjectId = require('mongodb').ObjectID;
const { permission } = require('../../model_data');
var Admin_model = model.admin;
var Roles_model = model.roles;
var Permission_model = model.permission;

module.exports.get_admin_users = async (parent, args) => {
    try {
        var limit = args.limit || 10;
        var page = args.page || 1;
        var offset = Number(page - 1) * Number(limit);
        let match = { is_delete: false }
        if (args['_id']) {
            match['_id'] = ObjectId(args['_id'])
        }
        console.log("module.exports.get_admin_users -> match", match)
        let pipeline = [
            { $match: match },
            { $skip: Number(offset) },
            { $limit: Number(limit) }
        ]
        const admin_email = await Admin_model.aggregate(pipeline)
        console.log("module.exports.get_admin_users -> admin_email", admin_email)
        var total = await Admin_model.count({ is_delete: false });
        var pageInfo = { totalDocs: total, page: args.page }
        return { pageInfo, data: admin_email }
    } catch (error) {
        console.log("module.exports.get_admin_permission -> error", error)
        return { pageInfo: { totalDocs: 0 }, data: [] };
    }
}

module.exports.get_admin_permission = async (parent, args) => {
    try {
        var limit = args.limit || 10;
        var page = args.page || 1;
        var offset = Number(page - 1) * Number(limit);
        let pipeline = [
            { $match: { is_delete: false } },
            {
                $group: {
                    _id: "$type",
                    permission: { $push: "$$ROOT" },
                    count: { $sum: 1 },
                }
            },
            { $skip: Number(offset) },
            { $limit: Number(limit) }
        ]
        const admin_permission = await Permission_model.aggregate(pipeline)
        var total = await Permission_model.count({ is_delete: false });
        var pageInfo = { totalDocs: total, page: args.page }
        return { pageInfo, data: admin_permission }
    } catch (error) {
        console.log("module.exports.get_admin_permission -> error", error)
        return { pageInfo: { totalDocs: 0 }, data: [] };
    }
}

module.exports.add_admin_permission = async (parent, args) => {
    try {
        const add_permission = new Permission_model(args);
        const save = await add_permission.save();
        return { status: 'success', msg: "Permission added successfully" }
    } catch (error) {
        console.log("module.exports.add_admin_permission -> error", error)
        return { status: 'success', msg: "Permission added failed" }
    }
}

module.exports.delete_admin_permission = async (parent, args) => {
    try {
        let find_query = { _id: args['_id'] }
        let update_query = { is_delete: true }
        const delete_permission = await Permission_model.updateOne(find_query, update_query).exec();
        return { status: 'success', msg: "Permission deleted successfully" }
    } catch (error) {
        return { status: 'success', msg: "Permission deleted failed" }
    }
}

module.exports.get_admin_roles = async (parent, args) => {
    try {
        var limit = args.limit || 10;
        var page = args.page || 1;
        var offset = Number(page - 1) * Number(limit);
        let match = { is_delete: false }
        if (args['_id']) {
            match['_id'] = args['_id']
        }
        let pipeline = [
            { $match: match },
            { $sort: { 'created_at': -1 } },
            { $skip: Number(offset) },
            { $limit: Number(limit) }
        ]
        const admin_email = await Roles_model.aggregate(pipeline)
        var total = await Roles_model.count({ is_delete: false });
        var pageInfo = { totalDocs: total, page: args.page }
        return { pageInfo, data: admin_email }
    } catch (error) {
        console.log("module.exports.get_admin_permission -> error", error)
        return { pageInfo: { totalDocs: 0 }, data: [] };
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

module.exports.update_admin_roles = async (parent, args) => {
    try {
        let find_query = { _id: args['_id'] }
        let update_query = {}
        if (args['fun_type'] === "add") {
            update_query['$addToSet'] = { "permissions": { $each: args['permissions'] } }
        } else {
            update_query['$pull'] = {
                "permissions": { '$in': args['permissions'] }
            }
        }
        const update_roles = await Roles_model.updateOne(find_query, update_query).exec();
        return { status: 'success', msg: "Roles updated successfully" }
    } catch (error) {
        console.log("module.exports.add_admin_permission -> error", error)
        return { status: 'success', msg: "Roles updated failed" }
    }
}

module.exports.delete_admin_roles = async (parent, args) => {
    try {
        let find_query = { _id: args['_id'] }
        let update_query = { is_delete: true }
        const delete_permission = await Roles_model.updateOne(find_query, update_query).exec();
        return { status: 'success', msg: "Permission deleted successfully" }
    } catch (error) {
        return { status: 'success', msg: "Permission deleted failed" }
    }
}


module.exports.update_admin_user_permission = async (parent, args) => {
    try {
        let find_query = { _id: args['_id'] }
        let update_query = {}
        if (args['fun_permission'] === "roles") {
            /**
             * roles based permission
             */
            const fetch_roles = await Roles_model.findOne({ _id: args['roles'] }).exec();
            if (_.size(fetch_roles)) {
                args['roles_permissions'] = fetch_roles['permissions']
            }
            if (args['fun_type'] === "add") {
                update_query['$addToSet'] = { 'roles_permissions': { $each: args['roles_permissions'] } }
            } else {
                update_query['$pull'] = { 'roles_permissions': { '$in': args['roles_permissions'] } }
            }
        } else {
            /**
             * individual permisson
             */
            if (args['fun_type'] === "add") {
                update_query['$addToSet'] = { 'permissions': { $each: args['permissions'] } }
            } else {
                update_query['$pull'] = { 'permissions': { '$in': args['permissions'] } }
            }
        }

        const update_roles = await Admin_model.updateOne(find_query, update_query).exec();
        return { status: 'success', msg: "Roles updated successfully" }
    } catch (error) {
        console.log("module.exports.add_admin_permission -> error", error)
        return { status: 'success', msg: "Roles updated failed" }
    }
}

module.exports.role_based_permissions_detail = async (parent, args) => {
    try {
        parent['roles_permissions'] = _.map(parent['roles_permissions'], data => {
            return ObjectId(data)
        })
        let pipeline = [
            {
                $match: {
                    is_delete: false,
                    _id: { $in: parent['roles_permissions'] }
                }
            },
            {
                $group: {
                    _id: "$type",
                    permission: { $push: "$$ROOT" },
                    count: { $sum: 1 },
                }
            },
        ]
        const permission_details = await Permission_model.aggregate(pipeline)
        return permission_details
    } catch (error) {
        console.log("module.exports.get_admin_permission -> error", error)
        return [];
    }
}


module.exports.role_table_based_permissions_detail = async (parent, args) => {
    try {
        parent['permissions'] = _.map(parent['permissions'], data => {
            return ObjectId(data)
        })
        let pipeline = [
            {
                $match: {
                    is_delete: false,
                    _id: { $in: parent['permissions'] }
                }
            },
            {
                $group: {
                    _id: "$type",
                    permission: { $push: "$$ROOT" },
                    count: { $sum: 1 },
                }
            },
        ]
        const permission_details = await Permission_model.aggregate(pipeline)
        return permission_details
    } catch (error) {
        console.log("module.exports.get_admin_permission -> error", error)
        return [];
    }
}

module.exports.individual_based_permissions_detail = async (parent, args) => {
    try {
        parent['permissions'] = _.map(parent['permissions'], data => {
            return ObjectId(data)
        })
        let pipeline = [
            {
                $match: {
                    is_delete: false,
                    _id: { $in: parent['permissions'] }
                }
            },
        ]
        const permission_details = await Permission_model.aggregate(pipeline)
        return permission_details
    } catch (error) {
        console.log("module.exports.get_admin_permission -> error", error)
        return [];
    }
}

module.exports.admin_role_detail = async (parent, args) => {
    try {
        if (!parent['roles']) {
            return { status: 'failed', msg: "Any role has been assigned" }
        }
        const add_roles = await Roles_model.findOne({ _id: parent['roles'] }).lean();
        return add_roles
    } catch (error) {
        return { status: 'failed', msg: "Any role has been assigned" }
    }
}