import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { Modal, Input, Select } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

import Ratings from "../pages/products/Ratings";
import {
  useCreateReviewMutation,
  useDeleteProductReviewMutation,
  useUpdateProductReviewMutation,
} from "../redux/api/productApiSlice";
import avatar from "../assets/avatar.svg";

const { TextArea } = Input;
const ratingLabels = {
  1: "Inferior",
  2: "Decent",
  3: "Great",
  4: "Excellent",
  5: "Exceptional",
};

const ReviewSection = ({ product, productId, userInfo, reviewEvent }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  const [editReview, setEditReview] = useState(null);
  const [viewAll, setViewAll] = useState(true);
  const [reviewCount, setReviewCount] = useState(4);

  // redux section
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdatingReview }] =
    useUpdateProductReviewMutation();
  const [deleteReview, { isLoading: isDeletingReview }] =
    useDeleteProductReviewMutation();

  const getReviewbyId = (reviewId, productId) => {
    setEditReview({ reviewId, productId });
    const review = product.reviews.find((review) => review?._id === reviewId);
    if (review) {
      setComment(review.comment);
      setRating(review.rating.toString());
    }
  };

  const handleCreateReview = async () => {
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      setIsModalOpen(false);
      toast.success("Review create Successfully");
      reviewEvent();
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const handleUpdateReview = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateReview({
            productId: editReview.productId,
            reviewId: editReview.reviewId,
            reviewData: {
              comment: comment,
              rating: parseInt(rating),
            },
          });

          setIsModalOpen(false);
          toast.success("Review updated successfully");
          reviewEvent();
        } catch (error) {
          console.error("Failed to update review:", error);
          toast.error("Failed to update review.");
        } finally {
          setIsUpdate(false);
        }
      }
    });
  };

  const handleDeleteReview = async (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteReview({ productId: product?._id, reviewId });
          toast.success("Review deleted successfully");
          reviewEvent();
        } catch (error) {
          toast.error("Failed to delete review:");
        }
      }
    });
  };

  return (
    <section>
      <div className="w-full px-10 border-l-2 border-r-2">
        <div className="flex items-center justify-between pb-4 border-b-2">
          <h1 className="font-bold text-xl">
            Recent Reviews {`(${product?.reviews.length})`}
          </h1>
          <button
            className="px-3 py-2 rounded-sm shadow-md border-2 font-semibold"
            onClick={() => setIsModalOpen(true)}
          >
            Add Review
          </button>
        </div>
        {product?.reviews.length > 0 ? (
          product?.reviews?.map((review, index) => {
            if (index <= reviewCount) {
              return (
                <div className="w-full flex flex-wrap py-10 border-b-2">
                  <div className="basis-2/6 flex flex-col gap-3">
                    <span className="capitalize font-poppins flex gap-2 items-center">
                      <img
                        src={avatar}
                        className=" text-white text-[20px] w-[30px] h-[30px]"
                      />
                      {review.name}
                    </span>
                    <span className="text-gray-600">
                      {moment(review.createdAt).fromNow()}
                    </span>
                  </div>
                  <div className="basis-4/6">
                    <div className="mb-4 flex gap-3 items-center">
                      <Ratings value={review.rating} />
                      {userInfo?._id == review.user && (
                        <div className="flex items-center gap-1">
                          <MdEdit
                            size={22}
                            className="text-gray-700 cursor-pointer"
                            onClick={() => {
                              setIsUpdate(true);
                              setIsModalOpen(true);
                              getReviewbyId(review?._id, product?._id);
                            }}
                          />
                          <MdDelete
                            size={22}
                            className="text-gray-700 cursor-pointer"
                            onClick={() => handleDeleteReview(review?._id)}
                          />
                        </div>
                      )}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="flex items-center justify-center text-gray-500 font-mono font-semibold">
            No reviews yet, add a review.
          </div>
        )}
        {product?.reviews?.length >= reviewCount && (
          <span
            className="text-blue-600 font-mono cursor-pointer"
            onClick={() => {
              setViewAll((value) => !value);
              if (viewAll) {
                setReviewCount(product?.reviews.length);
              } else {
                setReviewCount(4);
              }
            }}
          >
            {viewAll ? "View All" : "View Less"}
          </span>
        )}
      </div>

      <Modal
        title={
          <h1 className=" font-poppins font-bold text-[20px] mb-4">
            {isUpdate ? <span>Update Comment</span> : <span>Add Comment</span>}
          </h1>
        }
        centered
        open={isModalOpen}
        onOk={() => {
          if (isUpdate) {
            handleUpdateReview();
          } else {
            handleCreateReview();
          }
        }}
        onCancel={() => {
          setIsModalOpen(false);
          setIsUpdate(false);
        }}
        okText={isUpdate ? "Update" : "Add"}
        okButtonProps={{
          style: {
            background: "#32de84",
            borderColor: "green",
            border: "transparent",
          },
        }}
        className=""
      >
        <TextArea
          rows={4}
          placeholder="Write Your review :)"
          // maxLength={6}
          className="rounded-md text-black font-poppins text-[14px] "
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Select
          defaultValue=""
          style={{ width: 120 }}
          onChange={(value) => setRating(value)}
          value={rating}
          className=" mt-2"
        >
          {Object.entries(ratingLabels).map(([value, label]) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </section>
  );
};

export default ReviewSection;
