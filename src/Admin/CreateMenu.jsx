import {useEffect, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import api from "../api/api";


function CreateMenu({onClose, menu}){

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        MenuTitle: "",
        price: "",
        description: "",
        categoryId: ""

    });

    function handleImageChange(e){
        const file = e.target.files[0];

        if(!file){
            return;
        }

        setImage(file);

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    }

    function handlePrice(e){
        const value = e.target.value;

        const number = value.replace(/\D/g,"");

        const formatted = number ? Number(number).toLocaleString("id-ID") : "";

        setForm({
            ...form,
            price: formatted
        });
    }

    function removeImage(){
        setImage(null);
        setPreview(null);
    }

    const [categories, setCategories] = useState([]);

    async function getCategories(){
        
        const response = await api.get("/category/getCat");

        setCategories(response.data);

        console.log(response.data);
    }

    useEffect(() => {

        getCategories();

    },[]);
    
   async function createProduct(e){

        e.preventDefault();

        if(!menu){

            try{
            setLoading(true);

            const formData = new FormData();
            formData.append("MenuTitle", form.MenuTitle);
            formData.append("price", form.price);
            formData.append("description", form.description);
            formData.append("categoryId", form.categoryId);
        
            if(image){
                formData.append("image",image);
            }


            const response = await api.post("/menu/createMenu",formData);
            
            console.log(response.data);

            onClose();
            
        } catch(error){
            console.log(error);
        }

        } else{

            try{
                 const formData = new FormData();
                formData.append("MenuTitle",form.MenuTitle);
                formData.append("price", form.price.replace(/\./g, ""));
                formData.append("description",form.description);
                formData.append("categoryId",form.categoryId);

            if(image){
                formData.append("image",image);
            }
            const response = await api.put(`/menu/update/${menu.menuId}`,formData);
            console.log(response.data);
            onClose();
            } catch(error){
                console.log(error);
            }         
        }

       
   }

   function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
   }

   function handleCategory(e){
        setForm({
            ...form,
            categoryId: e.target.value,
        });
   }

   useEffect(() => {
        if(menu){
            setForm({
                MenuTitle: menu.MenuTitle,
                price: menu.price.toLocaleString("id-ID"),
                description: menu.description,
                categoryId: menu.categoryId
            });

            setPreview(`http://localhost:8080${menu.ImageUrl}`);
        }
   }, [menu]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md px-4">

           <div className="w-full max-w-[500px] rounded-xl bg-white p-5">

                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Tambah Menu
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
                    >   
                        <X size={15}/>
                    </button>
                </div>

                    <form onSubmit={createProduct}>
                        
                       <div className="mb-3">

                            <label className="mb-1 block text-md font-medium">
                                Nama Menu
                            </label>

                            <input 
                                type="text"
                                name="MenuTitle"
                                value={form.MenuTitle}
                                onChange={handleChange}
                                placeholder="Masukan nama menu"
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-red-600" 
                            />
                       </div>

                         <div className="mb-3">

                            <label className="mb-1 block text-md font-medium">
                               Deskripsi
                            </label>

                            <input 
                                type="text"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Masukan deskripsi menu"
                                required
                                className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-red-600" 
                            />
                       </div>

                       <div className="mb-3 grid grid-cols-2 gap-3">

                            <div>

                                <label className="mb-1 block text-xs font-medium">
                                    Harga
                                </label>

                                <input 
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handlePrice}
                                    placeholder="2.500"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:bg-red-600" 
                                />
                                
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium">
                                    Kategori
                                </label>

                                <select 
                                    name="categoryId"
                                    value={form.categoryId}
                                    onChange={handleCategory}
                                    className="w-full border rounded-md border-gray-200 px-3 py-2 outline-none transition focus:bg-red-600"
                                >
                                    <option value="">
                                        Pilih Category
                                    </option>

                                    {
                                        categories.map(category => (
                                            
                                            <option 
                                                value={category.categoryId}
                                                key={category.categoryId}
                                            >
                                                
                                                {category.categoryName}
                                            </option>
                                        ))
                                    }
                                </select>


                            </div>

                       </div>

                       <div className="mb-5">
                        
                          <label className="mb-1 block text-xs font-medium">
                                Foto Menu
                          </label>

                          <div className="flex gap-3">
                                
                            <label className="flex h-[90px] flex-1 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 transition hover:bg-gray-50">
                                
                                <UploadCloud
                                    size={25}
                                    className="mb-1 text-gray-500"
                                />

                                <span className="text-xs">
                                    Klik untuk upload foto
                                </span>

                                <span className="mt-1 text-[10px] text-gray-400">
                                    PNG, JPG maks. 2MB
                                </span>

                                <input 
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                    className="hidden" 
                                />

                            </label>

                            {preview && (
                                
                                <div className="relative h-[90px] w-[90px]">

                                    <img 
                                        src={preview} 
                                        alt="Preview"
                                        className="w-full h-full rounded-md object-cover" 
                                    />

                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-gray-600 shadow hover:text-red-600"
                                    >
                                        <X size={15}/>
                                    </button>

                                </div>
                            )}
                          </div>
                        
                       </div>

                        <div className="flex justify-end gap-2">
                            
                            <button 
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="rounded-md bg-gray-100 px-4 py-2 text-sm transition hover:bg-gray-200"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-md bg-red-700 px-5 py-2 text-sm text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Menyimpan" : "Simpan"}
                            </button>
                        </div>
                    </form>
           </div>
        </div>
    ); 
}

export default CreateMenu;