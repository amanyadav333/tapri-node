const env = require("dotenv").config();
const mysql = require("mysql");
const con = mysql.createPool({
    connectionLimit : 2000,
    host: 'tapridev.ctj2n9izy3ec.ap-south-1.rds.amazonaws.com',
    user: 'tapriadmin',
    password: 'tapriadmin',
    database: 'tapri',
});

if (con) {
    console.log("Mysql success");
} else {
    console.log("Mysql Failed");
}
module.exports = con;