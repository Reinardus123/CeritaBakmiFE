import CreateMenu from "./CreateMenu"
import MenuList from "./MenuList"
import Transaction from "./Transaction";
import { useEffect, useState } from "react";
import AdminLogin from "../Login/AdminLogin";
import { useAuth } from "../Navbar/Context";

function Admin(){
    const [isLoginOpen, setIsLoginOpen] = useState(true);
    const {adminToken, logoutAdmin} = useAuth();

    useEffect(() => {
        if(adminToken){
            setIsLoginOpen(false);
        }
    },[adminToken]);


    return (
        <div className="min-h-screen bg-[#f8f1e7]">
            
        
            <div className="flex">

                {adminToken ? (
                     <main className="flex-1 p-6">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Selamat Datang!
                        </h1>
                        <p className="text-sm text-gray-500">
                            Kelola Pesanan dan menu Cerita Bakmi
                        </p>

                    </div>

                    <button
                        type="button"
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 cursor-pointer"
                        onClick={logoutAdmin}
                    >

                        Logout
                    </button>
                    
                </div>

                <Transaction/>

                <div className="mt-5">
                    <MenuList/>
                </div>

                
                
            </main>
                    
                ) : (
                     <AdminLogin
                    isOpen={true}
                    onClose={() => {}}
                />
                )
                
            }
            </div>
        </div>
    )
}

export default Admin;