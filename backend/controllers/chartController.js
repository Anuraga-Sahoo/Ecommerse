import Order from "../models/orderModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const deliveryAndPaymentStatus = asyncHandler(async (req, res) => {
  try {
    const allOrderDocuments = await Order.find();

    const paidOrders = allOrderDocuments.filter(
      (order) => order.isPaid == true
    ).length;
    const unpaidOrders = allOrderDocuments.filter(
      (order) => order.isPaid == false
    ).length;

    const deliveredItems = allOrderDocuments.filter(
      (order) => order.isDelivered == true
    ).length;
    const undeliveredItems = allOrderDocuments.filter(
      (order) => order.isDelivered == false
    ).length;

    if (!paidOrders && !unpaidOrders && !deliveredItems && !undeliveredItems) {
      return res.status(404).json({ error: "unable to fetch some items" });
    }
    return res.status(200).json({
      paidOrders: paidOrders,
      unpaidOrders: unpaidOrders,
      deliveredItems: deliveredItems,
      undeliveredItems: undeliveredItems,
    }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const productSoldByCategory = asyncHandler(async (req, res) => {
  try {
    const categoryOrderCounts = await Order.aggregate([
      // Unwind orderItems array to work with individual order items
      { $unwind: "$orderItems" },
      // Lookup product details for each order item
      {
        $lookup: {
          from: "products", // Name of the product collection
          localField: "orderItems.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      // Unwind productDetails array (in case there are multiple products)
      { $unwind: "$productDetails" },
      // Lookup category details for each product
      {
        $lookup: {
          from: "categories", // Name of the category collection
          localField: "productDetails.category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },

      // Unwind categoryDetails array (each product should be associated with one category)
      { $unwind: "$categoryDetails" },
      // Group by category and count the number of orders per category
      {
        $group: {
          _id: "$categoryDetails.name",
          orderCount: { $sum: 1 }, // Count each order
        },
      },
      // Project to rename fields and format output
      {
        $project: {
          category: "$_id",
          orderCount: 1,
        },
      },
    ]);

    res.status(200).json(categoryOrderCounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { deliveryAndPaymentStatus, productSoldByCategory };
