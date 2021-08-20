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
        let pipeline = [
            { $match: match },
            { $skip: Number(offset) },
            { $limit: Number(limit) }
        ]
        const admin_email = await Admin_model.aggregate(pipeline)
        var total = await Admin_model.count({ is_delete: false });
        var pageInfo = { totalDocs: total, page: args.page }
        return { pageInfo, data: admin_email }
    } catch (error) {
        return { pageInfo: { totalDocs: 0 }, data: [] };
    }
}

module.exports.full_permission_list = async (parent, args) => {
    try {
        let parent_permissions = parent.permissions || []
        let parent_role_permissions = parent.roles_permissions || []
        var merged_arrays = _.merge(parent_permissions, parent_role_permissions);
        merged_arrays = _.map(merged_arrays, data => {
            return ObjectId(data)
        })
        let pipeline = [
            {
                $match: {
                    is_delete: false,
                    _id: { '$in': merged_arrays }
                }
            },
        ]
        const admin_permission = await Permission_model.aggregate(pipeline)
        return admin_permission
    } catch (error) {
        return []
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
        return { pageInfo: { totalDocs: 0 }, data: [] };
    }
}

module.exports.get_all_admin_permission = async (parent, args) => {
    try {
        let pipeline = [
            { $match: { is_delete: false } },
        ]
        const admin_permission = await Permission_model.aggregate(pipeline)
        return admin_permission
    } catch (error) {
        return [];
    }
}


module.exports.add_admin_permission = async (parent, args) => {
    try {
        let perview_check = {}
        if (args['name']) {
            perview_check['name'] = { "$regex": args['name'], "$options": "i" }
        }
        if (args['key']) {
            perview_check['key'] = { "$regex": args['key'], "$options": "i" }
        }
        if (args['type']) {
            perview_check['type'] = { "$regex": args['type'], "$options": "i" }
        }
        let perview_type = await Permission_model.find(perview_check)
        if (_.size(perview_type)) {
            return { status: 'failed', msg: "Already this permission is added" }
        }
        const add_permission = new Permission_model(args);
        const save = await add_permission.save();
        save['status'] = 'success';
        save['msg'] = "Permission added successfully"
        return save
    } catch (error) {
        return { status: 'success', msg: "Permission added failed" }
    }
}

module.exports.delete_admin_permission = async (parent, args) => {
    try {
        let find_query = { _id: args['_id'] }
        let update_query = { is_delete: true }
        const delete_permission = await Permission_model.remove(find_query).exec();
        // const delete_permission = await Permission_model.updateOne(find_query, update_query).exec();
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
            match['_id'] = ObjectId(args['_id'])
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
        return { pageInfo: { totalDocs: 0 }, data: [] };
    }
}

module.exports.get_admin_roles_all = async (parent, args) => {
    try {
        const admin_email = await Roles_model.find({ is_delete: false })
        return admin_email
    } catch (error) {
        return [];
    }
}

module.exports.add_admin_roles = async (parent, args) => {
    try {
        let perview_check = {}
        if (args['name']) {
            perview_check['name'] = { "$regex": args['name'], "$options": "i" }
        }
        if (args['key']) {
            perview_check['key'] = { "$regex": args['key'], "$options": "i" }
        }
        let perview_type = await Roles_model.find(perview_check)
        if (_.size(perview_type)) {
            return { status: 'failed', msg: "Already this roles is added" }
        }
        const add_roles = new Roles_model(args);
        const save = await add_roles.save();
        save['status'] = 'success';
        save['msg'] = "Roles added successfully"
        return save
    } catch (error) {
        return { status: 'success', msg: "Roles added failed" }
    }
}

module.exports.update_admin_roles = async (parent, args) => {
    try {
        let find_query = { _id: args['_id'] }
        let update_query = {}
        // if (args['fun_type'] === "add") {
        //     update_query['$addToSet'] = { "permissions": { $each: args['permissions'] } }
        // } else {
        //     update_query['$pull'] = {
        //         "permissions": { '$in': args['permissions'] }
        //     }
        // }
        update_query["permissions"] = args['permissions']
        const update_roles = await Roles_model.updateOne(find_query, update_query).exec();
        return { status: 'success', msg: "Roles updated successfully" }
    } catch (error) {
        return { status: 'success', msg: "Roles updated failed" }
    }
}

