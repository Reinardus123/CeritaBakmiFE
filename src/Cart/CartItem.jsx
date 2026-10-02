import { X } from "lucide-react";
import CartComponent from "./CartComponent";
import api from "../api/api";
import { useState, useEffect } from "react";

function CartItem({onClose}){

    const [cart, setCart] = useState([]);
    const [branch, setBranch] = useState([]);
    const [form, setForm] = useState({
        branchId: "",
        deliveryAddress: ""
    });
    

    async function getCart(){
        
        try{
            const response = await api.get("/cart/getCart");
            setCart(response.data);
        } catch(error){
            console.log(error);
        }
        
    }

    async function handleChange(e){
        
    }

    async function hanldeCheckout(){

        try{
            const response = await api.post("/checkout/item",{
                
            });

            console.log(response.data);


        } catch(error){
            console.log(error);
        }
    }

    async function getBranch(){
        
        try{

            const response = await api.get("/branch/getBranch");
            setBranch(response.data);

        } catch(error){
            console.log(error);
        }
    }

    async function handleDelete(item){

        try{
             await api.delete(`/cart/${item.cartItemId}`);

            setCart((prevCart) => prevCart.filter((cartItem) => cartItem.cartItemId !== item.cartItemId));

        } catch(error){
            console.log(error);
        }
    }

    async function handleUpdateQuantity(cartItemId, quantity){

        try{

            const response = await api.put(`/cart/${cartItemId}/updateQuantity`,{
                quantity: quantity
            });

            const updatedItem = response.data;
            console.log(response.data);

            setCart((prevCart) => prevCart.map((item) => item.cartItemId === updatedItem.cartItemId ? updatedItem : item));

        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getCart();
        getBranch();
    },[]);
    const subtotal = cart.reduce((total, item) => total + item.subtotal,0);

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
            
            <div className="relative w-full max-w-4xl overflow-hidden bg-white shadow-2xl md:min-h-[520px] rounded-xl">

                <div className="flex shrink-0 items-center justify-between border-b border-[#2b1a12]/10 px-5 py-5 md:px-7">
                    <h2 className="text-2xl font-bold text-[#2b1a12]">
                        Keranjang ({cart.length})
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 justify-center transition cursor-pointer"
                    >
                        <X size={22}/>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 md:px-7">

                    {cart.length === 0 ? (
                        
                        <div className="flex min-h-[250px] items-center justify-center">
                            <p className="text-[#2b1a12]/60">
                                Keranjang masih kosong
                            </p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <CartComponent
                                key={item.cartItemId}
                                item={item}
                                onDelete={handleDelete}
                                updateQuantity={handleUpdateQuantity}
                            />

                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="shrink-0 border-t border-[#2b1a12] px-5 py-5 md:px-7">

                            <div className="mb-5">
                                 <span className="text-lg font-semibold ">
                                    Pilih Cabang
                                 </span>
                            </div>
                            


                        <div className="mb-5 flex-col gap-3 sm:flex-row">    
                            <select 
                                name="branchId"
                                onChange={handleChange} 
                                className="w-full rounded-xl border border-[#f0543a] px-5 py-3 font-semibold text-[#f0543a] transition hover:bg-[#f0543a]/10"
                            >
                                <option value="">
                                    Pilih Cabang
                                </option>

                                {
                                    branch.map(cabang => (
                                        <option 
                                            value={cabang.branchId}
                                            key={cabang.branchId}
                                        >
                                            {cabang.branchName}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mb-5">
                                 <span className="text-lg font-semibold ">
                                    Alamat Pengantaran
                                 </span>
                            </div>

                        <div className="mb-5 flex-col gap-3 sm:flex-row">
                            <input 
                                type="text"
                                name="deliveryAddress"
                                value={form.deliveryAddress}
                                placeholder="Masukan Alamat Pengantaran"
                                required
                                className="w-full rounded-xl border border-[#f0543a] px-5 py-3 font-semibold text-[#f0543a] transition hover:bg-[#f0543a]/10" 
                            />
                        </div>

                        <div className="mb-5 flex items-center justify-between">
                            
                            <span className="text-lg font-semibold text-[#2b1a12]">
                                Subtotal
                            </span>

                            <span className="text-2xl font-bold text-[#f0543a]">
                                Rp. {subtotal.toLocaleString("id-ID")}
                            </span>
                        </div>

                        

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full rounded-xl border border-[#f0543a] px-5 py-3 font-semibold text-[#f0543a] transition hover:bg-[#f0543a]/10"
                            >
                                Kembali ke menu
                            </button>

                            <button 
                                type="button"
                                onClick={() => hanldeCheckout()}
                                className="w-full rounded-xl bg-[#f0543a] px-5 py-3 font-semibold text-white transition hover:bg-[#d9442f]"
                            >
                                Checkout
                            </button>
                        </div>

                    </div>
                )}




            </div>


        </div>
    )
}

export default CartItem;