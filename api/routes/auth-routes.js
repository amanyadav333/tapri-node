const express = require("express");
// const AWS = require("aws-sdk");
const path = require('path');
const multer = require('multer');
const user  = require("../controllers/user");
const category  = require("../controllers/category");
const product  = require("../controllers/product");
const dashboard  = require("../controllers/dashboard");
const cart  = require("../controllers/cart");

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
router.post("/addFoodProducts", product.addFoodProducts);
router.post("/updateFoodProducts", product.updateFoodProducts);
router.get("/checkUserExist", user.checkUserExist);
router.get("/getAllCategory", category.getAllCategory);
router.post("/addCategory", category.addCategory);
router.post("/getDashBoardData", dashboard.getDashBoardData);
router.post("/getFoodProductsByCategory", product.getFoodProductsByCategory);
router.post("/addToCart", cart.addToCart);
router.post("/getCart", cart.getCart);
router.post("/removeToCart", cart.removeToCart);
router.post("/updateCartQuantity", cart.updateCartQuantity);
router.post("/deleteFoodProducts", product.deleteFoodProducts);

module.exports = {
  "routes": router
};
