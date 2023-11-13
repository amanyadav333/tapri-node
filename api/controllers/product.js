const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { category,products,dbTable } = require("../utils/constant");

const addProducts = async (req, res, next) => {
    if (req.method == "POST") {
        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
        let quantity = req.body.quantity;
        let is_product = req.body.is_product;
        let parent_category_id = req.body.parent_category_id;
        let child_category_id = req.body.child_category_id;
        let user_id = req.body.user_id;
        let product_code = req.body.product_code;
        let delivery_time = req.body.delivery_time;
        let image = req.body.image;
        let result = '';
        const schema = Joi.object().keys({
            name: Joi.string().max(100).required(),
            description: Joi.string().max(255).required(),
            price: Joi.string().allow("").required(),
            quantity: Joi.string().allow("").required(),
            is_product: Joi.string().required(),
            parent_category_id: Joi.string().required(),
            user_id: Joi.string().required(),
            product_code: Joi.string().allow("").required(),
            delivery_time: Joi.string().allow("").required(),
        });
        const { error, value } = schema.validate({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            is_product: req.body.is_product,
            parent_category_id: req.body.parent_category_id,
            user_id: req.body.user_id,
            product_code: req.body.product_code,
            delivery_time: req.body.delivery_time,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {
                console.log(child_category_id);
                var dateTime = new Date();
                let date=dateTime.toISOString().split('T')[0] + ' '+ dateTime.toTimeString().split(' ')[0];
                var unique_id=name+dateTime.getMilliseconds;

                if(child_category_id==undefined || child_category_id==""){
                    result =`INSERT INTO ${dbTable.products} (${products.name},${products.description},${products.price},
                        ${products.quantity},${products.isProduct},${products.isActive},${products.created},
                        ${products.unique_id},${products.parentCategoryId},${products.userId}
                        ,${products.image},${products.productCode},${products.deliveryTime})
                        values('${name}','${description}', '${price}', '${quantity}','${is_product=="true"?1:0}','1','${date}', 
                        '${unique_id}','${parent_category_id}','${user_id}','${image}','${product_code}','${delivery_time}')`;
    
                }else{
                    result =`INSERT INTO ${dbTable.products} (${products.name},${products.description},${products.price},
                        ${products.quantity},${products.isProduct},${products.isActive},${products.created},
                        ${products.unique_id},${products.parentCategoryId},${products.childCategoryId},${products.userId}
                        ,${products.image},${products.productCode},${products.deliveryTime})
                        values('${name}','${description}', '${price}', '${quantity}','${is_product=="true"?1:0}','1','${date}', 
                        '${unique_id}','${parent_category_id}','${child_category_id}','${user_id}','${image}','${product_code}','${delivery_time}')`;    
                }
                
                result = await executeQry(result);
                res.statusCode = 200;
                res.json({
                    status: true,
                    message: "Product add successfully"
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

const getAllProducts = async (req, res, next) => {
    if (req.method == "GET") {
        try{
            usr_qry = `SELECT * FROM ${dbTable.products}`;
            let result = await executeQry(usr_qry);
            res.statusCode = 200;
            if(result.length==0){
                res.statusCode = 201;
                res.json({
                    status: false,
                    message: "No products found"
                })
            }else{
                res.statusCode = 200;
                res.json({
                    status: true,
                    data: result
                })
            }
        }catch(error){
            res.statusCode = 401;
            console.log('*******'+error.message);        
            res.json({
                status: false,
                message: error
            })
        }
    }
}

const getProductsByCategory = async (req, res, next) => {
    if (req.method == "POST") {
        let category_id = req.body.category_id;
        let result = '';
        const schema = Joi.object().keys({
            category_id: Joi.string().required()
        });
        const { error, value } = schema.validate({
            category_id: req.body.category_id
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try{
                let usr_qry = `SELECT * FROM ${dbTable.products} WHERE ${products.parentCategoryId}= '${category_id}' OR ${products.childCategoryId}= '${category_id}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    res.statusCode = 201;
                    res.json({
                        status: false,
                        message: "No products found"
                    })
                }else{
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        data: {data:result}
                    })
                }
            }catch(error){
                res.statusCode = 401;
                console.log('*******'+error.message);        
                res.json({
                    status: false,
                    message: error
                })
            }
        }
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    addProducts:addProducts,
    getProductsByCategory:getProductsByCategory
}