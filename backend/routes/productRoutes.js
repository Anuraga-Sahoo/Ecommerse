import express from "express";
import formidable from "express-formidable"; //this package used for form data validation
const router = express.Router();
//controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  fetchOurProduct,
  getRecommendedProducts,
  updateProductReview,
  deleteProductReview,
} from "../controllers/productControllers.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);
router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);
router
  .route("/:id/reviews/:reviewId")
  .put(authenticate, checkId, updateProductReview)
  .delete(authenticate, checkId, deleteProductReview);
router.route("/top").get(fetchTopProducts);
router.route("/our-product").get(fetchOurProduct);
router.route("/recom/:id").get(getRecommendedProducts);
router.route("/new").get(fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)

  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;
