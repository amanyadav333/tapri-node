const Joi = require("joi");
const executeQry = require("../connection/executeSql");
const { category,dbTable } = require("../utils/constant");
const {uploadS3} = require("../connection/s3client");

const getAllCategory = async (req, res, next) => {
    if (req.method == "GET") {
        try{
            usr_qry = `SELECT * FROM ${dbTable.category}`;
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

const addCategory = async (req, res, next) => {
    if (req.method == "POST") {
        let name = req.body.name;
        let image = req.body.image;
        

        let result = '';
        const schema = Joi.object().keys({
            name: Joi.string().max(30).required(),
            image: Joi.string().allow('').required(),
        });
        const { error, value } = schema.validate({
            name: req.body.name,
            image: req.body.image,
        }) 
        if(error){
            res.statusCode = 201;
            res.json({
                status: false,
                message: error.details[0].message
            })
        }else{
            try {
                result =`INSERT INTO ${dbTable.category} (${category.name},${category.image})
                        values('${name}','${image}')`;
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
    addCategory:addCategory
}