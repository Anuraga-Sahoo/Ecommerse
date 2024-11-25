import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 10,
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (productId) => `${PRODUCT_URL}/${productId}`,
      providesTags: (result, error, productId) => [
        {
          type: "Product",
          id: productId,
        },
      ],
    }),

    allProducts: builder.query({
      query: () => `${PRODUCT_URL}/allproducts`,
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
    }),

    getTopProducts: builder.query({
      query: () => `${PRODUCT_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    getNewProducts: builder.query({
      query: () => `${PRODUCT_URL}/new`,
      keepUnusedDataFor: 4,
    }),

    getOurProduct: builder.query({
      query: () => `${PRODUCT_URL}/our-product`,
      keepUnusedDataFor: 5,
    }),

    getFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCT_URL}/filtered-products`,
        method: "POST",
        body: { checked, radio },
      }),
    }),
    getRecommendedProducts: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/recom/${productId}`,
      }),
    }),
    getProductReview: builder.query({
      query: ({ productId, reviewId }) => ({
        url: `${PRODUCT_URL}/${productId}/reviews/${reviewId}`,
      }),
    }),
    updateProductReview: builder.mutation({
      query: ({ productId, reviewId, reviewData }) => ({
        url: `${PRODUCT_URL}/${productId}/reviews/${reviewId}`,
        method: "PUT",
        body: reviewData,
      }),
    }),
    deleteProductReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `${PRODUCT_URL}/${productId}/reviews/${reviewId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAllProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useGetOurProductQuery,
  useGetFilteredProductsQuery,
  useGetRecommendedProductsQuery,
  useGetProductReviewQuery,
  useUpdateProductReviewMutation,
  useDeleteProductReviewMutation,
} = productApiSlice;
