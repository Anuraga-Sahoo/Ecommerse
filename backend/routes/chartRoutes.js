import express from "express";
import {
  deliveryAndPaymentStatus,
  productSoldByCategory,
} from "../controllers/chartController.js";

const router = express.Router();

router.route("/order-status").get(deliveryAndPaymentStatus);
router.route("/category-sales").get(productSoldByCategory);
export default router;
