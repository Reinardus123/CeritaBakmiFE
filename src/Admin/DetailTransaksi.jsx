import { X } from "lucide-react"
import api from "../api/api";
import { useState } from "react";

function DetailTransaction({transaction, onClose}){

    const [paymentStatus, setPaymentStatus] = useState(transaction.paymentStatus);
    const [orderStatus, setOrderStatus] = useState(transaction.orderStatus);


  async function handleUpdatePaymentStatus(){
      try{

        await api.put(`/updateStatus/${transaction.transactionId}/updatePaymentStatus`,{
            paymentStatus : paymentStatus
        });

    } catch(error){
        console.log(error);
        throw error;
    }
  }

  async function handleUpdateOrderStatus(){
    try{
        await api.put(`/updateStatus/${transaction.transactionId}/updateOrderStatus`,{
            orderStatus: orderStatus
        });
    } catch(error){
        console.log(error);
    }
  }

  async function handleSave(){

   
    try{
        await handleUpdatePaymentStatus();
        await handleUpdateOrderStatus();

        onClose();
    } catch(error){
        console.log(error);
        
    }
  }

    return (
        
      <div className="fixed inset-0 z-50 flex justify-center bg-black/40 backdrop-blur-md px-4">
        
            <div className="relative flex flex-col max-h-[90vh] w-full overflow-hidden rounded-xl bg-white shadow-2xl m-5">

                <div className="flex justify-between items-center shrink-0 border-b px-6 py-4">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Detail Pesanan
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Transaksi #{transaction.transactionId}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:text-gray-900 cursor-pointer"
                    >
                        <X size={20}/>
                    </button>
                </div>


                <div className="min-h-0 flex-1 overflow-y-auto">
                    <div className="space-y-5 p-6">
                        <div className="rounded-lg border border-gray-200 p-4">
                            <h3 className="mb-4 font-semibold">
                                Informasi Transaksi
                            </h3>

                            <div className="space-y-2 text-sm">
                                <div className="flex">
                                    <span className="w-32 shrink-0 text-gray-500">
                                        Nama Pelanggan
                                    </span>

                                    <span className="font-medium">
                                        {transaction.username}
                                    </span>
                                </div>

                                <div className="flex">
                                    <span className="w-32 shrink-0 text-gray-500">
                                        Tanggal
                                    </span>

                                    <span className="font-medium">
                                        {new Date(transaction.createdAt).toLocaleDateString("id-ID")}
                                    </span>
                                </div>

                                <div className="flex">
                                    <span className="w-32 shrink-0 text-gray-500">
                                        Alamat
                                    </span>

                                    <span className="font-medium">
                                       {transaction.deliveryAddress}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <div className="px-4 py-3">
                                <h3 className="font-semibold">
                                    Daftar Pesanan
                                </h3>
                            </div>

                            <div className="divide-y">
                                {transaction.details.map((detail, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center justify-between px-4 py-3"
                                    >
                                        <div className="font-medium">
                                            {detail.menuTitle} x {detail.quantity}
                                        </div>

                                        <p className="font-medium">
                                            Rp {detail.subtotal.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="px-4 py-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Subtotal
                                    </span>

                                    <span>
                                        Rp. {transaction.subtotal.toLocaleString("id-ID")}
                                    </span>
                                </div>

                                <div className="mt-3 flex justify-between pt-3 font-semibold">
                                    <span>
                                        Total Pembayaran
                                    </span>
                                    <span>
                                        Rp {transaction.totalAmount.toLocaleString("id-ID")}
                                    </span>
                                </div>
                            </div>
                        </div>
                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Status Pembayaran
                                </label>

                                <select 
                                    value={paymentStatus}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    className="w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2 text-sm transition focus:border-red-500"
                                >
                                    <option value="UNPAID">
                                        UNPAID
                                    </option>

                                    <option value="PAID">
                                        PAID
                                    </option>

                                    <option value="REJECTED">
                                        REJECTED
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Status Order
                                </label>

                                <select 
                                    value={orderStatus}
                                    onChange={(e) => setOrderStatus(e.target.value)}
                                    className="w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2 text-sm transition focus:border-red-500"
                                
                                >
                                    <option value="WAITING">
                                        WAITING
                                    </option>

                                    <option value="CONFIRMED">
                                        CONFIRMED
                                    </option>

                                    <option value="DELIVERING">
                                        DELIVERING
                                    </option>

                                    <option value="COMPLETED">
                                        COMPLETED
                                    </option>

                                    <option value="CANCELED">
                                        CANCELED
                                    </option>
                                </select>
                            </div>
                    </div>

                </div>

                   
                </div>

                <div className="flex shrink-0 justify-end gap-2 border-t bg-white px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 cursor-pointer"
                    >
                        Tutup
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </div>

      </div>
    )
}

export default DetailTransaction;