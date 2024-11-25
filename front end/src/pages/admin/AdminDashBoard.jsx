import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
  useProductSoldByCategoryQuery,
  useGetPaymentStatusQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { FaUsers } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { Divider } from "antd";
import moment from "moment";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();
  const { data: soldDetails } = useProductSoldByCategoryQuery();
  const { data: paymentStatus } = useGetPaymentStatusQuery();
  console.log("payment status", paymentStatus);

  const [state, setState] = useState({
    options: {
      chart: {
        type: "bar",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Category",
        },
      },
      yaxis: {
        title: {
          text: "Order",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  const [pieChartState, setPieChartState] = useState({
    options: {
      chart: {
        type: "donut",
        width: "200",
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'center'
          }
        }
      }],
      labels: [],
    },
    series: [],
  });

  const [lineChartState, setLineChartState] = useState({
    options: {
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#9600e3"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Details",
        align: "left",
      },

      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      // legend: {
      //   position: "top",
      //   horizontalAlign: "right",
      //   floating: true,
      //   offsetY: -25,
      //   offsetX: -5,
      // },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: moment(item._id).format('DD MMM'),
        y: item.totalSales,
      }));
      console.log(salesDetail)

      setLineChartState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  useEffect(() => {
    if (soldDetails) {
      const formattedSoldDetails = soldDetails.map((item) => ({
        x: item._id,
        y: item.orderCount,
      }));
      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSoldDetails.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSoldDetails.map((item) => item.y) },
        ],
      }));
    }
  }, [soldDetails]);

  useEffect(() => {
    if (paymentStatus) {
      setPieChartState({
        options: {
          labels: [
            "Paid Orders",
            "Unpaid Orders",
            "Delivered Items",
            "Undelivered Items",
          ],
        },
        series: [
          paymentStatus.paidOrders,
          paymentStatus.unpaidOrders,
          paymentStatus.deliveredItems,
          paymentStatus.undeliveredItems,
        ],
      });
    }
  }, [paymentStatus]);

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="w-[90%] flex gap-6 ml-[3rem] flex-wrap">
          <div className="rounded-lg bg-green-200 p-5 w-[25rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-green-400 text-center p-3">
              <span className=" text-black font-bold text-[18px]">₹</span>
            </div>

            <p className="mt-5 font-poppins font-semibold">Sales</p>
            <h1 className="text-xl font-bold">
              ₹ {isLoading ? <Loader /> : sales?.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-orange-200 p-5 w-[25rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-orange-400 items-center p-4">
              <FaUsers size={18} />
            </div>

            <p className="mt-5 font-poppins font-semibold">Customers</p>
            <h1 className="text-xl font-bold">
              {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-blue-200 p-5 w-[25rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-blue-400 text-center p-4">
              <MdSell size={18} />
            </div>

            <p className="mt-5 font-poppins font-semibold">All Orders</p>
            <h1 className="text-xl font-bold">
              {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className=" container md:w-[80%] w-[100%]">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="70%"
          />
      
        </div>
        <div className="mx-[10%] grid md:grid-cols-[2fr_1fr] grid-cols-1 h-[500px]">
        <div className="">
          <Chart
            options={lineChartState.options}
            series={lineChartState.series}
            type="line"
            width="100%"
            height="100%"
          />
        </div>
        <div className="">
          <Chart
            options={pieChartState.options}
            series={pieChartState.series}
            type="donut"
            width="100%"
            height="100%"
            
          />
        </div>
        </div>
        <hr
          style={{ opacity: 4, height: "5px", width: "90%", margin: "auto" }}
          className=" text-gray-600"
        />

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
