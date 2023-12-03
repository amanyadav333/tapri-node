const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { category,products,dbTable } = require("../utils/constant");

const addFoodProducts = async (req, res, next) => {
    if (req.method == "POST") {
        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
        let category_id = req.body.category_id;
        let user_id = req.body.user_id;
        let image = req.body.image;
        let result = '';
        const schema = Joi.object().keys({
            name: Joi.string().max(100).required(),
            description: Joi.string().max(255).required(),
            price: Joi.string().required(),
            category_id: Joi.string().required(),
            user_id: Joi.string().required(),
        });
        const { error, value } = schema.validate({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category_id,
            user_id: req.body.user_id,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {
                var dateTime = new Date();
                let date=dateTime.toISOString().split('T')[0] + ' '+ dateTime.toTimeString().split(' ')[0];

                result =`INSERT INTO ${dbTable.products} (${products.name},${products.description},${products.price},
                    ${products.isActive},${products.created},${products.categoryId},${products.userId},${products.image})
                    values('${name}','${description}', '${price}','1','${date}', 
                    '${category_id}','${user_id}','${image}')`;
                
                result = await executeQry(result);
                res.statusCode = 200;
                res.json({
                    status: true,
                    message: "Product update successfully"
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

const updateFoodProducts = async (req, res, next) => {
    if (req.method == "POST") {
        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
        let category_id = req.body.category_id;
        let food_product_id = req.body.food_product_id;
        let image = req.body.image;
        let result = '';
        const schema = Joi.object().keys({
            name: Joi.string().max(100).required(),
            description: Joi.string().max(255).required(),
            price: Joi.string().required(),
            category_id: Joi.string().required(),
            food_product_id: Joi.string().required(),
        });
        const { error, value } = schema.validate({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category_id,
            food_product_id: req.body.food_product_id,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {
                
                result = `update  ${dbTable.products} SET ${products.name} ='${name}' , ${products.description} ='${description}',
                ${products.price} ='${price}' , ${products.categoryId} ='${category_id}',${products.image} ='${image}'
                 WHERE  ${products.id} ='${food_product_id}'`;
                result = await executeQry(result);
            
                res.statusCode = 200;
                res.json({
                    status: true,
                    message: "Product update successfully"
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

const deleteFoodProducts = async (req, res, next) => {
    if (req.method == "POST") {
        let food_product_id = req.body.food_product_id;
        let result = '';
        const schema = Joi.object().keys({
            food_product_id: Joi.string().required(),
        });
        const { error, value } = schema.validate({
            food_product_id: req.body.food_product_id,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {
                
                result = `DELETE FROM  ${dbTable.products} WHERE ${products.id} = '${food_product_id}'`;
                result = await executeQry(result);
            
                res.statusCode = 200;
                res.json({
                    status: true,
                    message: "Product delete successfully"
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


const getAllFoodProducts = async (req, res, next) => {
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

const getFoodProductsByCategory = async (req, res, next) => {
    if (req.method == "POST") {
        let category_id = req.body.category_id;
        let user_id = req.body.user_id;
        let result = '';
        const schema = Joi.object().keys({
            category_id: Joi.string().required(),
            user_id: Joi.string().required()
        });
        const { error, value } = schema.validate({
            category_id: req.body.category_id,
            user_id: req.body.user_id
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try{
                let usr_qry = `SELECT * FROM ${dbTable.products} WHERE ${products.categoryId} = '${category_id}' AND ${products.userId}!= '${user_id}'`;
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
    getAllFoodProducts: getAllFoodProducts,
    addFoodProducts:addFoodProducts,
    getFoodProductsByCategory:getFoodProductsByCategory,
    updateFoodProducts:updateFoodProducts,
    deleteFoodProducts:deleteFoodProducts
}