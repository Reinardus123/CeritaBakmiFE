import { X } from "lucide-react";
import CartComponent from "./CartComponent";
import api from "../api/api";
import { useState, useEffect } from "react";
import CartConfirmation from "./CartConfirm";
import Swal from "sweetalert2";

function CartItem({onClose}){

    const [cart, setCart] = useState([]);
    const [cartConfirmation, setCartConfirmation] = useState(false);
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

     function handleChange(e){

        setForm({
            ...form,
            [e.target.name] : e.target.value,
        });
        
    }

    function handleBranch(e){
        setForm({
            ...form,
            branchId: Number(e.target.value)
        });
    }

    function handleCheckoutClick(){
        if(!form.branchId){
             Swal.fire({
                icon: "error",
                title: "Checkout gagal",
                text: "Silahkan masukan cabang terdekat",
                confirmButtonColor :"#FFCB56"
            });

            return;
        }

        if(!form.deliveryAddress){
             Swal.fire({
                icon: "error",
                title: "Checkout gagal",
                text: "Silahkan masukan alamat pengantaran",
                confirmButtonColor :"#FFCB56"
            });

            return;
        }

        setCartConfirmation(true);
    }



    async function hanldeCheckout(){

        try{

            const response = await api.post("/checkout/item",{
                branchId: form.branchId,
                deliveryAddress: form.deliveryAddress    
            });


           window.location.href = response.data.whatsappUrl;


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
            
            <div className="relative flex h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl md:h-auto md:max-h-[90vh]">

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

                <div className="min-h-0 flex-1 overflow-y-auto px-4 md:px-6">

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
                    <div className="shrink-0 border-t border-[#2b1a12]/20 px-4 py-3 sm:px-5 sm:py-5">

                           
                                 <span className="block mb-2 text-lg font-semibold">
                                    Pilih Cabang
                                 </span>

                        <div className="mb-5 flex-col gap-3 sm:flex-row">    
                            <select 
                                name="branchId"
                                value={form.branchId}
                                onChange={handleBranch} 
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
                                 <span className="text-lg font-semibold block text-base">
                                    Alamat Pengantaran
                                 </span>
                            </div>

                        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                            <input 
                                type="text"
                                name="deliveryAddress"
                                value={form.deliveryAddress}
                                onChange={handleChange}
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
                                className="w-full rounded-xl border border-[#f0543a] px-5 py-3 font-semibold text-[#f0543a] transition hover:bg-[#f0543a]/10 cursor-pointer"
                            >
                                Kembali ke menu
                            </button>

                            <button 
                                type="button"
                               
                                onClick={handleCheckoutClick}
                                className="w-full rounded-xl bg-[#f0543a] px-5 py-3 font-semibold text-white transition hover:bg-[#d9442f] cursor-pointer"
                            >
                                Checkout
                            </button>
                        </div>

                    </div>
                )}




            </div>

            {cartConfirmation && (
                <CartConfirmation
                    onSubmit={hanldeCheckout}
                    onClose={() => {
                        setCartConfirmation(false);
                    }}
                />
            )}


        </div>
    )
}

export default CartItem;