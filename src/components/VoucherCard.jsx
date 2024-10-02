import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherCard = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + `/vouchers/${id}`,
    fetcher
  );

  console.log(data);

  if (isLoading) return <p>Loading...</p>;

  return (
    // <div className="flex gap-5">
    <div className="w-[14.8cm] bg-white p-8 rounded shadow-lg">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-4xl font-bold">INVOICE</h1>
        <div className="text-right">
          <p className="font-semibold">Invoice to</p>
          <p>{data.customer_name}</p>
        </div>
      </div>

      <div className="mb-8">
        <p>
          <span className="font-semibold">Number:</span> {data.voucher_id}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {data.sale_date}
        </p>
      </div>

      <table className="w-full mb-5">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">No</th>
            <th className="text-left py-2">Description</th>
            <th className="text-right py-2">Qty</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
            {data.records.map ((record, index) => (
                   <tr>
                   <td className="py-2">{index+1}</td>
                   <td className="py-2">{record.product.product_name}</td>
                   <td className="text-right">{record.quantity}</td>
                   <td className="text-right">{record.product.price}</td>
                   <td className="text-right">{record.cost}</td>
                 </tr>
                
            ))}
       
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="text-right font-semibold">
              Total
            </td>
            <td className="text-right font-semibold">{data.total}</td>
          </tr>
          <tr>
            <td colSpan={4} className="text-right font-semibold">
              Tax
            </td>
            <td className="text-right font-semibold">{data.tax}</td>
          </tr>
          <tr>
            <td colSpan={4} className="text-right font-semibold">
             Net Total
            </td>
            <td className="text-right font-semibold">{data.netTotal}</td>
          </tr>
        </tfoot>
      </table>

      <div className="border-t pt-4 flex justify-between mb-3">
       <div>
       <p className="font-semibold mb-2">Payment Transfer to</p>
        <p>KpayWave: 09250152018</p>
        <p>KBZ Bank : 02731010705025</p>
        <p>AYA Bank : 20003674121</p>
       </div>

        <div className="text-right">
        <p className="font-semibold">MMS</p>
        <p>One Stop IT Solution</p>
        <p>48, 1st Floor, Shan Kone St.</p>
        <p>enquiry@mms-it.com</p>
      </div>
      </div>

      <div className="border-t-2 pt-4 border-gray-200 ">
        <p className=" text-center">Thanks to You</p>
      </div>

     
    </div>
    // </div>
  );
};

export default VoucherCard;
