import React from "react";
import { Table, Tag, Pagination, Button } from "antd";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const navigate = useNavigate();

  const columns = [
    {
      title: (
        <span className=" font-poppins font-bold xl:ml-2">
          {"Image".toUpperCase()}
        </span>
      ),
      dataIndex: "orderItems",
      key: "orderItems",
      render: (orderItems) => (
        <img
          src={orderItems[0].image}
          style={{
            borderRadius: "10px",
            width: "80px",
            height: "80px",
            marginLeft: "10px",
            objectFit: "contain",
          }}
          alt="order"
        />
      ),
    },
    {
      title: (
        <span className=" font-poppins font-bold xl:ml-2">
          {"Order Id".toUpperCase()}
        </span>
      ),
      dataIndex: "_id",
      key: "_id",
      render: (_id) => <span className=" font-poppins font-[400]">{_id}</span>,
    },
    {
      title: (
        <span className=" font-poppins font-bold xl:ml-2">
          {"User".toUpperCase()}
        </span>
      ),
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <span className="font-poppins font-[400]">
          {user && user.username ? user.username : "N/A"}
        </span>
      ),
    },
    {
      title: (
        <span className=" font-poppins font-bold xl:ml-2">
          {"Date".toUpperCase()}
        </span>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span className="font-poppins font-[400]">
          {createdAt ? createdAt.substring(0, 10) : "N/A"}
        </span>
      ),
    },
    {
      title: (
        <span className=" font-poppins font-bold xl:ml-2">
          {"Total".toUpperCase()}
        </span>
      ),
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => (
        <span className="font-poppins font-[400]">{`₹ ${totalPrice}`}</span>
      ),
    },
    {
      title: (
        <span className=" font-poppins font-bold xl:ml-2">
          {"Paid".toUpperCase()}
        </span>
      ),
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid) => (
        <Button
          className={
            isPaid
              ? "bg-green-400 text-white font-medium font-poppins"
              : " bg-red-500 text-white font-medium font-poppins"
          }
        >
          {isPaid ? "Completed" : "Pending"}
        </Button>
      ),
    },
    {
      title: (
        <span className=" font-poppins font-bold xl:ml-2">
          {"Delivered".toUpperCase()}
        </span>
      ),
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered) => (
        <Button
          className={
            isDelivered
              ? "bg-green-400 text-white font-medium font-poppins"
              : " bg-red-500 text-white font-medium font-poppins"
          }
        >
          {isDelivered ? "Completed" : "Pending"}
        </Button>
      ),
    },
  ];
  const handleRowClick = (record) => {
    navigate(`/order/${record._id}`);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <AdminMenu />
          <Table
            columns={columns}
            dataSource={orders}
            rowKey={(record) => record._id}
            onRow={(record) => ({
              onClick: () => {
                handleRowClick(record);
              },
            })}
            style={{ margin: "0 45px 0 50px" }}
            pagination={{
              pageSize: 5,

              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              style: {
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              },
            }}
          />
        </>
      )}
    </>
  );
};

export default OrderList;
