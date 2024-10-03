import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { lineWobble } from "ldrs";
import toast from "react-hot-toast";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";
import useRecordStore from "../stores/useRecordStore";
import { useNavigate } from "react-router-dom";
lineWobble.register();

const VoucherInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const [isSending, setIsSending] = useState(false);

  const { records, resetRecord } = useRecordStore();

  const onSubmit = async (data) => {
    setIsSending(true);

    const total = records.reduce((a, b) => a + b.cost, 0);
    const tax = total * 0.07;
    const netTotal = total + tax;

    const currentVoucher = { ...data, records, total, tax, netTotal };

   const res = await fetch(import.meta.env.VITE_API_URL + "/vouchers", {
      method: "POST",
      body: JSON.stringify(currentVoucher),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    toast.success("Voucher created successfully");
    resetRecord();
    reset();
    setIsSending(false);

    if (data.redirect_to_detail) {
      navigate(`/voucher/detail/${json.id}`);
    }
  };

  function generateInvoiceNumber() {
    // Get the current date
    const date = new Date();

    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    const invoiceNumber = `INV-${formattedDate}-${randomNumber}`;

    return invoiceNumber;
  }
  //here
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id="infoForm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="col-span-1">
            <div className="mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.voucher_id ? "text-red-500" : "text-gray-900"
                } dark:text-white"`}
              >
                Voucher ID
              </label>
              <input
                type="text"
                defaultValue={generateInvoiceNumber()}
                {...register("voucher_id", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.voucher_id
                    ? " border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="V123123"
              />
              {errors.voucher_id?.type === "required" && (
                <p className="text-red-500 text-sm mt-1 " role="alert">
                  Voucher ID is required
                </p>
              )}
            </div>
          </div>

          <div className="col-span-1">
            <div className="mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.customer_name ? "text-red-500" : "text-gray-900"
                } dark:text-white"`}
              >
                Customer Name
              </label>
              <input
                type="text"
                {...register("customer_name", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.customer_name
                    ? " border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="kyaw kyaw"
              />
              {errors.customer_name?.type === "required" && (
                <p className="text-red-500 text-sm mt-1 " role="alert">
                  Customer Name is required
                </p>
              )}
            </div>
          </div>

          <div className="col-span-1">
            <div className="mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.customer_email ? "text-red-500" : "text-gray-900"
                } dark:text-white"`}
              >
                Customer Email
              </label>
              <input
                type="text"
                {...register("customer_email", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.customer_email
                    ? " border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="kyawkyaw@gmail.com"
              />
              {errors.customer_email?.type === "required" && (
                <p className="text-red-500 text-sm mt-1 " role="alert">
                  Customer Email is required
                </p>
              )}
            </div>
          </div>

          <div className="col-span-1">
            <div className="mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.sale_date ? "text-red-500" : "text-gray-900"
                } dark:text-white"`}
              >
                Sale Date
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                {...register("sale_date", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.sale_date
                    ? " border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder=""
              />
              {errors.sale_date?.type === "required" && (
                <p className="text-red-500 text-sm mt-1 " role="alert">
                  Sale Date is required
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
      <SaleForm />

      <VoucherTable />

      <div className="flex  flex-col justify-end gap-3 items-end mt-5 ">
        <div className="flex items-center gap-3">
          <label
            htmlFor="redirect_to_detail"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Redirect to Voucher Detail
          </label>
          <input
            {...register("redirect_to_detail")}
            required
            form="infoForm"
            id="redirect_to_detail"
            type="checkbox"
            defaultValue
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="all-correct"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Make Sure All the field are correct
          </label>
          <input
            {...register("all_correct")}
            required
            form="infoForm"
            id="all-correct"
            type="checkbox"
            defaultValue
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <button
          type="submit"
          form="infoForm"
          className="text-white inline-flex gap-5 justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span>Confirm Voucher</span>
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
      </div>
    </div>
  );
};

export default VoucherInfo;
