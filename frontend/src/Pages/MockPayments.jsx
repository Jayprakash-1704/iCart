// import { useState } from "react";

// export default function MockPayment({ amount, onSuccess }) {
//   const [loading, setLoading] = useState(false);
//   const [method, setMethod] = useState("upi");

//   const handlePay = async () => {
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);

//       onSuccess({
//         paymentId: `PAY_${Date.now()}`,
//         orderId: `ORD_${Date.now()}`,
//       });
//     }, 2000);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//       <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
//         <h2 className="text-2xl font-bold mb-4">
//           Complete Payment
//         </h2>

//         <div className="bg-green-50 p-4 rounded-lg mb-4">
//           <p className="text-sm text-gray-500">
//             Total Amount
//           </p>
//           <h3 className="text-3xl font-bold text-green-600">
//             ₹{amount}
//           </h3>
//         </div>

//         <div className="space-y-3 mb-5">
//           <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
//             <input
//               type="radio"
//               checked={method === "upi"}
//               onChange={() => setMethod("upi")}
//             />
//             UPI Payment
//           </label>

//           <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
//             <input
//               type="radio"
//               checked={method === "card"}
//               onChange={() => setMethod("card")}
//             />
//             Debit / Credit Card
//           </label>

//           <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer">
//             <input
//               type="radio"
//               checked={method === "cod"}
//               onChange={() => setMethod("cod")}
//             />
//             Cash On Delivery
//           </label>
//         </div>

//         <button
//           onClick={handlePay}
//           disabled={loading}
//           className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
//         >
//           {loading ? "Processing..." : `Pay ₹${amount}`}
//         </button>
//       </div>
//     </div>
//   );
// }