module.exports.delete_admin_roles = async (parent, args) => {
    try {
        let find_query = { _id: args['_id'] }
        let update_query = { is_delete: true }
        const delete_permission = await Roles_model.remove(find_query).exec();
        // const delete_permission = await Roles_model.updateOne(find_query, update_query).exec();
        return { status: 'success', msg: "Permission deleted successfully" }
    } catch (error) {
        return { status: 'success', msg: "Permission deleted failed" }
    }
}

module.exports.delete_admin_user = async (parent, args) => {
    try {
        let find_query = { _id: args['_id'] }
        let update_query = { is_delete: true }
        const delete_permission = await Admin_model.remove(find_query).exec();
        return { status: 'success', msg: "Admin deleted successfully" }
    } catch (error) {
        return { status: 'success', msg: "Admin deleted failed" }
    }
}


module.exports.update_admin_user_permission = async (parent, args) => {
    try {
        if (args['_id']) {
            let update_query = {}
            if (args['email']) {
                let perview_check = {}
                perview_check['email'] = { "$regex": args['email'], "$options": "i" }
                perview_check['_id'] = { '$ne': args['_id'] }
                perview_check['is_delete'] = false
                let perview_type = await Admin_model.find(perview_check)
                if (_.size(perview_type)) {
                    return { status: 'failed', msg: "Already this email is exited" }
                }
                update_query['email'] = args['email']
            }

            let find_query = { _id: args['_id'] }

            if (args['name']) {
                update_query['name'] = args['name']
            }
            if (args['password']) {
                update_query['password'] = args['password']
            }
            if (args['permissions']) {
                update_query['permissions'] = args['permissions']
            }
            if (args['GizzyDeveloper']) {
                update_query['GizzyDeveloper'] = args['GizzyDeveloper']
            }
            if (args['roles']) {
                update_query['roles'] = args['roles']
                const fetch_roles = await Roles_model.findOne({ _id: args['roles'] }).exec();
                if (_.size(fetch_roles)) {
                    update_query['permissions'] = fetch_roles['permissions']
                }
            }
            const update_roles = await Admin_model.updateOne(find_query, update_query).exec();
            return { status: 'success', msg: "Roles updated successfully" }
        } else {
            let perview_check = {}
            if (args['email']) {
                perview_check['email'] = { "$regex": args['email'], "$options": "i" }
            }
            let perview_type = await Admin_model.find(perview_check)
            if (_.size(perview_type)) {
                return { status: 'failed', msg: "Already this email is exited" }
            }
            const add_admin = new Admin_model(args);
            const save = await add_admin.save();
            save['status'] = 'success';
            save['msg'] = "Admin added successfully"
            return save
        }
    } catch (error) {
        return { status: 'success', msg: "Roles updated failed" }
    }
}

module.exports.role_based_permissions_detail = async (parent, args) => {
    try {
        let pipeline = [
            {
                $match: {
                    is_delete: false,
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


module.exports.non_role_permissions_detail = async (parent, args) => {
    try {
        const non_role_permissions_detail = await Roles_model.find({ _id: parent['roles'] })
        non_role_permissions_detail['permissions'] = _.map(non_role_permissions_detail['permissions'], data => {
            return ObjectId(data)
        })
        let pipeline = [
            {
                $match: {
                    is_delete: false,
                    _id: { $nin: non_role_permissions_detail }
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

module.exports.admin_search = async (parent, args, context, info) => {
    try {
        return await Admin_model.find(args.data);
    } catch (error) {
        return []
    }
}

module.exports.roles_search = async (parent, args, context, info) => {
    try {
        let data = await Roles_model.find(args.data);
        return data
    } catch (error) {
        return []
    }
}