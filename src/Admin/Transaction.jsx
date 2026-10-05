import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/api";
import DetailTransaction from "./DetailTransaksi";

function Transaction(){

    const [searchTransaction, setSearchTransactions] =  useState("");
    const [transaction, setTransaction] = useState([]); 
    const [currentpage, setCurrentPage] = useState(1);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

     const getTransaction =
        searchTransaction === "" ? transaction : transaction.filter((tr) => tr.transactionId === Number(searchTransaction));
        
    const transactionPerPage = 10;

    const indexOfLastTransaction = currentpage * transactionPerPage; 

    const indexOfFirstTransaction = indexOfLastTransaction - transactionPerPage;

    const currentTransactions = getTransaction.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    );

    const totalPages = Math.ceil(getTransaction.length / transactionPerPage);

    async function getAllTransaction(){
        
        try{

            const response = await api.get("/checkout/getAll");
            setTransaction(response.data);


        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getAllTransaction();
    },[]);
   

    useEffect(() => {
        setCurrentPage(1);
    },[searchTransaction]);

    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">

            <div className="mb-4 flex items-cener justify-between">

                <div className="text-base font-semibold">
                    Daftar Transaksi
                </div>

                <div className="flex items-center gap-2">

                    <div className="relative">

                        <Search
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input 
                            type="text" 
                            placeholder="Cari transaksi"
                            value={searchTransaction}
                            onChange={(e) => setSearchTransactions(e.target.value === "" ? "" 
                                :  Number(e.target.value))}
                            className="w-36 rounded-md border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-red-600"  
                        />
                    </div>

                    

                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full text-left text-sm">

                    <thead>

                        <tr className="border-y bg-gray-50 text-black-600">
                            <th className="px-3 py-2 font-medium">
                                No. Transaksi
                            </th>

                            <th className="px-3 py-2 font-medium">
                                Tanggal
                            </th>

                            <th className="px-3 py-2 font-medium">
                                Nama
                            </th>

                            <th className="px-3 py-2 font-medium">
                                Pesanan
                            </th>
                            
                            <th className="px-3 py-2 font-medium">
                                Total
                            </th>

                            <th className="px-3 py-2 font-medium">
                                Status Pembayaran
                            </th>

                            <th className="px-3 py-2 font-medium">
                                Status Order
                            </th>

                            <th className="px-3 py-2 font-medium">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            currentTransactions.map((tr) => (
                                <tr
                                    key={tr.transactionId}
                                    className="border-b las:border-b-0 hover:bg-gray-50"
                                >

                                    <td className="px-3 py-2 font-medium">
                                        {tr.transactionId}
                                    </td>

                                    <td className="px-3 py-2 font-medium">
                                        {new Date(tr.createdAt).toLocaleDateString("id-ID")}
                                    </td>

                                    <td className="px-3 py-2 font-medium">
                                        {tr.username}
                                    </td>

                                    <td className="px-3 py-2">
                                        <div className="font-medium">
                                            {tr.details[0]?.menuTitle} x{tr.details[0]?.quantity}
                                        </div>

                                            {
                                                tr.details.length > 1 && (
                                                    <div className="text-xs text-gray-500">
                                                        + {tr.details.length - 1} pesanan lainnya
                                                    </div>

                                                )
                                            }
                                    </td>
                                    
                                    <td className="px-3 py-2 font-medium">
                                        {tr.totalAmount.toLocaleString("id-ID")}
                                    </td>

                                    <td className="px-3 py-2">
                                        
                                        <span
                                            className={
                                                tr.paymentStatus === "UNPAID"
                                                ? "rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600"
                                                : tr.paymentStatus === "PAID"
                                                ? "rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600"
                                                : "rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-600"
                                            }
                                        >
                                        {tr.paymentStatus}
                                        </span>
                                       
                                        
                                    </td>

                                     <td className="px-3 py-2">

                                        <span className={
                                            tr.orderStatus === "WAITING"
                                            ? "rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-600"
                                            : tr.orderStatus === "CONFIRMED"
                                            ? "rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600"
                                            : tr.orderStatus === "DELIVERING"
                                            ? "rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
                                            : tr.orderStatus === "COMPLETED"
                                            ? "rounded-full bg-green-200 px-3 py-1 text-xs font-medium text-green-600"
                                            : "rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600"
                                        }
                                        
                                        >
                                         {tr.orderStatus}
                                        </span>
                                       
                                    </td>

                                     <td className="px-3 py-2 font-medium">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsDetailOpen(true)
                                                setSelectedTransaction(tr)
                                            }}
                                            className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                                        >
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                
                </table>
                 <div className="mt-4 flex items-center justify-end gap-2">
                        <button
                            disabled={currentpage === 1}
                            onClick={() => setCurrentPage(currentpage -1)}
                            className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50 cursor-pointer"
                        >
                            Sebelumnya 
                        </button>

                        <span className="text-sm">
                            {currentpage} / {totalPages}
                        </span>

                        <button
                            disabled={currentpage === totalPages}
                            onClick={() => setCurrentPage(currentpage + 1)}
                            className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50 cursor-pointer"
                        >
                            Berikutnya 
                        </button>
                    </div>

            </div>

            {isDetailOpen && selectedTransaction && (
                <DetailTransaction
                    onClose={() => setIsDetailOpen(false)}
                    transaction={selectedTransaction}
                />
            )}


        </div>
    )



}

export default Transaction;