import { Plus, Search, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../api/api";
import CreateMenu from "./CreateMenu";
import CreateCategory from "./CreateCategory";
import apiAdmin from "../api/apiAdmin";


function MenuList(){

    const [menus, setMenus] = useState([]);
    const [search, setSearch] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isCatOpen, setIsCatOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [currentpage, setCurrentPage] = useState(1);


    async function getMenu(){
        try{

            const response = await apiAdmin.get("/menu/getMenu");

            const sortedMenu = response.data.sort(
                (a,b) => a.menuId - b.menuId
            )

            setMenus(sortedMenu);

         

        } catch(error){
            console.log(error);
        }
    }

    function handleEdit(menu){
        setSelectedMenu(menu);
        setIsCreateOpen(true);
    }

    async function handleToogle(menuId){
        try{

           const response =  await apiAdmin.put(`menu/${menuId}/updateStatus`);
           
            getMenu();

        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {

        getMenu();

    },[]);


    

    const searchMenu = menus.filter((menu) => menu.MenuTitle.toLowerCase().includes(search.toLowerCase()));

    const menuPerPage = 10;
    const indexOfLastMenu = currentpage * menuPerPage;
    const indexOfFirstmenu  = indexOfLastMenu - menuPerPage;

    const currentMenu = searchMenu.slice(
        indexOfFirstmenu,
        indexOfLastMenu
    );

    const totalPages = Math.ceil(searchMenu.length / menuPerPage);

    useEffect(() => {
        setCurrentPage(1);

    },[searchMenu]);

    return (
       <div className="rounded-xl bg-white p-4 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

                <div>
                    <h2 className="text-base font-semibold">
                        Daftar Menu
                    </h2>

                    <p className="text-sm text-gray-500">
                        Kelola menu yang tersedia
                    </p>
                </div>

                <div className="flex items-center gap-2">

                    <div className="relative">
                        <Search
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input 
                            type="text"
                            placeholder="Cari Menu..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-36 rounded-md border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-red-600" 
                        />
                    </div>

                    <button 
                        type="button"
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                        <Plus size={15}/>
                        Tambah Menu
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsCatOpen(true)}
                        className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 cursor-pointer"
                    >
                        <Plus size={15}/>
                        Tambah Kategori
                    </button>

                </div>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full text-left text-sm">

                    <thead>

                        <tr className="border-y bg-gray-50 text-black-600">

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

                             <th className="py-3 py-2 font-medium">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {searchMenu.map((menu) => (
                            <tr
                                key={menu.menuId}
                                className="border-b last:border-b-0 hover:bg-gray-50"
                            >

                                <td className="px-3 py-2">
                                    <img 
                                        src={menu.ImageUrl}
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
                                            onClick={() => handleEdit(menu)}
                                            className="text-gray-500 hover:text-gray-800 cursor-pointer"
                                        >
                                                <Pencil size={15}/>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleToogle(menu.menuId)}
                                            className={`relative h-4 w-7 rounded-full transition cursor-pointer ${menu.active ? "bg-red-600" : "bg-gray-300"}`}
                                        >

                                            <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition ${menu.active ? "left-3" : "left-0.5"}`}/>

                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}
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

            {isCreateOpen && (
                <CreateMenu
                    menu={selectedMenu}
                    onClose={() => {
                        setIsCreateOpen(false);
                        getMenu();
                    }}
                />
            )}

            {isCatOpen && (
                    <CreateCategory
                        onClose={() => {
                            setIsCatOpen(false);
                            getMenu();
                        }}
                    />
                )
            }

       </div>
    );
}

export default MenuList;
