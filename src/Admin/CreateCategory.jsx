import { X } from "lucide-react";
import api from "../api/api";
import { useState } from "react";
import apiAdmin from "../api/apiAdmin";

function CreateCategory({onClose}){
    
    const [form, setForm] = useState({
        categoryName: ""
    });


    async function createCategory(e){
        
        e.preventDefault();

        try{
        
            const response = await apiAdmin.post("/category/createCat",{
                categoryName: form.categoryName
            });

            console.log(response.data);

            onClose();


        } catch(error){
            console.log(error);
        }
    }

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md px-4">

            <div className="w-full max-w-[400px] rounded-xl bg-white p-5">

                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Tambah Kategori
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <X size={15}/>
                    </button>
                </div>

                <form onSubmit={createCategory}>

                    <div className="mb-3">
                        <label className="mb-1 block text-md font-medium">
                            Nama Kategori
                        </label>

                        <input 
                            type="text"
                            name="categoryName"
                            value={form.categoryName}
                            onChange={handleChange}
                            placeholder="Masukan nama kategori"
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-red-600"  
                        />

                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md bg-gray-100 px-4 py-2 text-sm transition hover:bg-gray-200"
                        >
                            Batal
                        </button>

                        <button 
                            type="submit"
                             className="rounded-md bg-red-700 px-5 py-2 text-sm text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Simpan
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
}

export default CreateCategory;