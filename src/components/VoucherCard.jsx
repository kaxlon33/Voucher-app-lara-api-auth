import html2pdf from "html2pdf.js";
import printJS from "print-js";
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

  const handlePrint = () => {
    // window.print();
    printJS({
      printable: "printArea",
      type: "html",
      scanStyles: true,
      css: [
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
      ],
    });
  };

  const handlePdf = () => {
    const element = document.getElementById("printArea");

    const opt = {
      margin: 1,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    // convert the element to PDF
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="flex gap-5">
      <div id="printArea" className="w-[14.8cm] bg-white p-8 rounded shadow-lg">
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
              <th className="text-left py-2 text-sm">No</th>
              <th className="text-left py-2 text-sm">Description</th>
              <th className="text-right py-2 text-sm">Qty</th>
              <th className="text-right py-2 text-sm">Price</th>
              <th className="text-right py-2 text-sm">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.records.map((record, index) => (
              <tr key={record.id}>
                <td className="py-2 text-sm">{index + 1}</td>
                <td className="py-2 text-sm">{record.product.product_name}</td>
                <td className="text-right text-sm">{record.quantity}</td>
                <td className="text-right text-sm">{record.product.price}</td>
                <td className="text-right text-sm">{record.cost}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="text-right font-semibold text-sm">
                Total
              </td>
              <td className="text-right font-semibold text-sm">{data.total}</td>
            </tr>
            <tr>
              <td colSpan={4} className="text-right font-semibold text-sm">
                Tax
              </td>
              <td className="text-right font-semibold text-sm">{data.tax}</td>
            </tr>
            <tr>
              <td colSpan={4} className="text-right font-semibold text-sm">
                Net Total
              </td>
              <td className="text-right font-semibold text-sm">
                {data.netTotal}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="border-t pt-4 flex justify-between mb-3 text-sm">
          <div className="w-1/2">
            <p className="font-semibold mb-2">Payment Transfer to</p>
            <p>Kpay,Wave: 09250152018</p>
            <p>KBZ Bank : 02731010705025</p>
            <p>AYA Bank : 20003674121</p>
          </div>

          <div className="text-right w-1/2 ">
            <p className="font-semibold">MMS</p>
            <p>One Stop IT Solution</p>
            <p>48, 1st Floor, Shan Kone St.</p>
            <p>enquiry@mms-it.com</p>
          </div>
        </div>

        <div className="border-t-2  border-gray-200 pt-4">
          <p className=" text-center text-sm">Thanks to You</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
          <button
            onClick={handlePrint}
            className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Print Voucher
          </button>

          <button
            onClick={handlePdf}
            className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Export PDF
          </button>
      </div>
    </div>
  );
};

export default VoucherCard;
