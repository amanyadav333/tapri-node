var express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const authRoutes = require("./api/routes/auth-routes");
var logger = require("morgan");
var cors = require('cors');
var app = express();
require('dotenv').config();

const PORT=process.env.PORT || 8036;


app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(logger("dev"));
app.use(cors());

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
//-------------------------------
app.use("/",authRoutes.routes);


var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
//    console.log(process.env.TWILIO_ACCOUNT_SID);

   console.log("Example app listening at http://%s:%s", host, port)
})