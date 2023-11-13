const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { category,dbTable } = require("../utils/constant");
const {uploadS3} = require("../connection/s3client");

const getAllCategory = async (req, res, next) => {
    if (req.method == "GET") {
        try{
            usr_qry = `SELECT * FROM ${dbTable.category} WHERE ${category.isParentCategory}= '1'`;
            let result = await executeQry(usr_qry);
            if(result.length==0){
                res.statusCode = 201;
                res.json({
                    status: false,
                    message: "category not exist"
                })
            }else{
                res.statusCode = 200;
                res.json({
                    status: true,           
                    data:{data:result}
                })
            }
        }catch(error){
            res.statusCode = 400;
            console.log('*******'+error);        
            res.json({
                status: false,
                message: error
            })
        }
    }
}

const getAllSubCategory = async (req, res, next) => {
    if (req.method == "GET") {
        try{
            usr_qry = `SELECT * FROM ${dbTable.category} WHERE ${category.isParentCategory}= '0'`;
            let result = await executeQry(usr_qry);
            if(result.length==0){
                res.statusCode = 201;
                res.json({
                    status: false,
                    message: "sub category not found"
                })
            }else{
                res.statusCode = 200;
                res.json({
                    status: true,           
                    data:{data:result}
                })
            }
        }catch(error){
            res.statusCode = 400;
            console.log('*******'+error);        
            res.json({
                status: false,
                message: error
            })
        }
    }
}

const getSubCategoryByParentId = async (req, res, next) => {
    if (req.method == "POST") {
        let parent_category_id = req.body.parent_category_id;

        let result = '';
        const schema = Joi.object().keys({
            parent_category_id: Joi.string().required(),
        });
        const { error, value } = schema.validate({
            parent_category_id: req.query.parent_category_id,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try{
                usr_qry = `SELECT * FROM ${dbTable.category} WHERE ${category.parentCategoryId}= '${parent_category_id}' AND ${category.isProduct}= '1'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    res.statusCode = 201;
                    res.json({
                        status: false,
                        message: "sub category not found"
                    })
                }else{
                    res.statusCode = 200;
                    res.json({
                        status: true,           
                        data:{data:result}
                    })
                }
            }catch(error){
                res.statusCode = 400;
                console.log('*******'+error);        
                res.json({
                    status: false,
                    message: error
                })
            }
        }
    }
}

const addCategory = async (req, res, next) => {
    if (req.method == "POST") {
        let name = req.body.name;
        let image = req.body.image;
        let is_product = req.body.is_product;
        let is_parent_category = req.body.is_parent_category;
        let parent_category_id = req.body.parent_category_id;
        

        let result = '';
        const schema = Joi.object().keys({
            name: Joi.string().max(30).required(),
            image: Joi.string().allow('').required(),
            is_product: Joi.string().required(),
            is_parent_category: Joi.string().required(),
            parent_category_id: Joi.string().allow('').required(),
        });
        const { error, value } = schema.validate({
            name: req.body.name,
            image: req.body.image,
            is_product: req.body.is_product,
            is_parent_category: req.body.is_parent_category,
            parent_category_id: req.body.parent_category_id,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {
                if(is_parent_category=="false"){
                    result =`INSERT INTO ${dbTable.category} (${category.name},${category.image},${category.isParentCategory},
                        ${category.isProduct})
                        values('${name}','${image}', '${is_parent_category=="true"?1:0}', '${is_product=="true"?1:0}')`;
                }else{
                    result =`INSERT INTO ${dbTable.category} (${category.name},${category.image},${category.isParentCategory},
                        ${category.isProduct},${category.parentCategoryId})
                        values('${name}','${image}', '${is_parent_category=="true"?1:0}', '${is_product=="true"?1:0}','${parent_category_id==""?null:parent_category_id}')`;
                }
                result = await executeQry(result);
                res.statusCode = 200;
                res.json({
                    status: true,
                    message: "category add successfully"
                })   
            } catch (error) {
                res.statusCode = 401;
                console.log('*******'+error);        
                res.json({
                    status: false,
                    message: error
                })

            }
        }
    }
}

module.exports = {
    getAllCategory: getAllCategory,
    addCategory:addCategory,
    getAllSubCategory:getAllSubCategory,
    getSubCategoryByParentId:getSubCategoryByParentId
}