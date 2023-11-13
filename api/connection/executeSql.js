const con = require("./connection");

let executeQry = function executeSqlQuery(qry) {
    return new Promise((resolve, reject) => {
        con.query(qry, function (err, result) {
            if (err) {
                console.log("inside getDatafromDB rejected");
                console.log(err);
                reject(err.sqlMessage);
            } else {
                console.log("inside getDatafromDB resolved");
                resolve(result);
            }
        });
    });
};

module.exports = executeQry;
