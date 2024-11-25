  import asyncHandler from "../middlewares/asyncHandler.js";
  import Product from "../models/productModel.js";

  const addProduct = asyncHandler(async (req, res) => {
    try {
      const { name, description, price, category, quantity, brand } = req.fields;

      //validation
      switch (true) {
        case !name:
          return res.json({ error: "name is required" });
        case !brand:
          return res.json({ error: "brand is required" });
        case !description:
          return res.json({ error: "description is required" });
        case !price:
          return res.json({ error: "price is required" });
        case !category:
          return res.json({ error: "category is required" });
        case !quantity:
          return res.json({ error: "quantity is required" });
      }
      const product = new Product({ ...req.fields });
      await product.save();
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });

  const updateProductDetails = asyncHandler(async (req, res) => {
    try {
      const { name, description, price, category, quantity, brand } = req.fields;
      //validation

      switch (true) {
        case !name:
          return res.json({ error: "name is required" });
        case !description:
          return res.json({ error: "description is required" });
        case !price:
          return res.json({ error: "price is required" });
        case !category:
          return res.json({ error: "category is required" });
        case !quantity:
          return res.json({ error: "quantity is required" });
        case !brand:
          return res.json({ error: "brand is required" });
      }
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.fields },
        { new: true }
      );
      await product.save();
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });

  const removeProduct = asyncHandler(async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "server error" });
    }
  });

  const fetchProducts = asyncHandler(async (req, res) => {
    try {
      const pageSize = 8;
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          }
        : {};

      const count = await Product.countDocuments({ ...keyword });
      const products = await Product.find({ ...keyword }).limit(pageSize);

      res.json({
        products,
        page: 1,
        pages: Math.ceil(count / pageSize),
        hasMore: false,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "server Error" });
    }
  });

  const fetchProductById = asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        return res.json(product);
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "product not found" });
    }
  });

  const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({})
        .populate("category")
        // .limit(12)
        .sort({ createAt: -1 });

      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "server error" });
    }
  });

  const addProductReview = asyncHandler(async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const product = await Product.findById(req.params.id);

      if (product) {
        const alreadyReviewed = product.reviews.find(
          (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
          res.status(400);
          throw new Error("product already reviewed");
        }
        const review = {
          name: req.user.username,
          rating: Number(rating),
          comment,
          user: req.user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Review added" });
      } else {
        res.status(404);
        throw new Error("product not found");
      }
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });

  const updateProductReview = asyncHandler(async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const productId = req.params.id;
      const reviewId = req.params.reviewId;

      const product = await Product.findById(productId);

      if (product) {
        const reviewIndex = product.reviews.findIndex(
          (r) => r._id.toString() === reviewId
        );

        if (reviewIndex === -1) {
          res.status(404);
          throw new Error("Review not found");
        }

        // Check if the review belongs to the current user
        if (
          product.reviews[reviewIndex].user.toString() !== req.user._id.toString()
        ) {
          res.status(401);
          throw new Error("You are not authorized to update this review");
        }

        // Update review
        product.reviews[reviewIndex].rating = Number(rating);
        product.reviews[reviewIndex].comment = comment;

        // Recalculate product rating
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;

        await product.save();
        res.status(200).json({ message: "Review updated" });
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  });

  const fetchTopProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find().sort({ _rating: -1 }).limit(4);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });

  const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 }).limit(4);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });

  const fetchOurProduct = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 }).limit(8);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });

  const filterProducts = asyncHandler(async (req, res) => {
    try {
      const { checked, radio } = req.body;

      let args = {};
      if (checked.length > 0) {
        args.category = checked;
      }
      if (radio.length) {
        args.price = {
          $gte: radio[0],
          $lte: radio[1],
        };
      }
      const products = await Product.find(args);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });

  const getRecommendedProducts = asyncHandler(async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      const recommendedProducts = await Product.find({
        category: product.category,
        _id: { $ne: productId },
      }).limit(5);

      res.json(recommendedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  });

  const deleteProductReview = asyncHandler(async (req, res) => {
    try {
      const productId = req.params.id;
      const reviewId = req.params.reviewId;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        res.status(404);
        throw new Error("Product not found");
      }
  
      const reviewIndex = product.reviews.findIndex(
        (r) => r._id.toString() === reviewId
      );
  
      if (reviewIndex === -1) {
        res.status(404);
        throw new Error("Review not found");
      }
  
      // Check if the review belongs to the current user
      if (product.reviews[reviewIndex].user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You are not authorized to delete this review");
      }
  
      // Remove review from the array
      product.reviews.splice(reviewIndex, 1);
      product.numReviews = product.reviews.length;
  
      // Recalculate product rating if there are still reviews left
      if (product.reviews.length > 0) {
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
      } else {
        // If no reviews left, set rating to 0
        product.rating = 0;
      }
  
      await product.save();
      res.status(200).json({ message: "Review deleted" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  });


  export {
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
    deleteProductReview
  };
