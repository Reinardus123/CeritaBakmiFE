import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/api";

function Transaction(){

    const [searchTransaction, setSearchTransactions] =  useState("");
    const [transaction, setTransaction] = useState([]);


    async function getAllTransaction(){
        
        try{

            const response = await api.get("/checkout/getAll");
            setTransaction(response.data);


        } catch(error){
            console.log(error);
        }
    }

    const getTransaction =
        searchTransaction === "" ? transaction : transaction.filter((tr) => tr.transactionId === Number(searchTransaction));

    useEffect(() => {
        getAllTransaction();
    },[]);

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
                            className="asbolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input 
                            type="number" 
                            placeholder="Cari transaksi"
                            value={searchTransaction}
                            onChange={(e) => setSearchTransactions(e.target.value === "" ? "" 
                                :  Number(e.target.value))}
                            className="w-36 rounded-md border border-gray-200 py-2 pl-0 pr-3 text-sm outline-none focus:border-red-600"  
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
                            getTransaction.map((tr) => (
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
                                                        + {tr.details.length + 1} pesanan lainnya
                                                    </div>

                                                )
                                            }
                                    </td>
                                    
                                    <td className="px-3 py-2 font-medium">
                                        {tr.totalAmount.toLocaleString("id-ID")}
                                    </td>

                                    <td className="px-3 py-2 font-medium">
                                        {tr.paymentStatus}
                                    </td>

                                     <td className="px-3 py-2 font-medium">
                                        {tr.orderStatus}
                                    </td>

                                     <td className="px-3 py-2 font-medium">
                                        <button
                                            type="button"
                                            className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                                        >
                                            ...
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>

            </div>


        </div>
    )



}

export default Transaction;