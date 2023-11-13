const express = require("express");
// const AWS = require("aws-sdk");
const path = require('path');
const multer = require('multer');
const user  = require("../controllers/user");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
})

const upload = multer({ storage: storage});
const router = express.Router();
router.use(multer().single('file'));

router.post("/signup", user.signup);
router.post("/login", user.login);
router.get("/checkUserExist", user.checkUserExist);

module.exports = {
  "routes": router
};
