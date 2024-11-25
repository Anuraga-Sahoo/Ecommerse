import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import Rating from "./Ratings";
import { FaUser } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import moment from "moment";
import { Modal, Input, Select } from "antd";
import {
  useUpdateProductReviewMutation,
  useDeleteProductReviewMutation,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ratingLabels = {
  1: "Inferior",
  2: "Decent",
  3: "Great",
  4: "Excellent",
  5: "Exceptional",
};
const { TextArea } = Input;

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
  reviewEvent,
}) => {
  //use state
  const [activeTab, setActiveTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [updatedRating, setUpdatedRating] = useState("");

  // redux section
  const [updateReview, { isLoading: isUpdatingReview }] =
    useUpdateProductReviewMutation();
  const [deleteReview, { isLoading: isDeletingReview }] =
    useDeleteProductReviewMutation();

  // function section
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getReviewbyId = (reviewId, productId) => {
    setEditReview({ reviewId, productId });
    const review = product.reviews.find((review) => review._id === reviewId);
    if (review) {
      setUpdatedComment(review.comment);
      setUpdatedRating(review.rating.toString());
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
              comment: updatedComment,
              rating: parseInt(updatedRating),
            },
          });

          setIsModalOpen(false);
          toast.success("Review updated successfully");
          reviewEvent();
        } catch (error) {
          console.error("Failed to update review:", error);
          toast.error("Failed to update review.");
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
          await deleteReview({ productId: product._id, reviewId });
          toast.success("Review deleted successfully");
          reviewEvent();
        } catch (error) {
          toast.error("Failed to delete review:");
        }
      }
    });
  };

  return (
    <div className=" flex flex-col md:flex-row">
      <section className=" mr-[5rem]">
        <div
          className={` flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 1 ? "font-bold" : " "
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Reviews
        </div>
        <div
          className={` flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
      </section>

      <section>
        {activeTab === 1 && (
          <div className=" mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className=" block text-xl mb-2">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className=" p-2 border rounded-lg xl:w-[40rem] text-black"
                  >
                    <option value="">select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                <div className="my-2">
                  <label htmlFor="comment" className=" block text-xl mb-2">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className=" p-2 border rounded-lg xl:w-[40rem] text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className=" bg-pink-600 text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                please <Link to="/login">Sign in</Link> to write a review
              </p>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTab === 2 && (
          <>
            <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>
            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className=" bg-green-100 p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5 mt-3 font-poppins"
                >
                  <div className=" flex justify-between">
                    <strong className="text-black font-bold flex items-center gap-4">
                      <FaUser className=" text-xl text-blue-500" size={25} />
                      {review.name}
                    </strong>
                    <p className=" my-4 text-black font-[400] text-sm">
                      {moment(review.createdAt).fromNow()}
                    </p>
                  </div>
                  <p className=" my-4 text-black font-semobold">
                    {review.comment}
                  </p>
                  <Rating value={review.rating} />
                  {userInfo &&
                    review.userId === userInfo.userId && ( // Check if user is authenticated and owns the comment
                      <div className="flex gap-2">
                        <MdEdit
                          size={22}
                          className="text-blue-600 mt-4"
                          onClick={() => {
                            showModal();
                            getReviewbyId(review._id, product._id);
                          }}
                        />
                        <MdDelete
                          size={22}
                          className="text-red-600 mt-4"
                          onClick={() => handleDeleteReview(review._id)}
                        />
                      </div>
                    )}
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <Modal
        title={
          <h1 className=" font-poppins font-bold text-[20px] mb-4">
            Update Comment
          </h1>
        }
        centered
        open={isModalOpen}
        onOk={handleUpdateReview}
        onCancel={handleCancel}
        okText="Update"
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
          placeholder="maxLength is 6"
          // maxLength={6}
          className="rounded-md text-black font-poppins text-[14px] "
          value={updatedComment}
          onChange={(e) => setUpdatedComment(e.target.value)}
        />

        <Select
          defaultValue=""
          style={{ width: 120 }}
          onChange={(value) => setUpdatedRating(value)}
          value={updatedRating}
          className=" mt-2"
        >
          {Object.entries(ratingLabels).map(([value, label]) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default ProductTabs;
