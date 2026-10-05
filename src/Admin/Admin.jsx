import CreateMenu from "./CreateMenu"
import MenuList from "./MenuList"
import Transaction from "./Transaction";

function Admin(){
    return (
        <div className="min-h-screen bg-[#f8f1e7]">
            
           

            <div className="flex">

                 <main className="flex-1 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">
                        Selamat Datang!
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola Pesanan dan menu Cerita Bakmi
                    </p>
                </div>

                <Transaction/>

                <div className="mt-5">
                    <MenuList/>
                </div>

                
                
            </main>


            </div>

           

        </div>
    )
}

export default Admin;