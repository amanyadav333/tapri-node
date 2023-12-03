const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { cart,products,dbTable } = require("../utils/constant");

const addToCart = async (req, res, next) => {
    if (req.method == "POST") {
        let product_id = req.body.product_id;
        let spiceness = req.body.spiceness;
        let quantity = req.body.quantity;
        let add_sauce = req.body.add_sauce;
        let user_id = req.body.user_id;
        let comment = req.body.comment;
        let result = '';
        const schema = Joi.object().keys({
            spiceness: Joi.string().allow("").required(),
            quantity: Joi.string().allow("").required(),
            add_sauce: Joi.string().allow("").required(),
            comment: Joi.string().allow("").required(),
            user_id: Joi.string().required(),
            product_id: Joi.string().required(),
        });
        const { error, value } = schema.validate({
            spiceness: req.body.spiceness,
            quantity: req.body.quantity,
            add_sauce: req.body.add_sauce,
            comment: req.body.comment,
            product_id: req.body.product_id,
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
                let usr_qry = `SELECT * FROM ${dbTable.cart} WHERE ${cart.productId} = '${product_id}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    var dateTime = new Date();
                    let date=dateTime.toISOString().split('T')[0] + ' '+ dateTime.toTimeString().split(' ')[0];

                    result =`INSERT INTO ${dbTable.cart} (${cart.productId},${cart.userId},${cart.spiceness},
                        ${cart.quantity},${cart.addSauce},${cart.comment},${cart.created})
                        values('${product_id}','${user_id}', '${spiceness}','${quantity}','${add_sauce}', 
                        '${comment}','${date}')`;
                    result = await executeQry(result);
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        message: "Cart add successfully"
                    })
                }else{
                    res.statusCode = 201;
                    res.json({
                        status: true,
                        message: "cart item already added"
                    })
                }
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

const removeToCart = async (req, res, next) => {
    if (req.method == "POST") {
        let cart_id = req.body.cart_id;
        let result = '';
        const schema = Joi.object().keys({
            cart_id: Joi.string().required(),
        });
        const { error, value } = schema.validate({
            cart_id: req.body.cart_id,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {

                result =`DELETE FROM ${dbTable.cart} WHERE ${cart.id} = '${cart_id}'`;
                
                result = await executeQry(result);
                res.statusCode = 200;
                res.json({
                    status: true,
                    message: "Cart remove successfully"
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

const updateCartQuantity = async (req, res, next) => {
    if (req.method == "POST") {
        let cart_id = req.body.cart_id;
        let quantity = req.body.quantity;
        let result = '';
        const schema = Joi.object().keys({
            cart_id: Joi.string().required(),
            quantity: Joi.string().required(),
        });
        const { error, value } = schema.validate({
            cart_id: req.body.cart_id,
            quantity: req.body.quantity,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {
                if(quantity==0){
                    result =`DELETE FROM ${dbTable.cart} WHERE ${cart.id} = '${cart_id}'`;
                
                    result = await executeQry(result);
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        message: "Cart update successfully"
                    })
                }else{
                    result =`UPDATE ${dbTable.cart} SET ${cart.quantity} = '${quantity}'  WHERE ${cart.id} = '${cart_id}'`;
                
                    result = await executeQry(result);
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        message: "Cart update successfully"
                    })
                }
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

const getCart = async (req, res, next) => {
    if (req.method == "POST") {
        let user_id = req.body.user_id;
        let result = '';
        const schema = Joi.object().keys({
            user_id: Joi.string().required(),
        });
        const { error, value } = schema.validate({
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
                let usr_qry = `SELECT * FROM ${dbTable.cart} WHERE ${cart.userId} = '${user_id}'`;
                let result = await executeQry(usr_qry);
                if(result.length==0){
                    res.statusCode = 201;
                    res.json({
                        status: false,
                        message: "No cart found"
                    })
                }else{
                    for(let i=0;i<result.length;i++){
                        let usr_qry = `SELECT * FROM ${dbTable.products} WHERE ${products.id} = '${result[i]["product_id"]}'`;
                        let result2 = await executeQry(usr_qry);
                        result[i]["product"]=result2[0];
                    }    
                    res.statusCode = 200;
                    res.json({
                        status: true,
                        data: {data:result}
                    })
                }
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
    removeToCart: removeToCart,
    addToCart: addToCart,
    updateCartQuantity: updateCartQuantity,
    getCart:getCart
}
