import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const CartCardV2 = ({ product, qtyAction, removeAction }) => {
  return (
    <div className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
      <div className="shrink-0 relative">
        <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
          {product.qty}
        </span>
        <img
          className="h-24 w-24 max-w-full rounded-lg object-contain"
          src={product.image}
          alt="product image"
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-between">
        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
          <div className="pr-8 sm:pr-5">
            <p className="text-base font-semibold text-gray-900">
              {product.name}
            </p>
            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
              {product.brand}
            </p>
          </div>

          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
              ₹ {product.price.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto items-center">
          <button
            onClick={() => {
              if (product.qty < product.countInStock)
                qtyAction(product.qty + 1);
            }}
            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
          >
            <FaPlus />
          </button>
          <button
            onClick={() => {
              if (product.qty > 1) qtyAction(product.qty - 1);
            }}
            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
          >
            <FaMinus />
          </button>
          <button
            type="button"
            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
            onClick={() => removeAction()}
          >
            <ImCross />
          </button>
        </div>
        {product.qty == product.countInStock && (
          <p className="text-sm text-red-500">product out of stock</p>
        )}
      </div>
    </div>
  );
};

export default CartCardV2;
