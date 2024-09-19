import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { lineWobble } from "ldrs";
import toast from "react-hot-toast";
lineWobble.register();

const ProductCreateCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const handleCreateProduct = async (data) => {
    setIsSending(true);

    //data hle htae foh kyo srr ml
    await fetch(import.meta.env.VITE_API_URL + "/products", {
      method: "POST",
      body: JSON.stringify({product_name : data.product_name , price : data.price , created_at : new Date().toISOString() }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsSending(false);
    reset();
    if(data.back_to_product_lists){
        navigate("/product")
    } 
    toast.success(`Product create successfully`)
   
  };
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ">
      <h1 className="text-3xl font-bold mb-3 ">Create Product</h1>
      <p className="text-stone-500 mb-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, aliquid
        consequatur placeat ea quis mollitia.
      </p>

      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="mb-5">
          <label
            htmlFor="first_name"
            className={`block mb-2 text-sm font-medium ${
              errors.product_name ? "text-red-500" : "text-gray-900"
            } dark:text-white"`}
          >
            New Product name
          </label>
          <input
            type="text"
            {...register("product_name", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            className={`bg-gray-50 border ${
              errors.product_name
                ? " border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="Eg-Apple"
          />
          {errors.product_name?.type === "required" && (
            <p className="text-red-500 text-sm mt-1 " role="alert">
              Product name is required
            </p>
          )}
          {errors.product_name?.type === "minLength" && (
            <p className="text-red-500" role="alert">
              Product Name must be at least 3 characters
            </p>
          )}
          {errors.product_name?.type === "maxLength" && (
            <p className="text-red-500" role="alert">
              Product Name must be less than 10 characters
            </p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="last_name"
            className={`"block mb-2 text-sm font-medium ${
              errors.price ? "text-red-500" : "text-gray-900"
            } dark:text-white"`}
          >
            Product Price
          </label>
          <input
            type="number"
            {...register("price", {
              required: true,
              min: 100,
              max: 10000,
            })}
            className={`bg-gray-50 border ${
              errors.price
                ? " border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="eg-500"
          />
          {errors.price?.type === "required" && (
            <p className="text-red-500 text-sm mt-1 " role="alert">
              Product price is required
            </p>
          )}
          {errors.price?.type === "min" && (
            <p className="text-red-500" role="alert">
              Product Price must be at 100
            </p>
          )}
          {errors.price?.type === "max" && (
            <p className="text-red-500" role="alert">
              Product price must be less than 10000
            </p>
          )}
        </div>

        <div className="flex items-center mb-4">
          <input
            {...register("all_correct")}
            required
            id="all-correct"
            type="checkbox"
            defaultValue
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />

          <label
            htmlFor="all-correct"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Make Sure All the field are correct
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            {...register("back_to_product_lists")}
            required
            id="back_to_product_lists"
            type="checkbox"
            defaultValue
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />

          <label
            htmlFor="back_to_product_lists"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Back to Product List after saving
          </label>
        </div>

        <Link
          to={"/product"}
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="text-white inline-flex gap-5 justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span>Save Product </span>
          {isSending && (
            <l-line-wobble
              size="20"
              stroke="5"
              bg-opacity="0.1"
              speed="1.75"
              color="white"
            ></l-line-wobble>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductCreateCard;
