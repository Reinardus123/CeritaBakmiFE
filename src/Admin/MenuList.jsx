import { Plus, Search, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../api/api";
import CreateMenu from "./CreateMenu";


function MenuList(){

    const [menus, setMenus] = useState([]);
    const [search, setSearch] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);


    async function getMenu(){
        try{

            const response = await api.get("/menu/getMenu");

            setMenus(response.data);

            console.log(response.data);

        } catch(error){
            console.log(error);
        }
    }

    async function handleToogle(menuId){
        try{

           const response =  await api.put(`menu/${menuId}/updateStatus`);
            console.log(response.data);
            getMenu();

        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {

        getMenu();

    },[]);

    const searchMenu = menus.filter((menu) => menu.MenuTitle.toLowerCase().includes(search.toLowerCase()));



    return (
       <div className="rounded-xl bg-white p-4 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

                <div>
                    <h2 className="text-base font-semibold">
                        Daftar Menu
                    </h2>

                    <p className="text-xs text-gray-500">
                        Kelola menu yang tersedia
                    </p>
                </div>

                <div className="flex items-center gap-2">

                    <div className="relative">
                        <Search
                            size={15}
                            className="absolute left-3 top-1/2 -transalte-y-1/2 text-gray-400"
                        />

                        <input 
                            type="text"
                            placeholder="Cari Menu..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-36 rounded-md border border-gray-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-red-600" 
                        />
                    </div>

                    <button 
                        type="button"
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                    >
                        <Plus size={15}/>
                        Tambah Menu
                    </button>

                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full text-left text-xs">

                    <thead>

                        <tr className="border-y bg-gray-50 text-gray-500">

                            <th className="px-3 py-2 font-medium">
                                Foto
                            </th>

                            <th className="px-3 py-2 font-medium">
                                Nama Menu
                            </th>

                            <th className="px-3 py-2 font-medium">
                                Kategori
                            </th>

                            <th className="px-3 py-2 font-medium">
                                Harga
                            </th>
                            
                             <th className="px-3 py-2 font-medium">
                                Status
                            </th>

                             <th className="px-3 py-2 font-medium">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {searchMenu.map((menu) => (
                            <tr
                                key={menu.id}
                                className="border-b last:border-b-0 hover:bg-gray-50"
                            >

                                <td className="px-3 py-2">
                                    <img 
                                        src={menu.imageUrl}
                                        alt={menu.menuTitle}
                                        className="h-8 w-8 rounded-md object-cover" 
                                    />
                                </td>

                                <td className="px-3 py-2 font-medium">
                                    {menu.MenuTitle}
                                </td>

                                <td className="px-3 py-2 font-medium">
                                    {menu.category?.categoryname}
                                </td>

                                <td className="px-3 py-2">
                                    {menu.price.toLocaleString("id-ID")}
                                </td>

                                <td className="px-3 py-2">

                                    <span 
                                        className={
                                            menu.active 
                                            ? "rounded-md bg-green-100 px-2 py-1 text-[10px] text-green-700"
                                            : "rounded-md bg-gray-100 px-2 py-1 text-[10px] text-gray-500"
                                        }
                                    >
                                         {menu.active ? "Aktif" : "Nonaktif"}
                                    </span>
                                   
                                </td>

                                <td className="px-3 py-2">
                                    <div className="flex items-center justify-center gap-3">
                                        
                                        <button 
                                            type="button"
                                            className="text-gray-500 hover:text-gray-800"
                                        >
                                                <Pencil size={15}/>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleToogle(menu.menuId)}
                                            className={`relative h-4 w-7 rounded-full transition ${menu.active ? "bg-red-600" : "bg-gray-300"}`}
                                        >

                                            <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition ${menu.active ? "left-3" : "left-0.5"}`}/>

                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

            {isCreateOpen && (
                <CreateMenu
                    onClose={() => {
                        setIsCreateOpen(false);
                        getMenu();
                    }}
                />
            )}

       </div>
    );
}

export default MenuList;
