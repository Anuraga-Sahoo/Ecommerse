import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { Button, Dropdown, Checkbox, Input, Space } from "antd";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./products/ProductCard";
import { TbCategory2 } from "react-icons/tb";
import { TbBrandDatabricks } from "react-icons/tb";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import ProductCarcV2 from "../components/ProductCarcV2";
const { Search } = Input;

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoryItems = categories.map((category) => ({
    key: category._id,
    label: (
      <div>
        <Checkbox onChange={(e) => handleCheck(e.target.checked, category._id)}>
          {category.name}
        </Checkbox>
      </div>
    ),
  }));

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  console.log("products data", products);
  console.log("search keyword", searchKeyword);
  console.log("filtered data", filteredData);
  
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      } else {
        // If the filteredProductsQuery is still loading, set the products state to an empty array
        dispatch(setProducts([]));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setFilteredData(products);
    } else {
      const filteredByName = products.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredData(filteredByName);
    }
  }, [searchKeyword, products]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <section className="pl-[4%]">
      {/* filter product */}
      <div className=" flex justify-center items-center px-2 py-4 gap-3">
        <h1 className=" font-poppins font-bold flex items-center justify-center">
          Filter Products:{" "}
        </h1>
        <Dropdown
          menu={{
            items: categoryItems,
          }}
          placement="bottomLeft"
          arrow
        >
          <Button
            type="primary"
            className=" font-poppins font-semibold  text-black shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-100  duration-300 flex justify-center items-center gap-2"
          >
            By Catgories
            <TbCategory2 size={16} />
          </Button>
        </Dropdown>

        <Dropdown
          menu={{
            items: uniqueBrands?.map((brand) => ({
              key: brand,
              label: (
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={brand}
                    className="ml-2 text-sm font-medium text-black dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              ),
            })),
          }}
          placement="bottom"
          arrow
        >
          <Button
            type="primary"
            className="font-poppins font-semibold text-black shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300
            flex justify-center items-center gap-2"
          >
            By Brands
            <TbBrandDatabricks size={16} />
          </Button>
        </Dropdown>

        <Dropdown
          overlay={
            <div className="">
              <Input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="  py-2 placeholder-gray-400 border rounded-lg  "
              />
            </div>
          }
          placement="bottomCenter"
          arrow
          input
        >
          <Button
            type="primary"
            className=" font-poppins font-semibold  text-black shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-100  duration-300 flex justify-center items-center gap-2"
          >
            By price
            <MdOutlineCurrencyRupee size={16} />
          </Button>
        </Dropdown>
        <Button
          type="danger"
          className=" font-poppins font-semibold  text-black shadow-lg transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-100  duration-300 hover:bg-red-500 hover:text-white"
          onClick={() => window.location.reload()}
        >
          Reset FIlter
        </Button>
        <Input
          style={{ width: "20%", borderRadius: "10px", height: "35px" }}
          type="text"
          placeholder="search products here .."
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      <div className="w-full flex justify-center">
        <div className=" ">
          <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {products?.length === 0 ? (
              <div className="flex w-full h-full items-center justify-center">
                <Loader />
              </div>
            ) : (
              filteredData?.map((p) => (
                <div className="p-3" key={p._id}>
                  <ProductCarcV2 product={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
