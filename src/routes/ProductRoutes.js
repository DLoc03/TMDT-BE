const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/ProductsController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddelware");

router.post("/create-product", ProductsController.createProduct);
router.put("/update-product/:id", ProductsController.updateProduct);
router.delete(
  "/delete-product/:id",
  //   authMiddleWare,
  ProductsController.deleteProduct
);
router.get(
  "/get-allProduct",
  //   authMiddleWare,
  ProductsController.getAllProducts
);
router.get(
  "/get-product/:id",
  //   authUserMiddleWare,
  ProductsController.getProductDetail
);

module.exports = router;
