const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { category,products,dbTable } = require("../utils/constant");
const {uploadS3} = require("../connection/s3client");

const getDashBoardData = async (req, res, next) => {
    if (req.method == "POST") {
        let user_id = req.body.user_id;
        let result = '';
        let data = {};
        const schema = Joi.object().keys({
            user_id: Joi.string().allow("").required(),
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
                usr_qry = `SELECT * FROM ${dbTable.category}`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["category"]=result;
                }
                usr_qry = `SELECT * FROM ${dbTable.products} WHERE ${products.userId} != '${user_id}' LIMIT 5`;
                result = await executeQry(usr_qry);
                if(result.length!=0){
                    data["product"]=result;
                }
                res.statusCode = 200;
                res.json({
                    status: true,
                    data: data
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
    getDashBoardData:getDashBoardData,
}