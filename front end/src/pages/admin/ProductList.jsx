import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] font-poppins">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 font-poppins font-bold text-xl hover:underline hover:text-orange-500">
            Create Product
          </div>

          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {imageUrl ? (
                <div className="text-center">
                  <img
                    src={imageUrl}
                    alt="product"
                    className="block mx-auto max-h-[200px] object-contain"
                  />
                </div>
              ) : (
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">
                      {image ? image.name : "Click to upload"}
                    </span>
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG (MAX. 800x400px)
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
              />
            </label>
          </div>

          <form className="py-10 px-10 border border-gray-300 flex flex-col rounded-md">
            <div className="w-full">
              <label htmlFor="name" className="">
                Name
              </label>{" "}
              <br />
              <input
                type="text"
                placeholder=" "
                className="p-4 mb-3 w-full border rounded-lg bg-white text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label htmlFor="name block">Price</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-full border rounded-lg bg-white text-black"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label htmlFor="name block">Quantity</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-full border rounded-lg bg-white text-black"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="w-full ">
              <label htmlFor="name block">Brand</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-white text-black"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-white border rounded-lg w-full text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div>
              <label htmlFor="name block">Count In Stock</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-full border rounded-lg bg-white text-black"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="">Category</label> <br />
              <select
                placeholder="Choose Category"
                className="p-4 mb-3 w-full border rounded-lg bg-white text-black"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" className="bg-white">
                  select
                </option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id} className=" bg-white">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-medium bg-pink-600 text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
