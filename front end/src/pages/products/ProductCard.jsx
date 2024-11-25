import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon.jsx";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden p-1 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-300">
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: 3,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          style={{
            height: "365px",
            width: "320px",
            objectFit: "contain",
            margin: "auto",
            marginTop: "10px",
          }}
          image={p?.image}
          alt="Paella dish"
          onClick={() => navigate(`/product/${p._id}`)}
        />
        <CardContent style={{ padding: "10px" }}>
          <h5
            className="mb-2 text-xl text-black dark:text-black font-poppins font-semibold"
            onClick={() => navigate(`/product/${p._id}`)}
          >
            {p?.name.substring(0, 25)}...
          </h5>

          <Typography
            className="text-black font-bold font-poppins text-md"
            style={{
              fontSize: "18px",
              fontWeight: "600",
            }}
            onClick={() => navigate(`/product/${p._id}`)}
          >
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </Typography>
          <Typography
            className=" font-poppins font-semibold"
            onClick={() => navigate(`/product/${p._id}`)}
          >
            {p?.description?.substring(0, 60)} ...
          </Typography>
        </CardContent>
        <CardActions disableSpacing className=" justify-between">
          <IconButton aria-label="add to favorites">
            <HeartIcon product={p} />
          </IconButton>
          <IconButton aria-label="cart" onClick={() => addToCartHandler(p, 1)}>
            <FaShoppingCart size={25} className=" text-gray-400" />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
