import CreateMenu from "./CreateMenu"
import MenuList from "./MenuList"

function Admin(){
    return (
        <div className="min-h-screen bg-gray-100">
            
            <header className="h-16 bg-white border-b">
                ....
            </header>


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

                <MenuList/>
                
            </main>


            </div>

           

        </div>
    )
}

export default Admin;