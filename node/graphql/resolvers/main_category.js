const model = require('../../model_data');
const _ = require('lodash');
const moment = require('moment');
var Jimp = require('jimp');
var ObjectId = require('mongodb').ObjectID;

var MainCategory_model = model.MainCategory;
var MainCategoryQuestion_model = model.MainCategoryQuestion
var MainCategoryImage_model = model.MainCategoryImage
var Category_model = model.category;
var subCategory_model = model.sub_category;
var CategoryCurrency_model = model.CategoryCurrency;
var Currency_model = model.currency;

exports.get_main_category_pagination = async (parent, args, context, info) => {
    try {
        var limit = args.limit || 10;
        var page = args.page || 1;
        let options = {
            page,
            limit
        };
        var search_data = { delete: false };
        if (args['search']) {
            let search_text = `.*${args['search']}`
            search_data['category_name'] = { $regex: search_text, $options: "i" }
        } else {
            if (args['parent']) {
                search_data['parent'] = args['parent']
            } else {
                search_data['parent'] = "is_parent"
            }
        }
        var result = await MainCategory_model.paginate(search_data, options);
        var pageInfo = { totalDocs: result['totalDocs'], page: result['page'], hasNextPage: result['hasNextPage'] }
        return { data: result.docs, pageInfo };
    } catch (error) {
        console.log("exports.get_main_category_pagination -> error", error)
        return { data: [], pageInfo: { page: 1, totalDocs: 0 } };
    }
}


/**
 * 
 * @param {*} parent 
 * @param {*} args  child,parent,_id,title,description
 * @returns 
 */
exports.update_main_category = async (parent, args) => {
    try {
        let update_data = args['category_data']

        if (args['_id']) {
            let find_query = { _id: args['_id'] }
            await MainCategory_model.updateOne({ _id: args._id }, update_data);
            if (args['files'] && _.size(args['files'])) {
                await this.update_main_category_files(args['files'], args)
            }
            var result = await MainCategory_model.findOne(find_query).lean();
            result["msg"] = "update process success"
            result['status'] = 'success'
            return result
        } else {
            console.log("exports.update_main_category -> update_data", update_data)
            const add_main_tegory = new MainCategory_model(update_data);
            const save = await add_main_tegory.save();
            if (args['files'] && _.size(args['files'])) {
                await this.update_main_category_files(args['files'], save)
            }
            return { msg: "category update success", status: "success" }
        }
    } catch (error) {
        return { msg: "failed to category update", status: "failed" }
    }
}

exports.update_main_category_files = async (files, args) => {
    return new Promise(async function (resolve, reject) {
        try {
            _.forEach(files, async (file, i) => {
                if (file) {
                    const { createReadStream, filename } = await file;
                    var extension = filename.split('.').pop();
                    var file_name = `${args['_id']}_${moment().valueOf()}_${filename}`;
                    var small_file_name = `${args['_id']}_${moment().valueOf()}_${filename}_small.jpg`;
                    await new Promise(res =>
                        createReadStream().pipe(createWriteStream(path.join(__dirname, "../../images/category", file_name))).on("close", res)
                    );
                    args['image'] = file_name;
                    await Jimp.read(path.join(__dirname, "../../images/category", file_name))
                        .then(image => {
                            image.resize(260, Jimp.AUTO)
                                .quality(30)
                                .write(path.join(__dirname, "../../images/category", small_file_name));
                        })
                        .catch(err => {
                        });

                    let img_data = {
                        category_id: args['_id'],
                        small_image: small_file_name,
                        large_image: file_name,
                        doc_type: extension || "",
                    }
                    let add_category_image_job = new MainCategoryImage_model(img_data)
                    await add_category_image_job.save()
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


exports.get_category_question = async (parent, args, context, info) => {
    try {
        let search_data = {}
        if (args['category_id']) {
            search_data['category_id'] = args['category_id']
        }
        var result = await MainCategoryQuestion_model.find(search_data);
        return result;
    } catch (error) {
        console.log("exports.get_category_question -> error", error)
        return [];
    }
}


exports.update_category_question = async (parent, args, context, info) => {
    try {
        let update_data = args['question_data']
        if (args['_id']) {
            let find_query = { _id: args['_id'] }
            await MainCategoryQuestion_model.updateOne(find_query, update_data);
            var result = await MainCategoryQuestion_model.findOne(find_query).lean();
            result["msg"] = "update process success"
            result['status'] = 'success'
            return result
        } else {
            const add_main_tegory = new MainCategoryQuestion_model(update_data);
            const save = await add_main_tegory.save();
            return { msg: "Ondemand Question update success", status: "success" }
        }
    } catch (error) {
        console.log("exports.get_category_question -> error", error)
        return [];
    }
}
