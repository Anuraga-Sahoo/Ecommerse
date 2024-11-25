import React from "react";
import HeartIcon from "./HeartIcon.jsx";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SmallProduct = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className=" overflow-auto p-2 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105  duration-300">
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
          image={product.image}
          alt="Paella dish"
          onClick={() => navigate(`/product/${product._id}`)}
        />
        <CardContent>
          <h5 className="mb-2 text-xl text-black dark:text-black font-poppins font-semibold">
            {product?.name.substring(0, 25)}
          </h5>

          <Typography className="text-black font-bold font-poppins text-md">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className=" justify-between">
          <IconButton
            aria-label="add to favorites"
            // className=" -top-3 -right-5"
          >
            <HeartIcon product={product} />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default SmallProduct;
