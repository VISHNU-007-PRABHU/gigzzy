const model = require('../../model_data');
const _ = require('lodash');
const moment = require('moment');
var Jimp = require('jimp');
var ObjectId = require('mongodb').ObjectID;

var MainCategory_model = model.MainCategory;
var MainCategoryImage_model = model.MainCategoryImage
var Category_model = model.category;
var subCategory_model = model.sub_category;
var CategoryCurrency_model = model.CategoryCurrency;
var Currency_model = model.currency;


/**
 * 
 * @param {*} parent 
 * @param {*} args  child,parent,_id,title,description
 * @returns 
 */
exports.update_main_category = async (parent, args) => {
    try {
        let update_data = args['categroy_data'][0]
      
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
            const add_main_tegory = new MainCategory_model(args);
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