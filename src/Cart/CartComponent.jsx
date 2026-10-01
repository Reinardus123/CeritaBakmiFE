import { Trash, Minus, Plus } from "lucide-react";

function CartComponent({item, onDelete}){

    console.log("ITEM DI CART COMPONENT:", item);
    return (
       
        <div className="border-b border-[#2b1a12]/10 py-5">
            
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5">

                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img 
                         src={`http://localhost:8080${item.imageUrl}`} 
                        alt={item.menuTitle}
                        className="h-full w-full object-cover" 
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div>   
                            <h3 className="font-semibold text-lg text-[#2b1a12]">
                                {item.menuTitle}
                            </h3>

                            <p className="mt-1 font-semibold text-[#f0543a]">
                                Rp. {item.price.toLocaleString("id-ID")}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => onDelete(item)}
                            className="text-[#2b1a12]/50 transition hover:text-[#f0543a] md:hidden"
                        >

                            <Trash size={20}/>

                        </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4 md:mt-0 md:justify-end">
                        
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2b1a12]/20 transition hover:bg-[#f0543a] hover:text-white"
                            >
                                <Minus size={15}/>
                            </button>

                             <span className="w-5 text-center font-semibold">
                                {item.quantity}
                            </span>

                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0543a] text-white transition:hover:bg-[#d9442f] "
                            >
                                <Plus size={15}/>
                            </button>
                        </div>

                    <div className="min-w-[110px] text-right font-semibold text-[#2b1a12]">
                        Rp. {item.subtotal.toLocaleString("id-ID")}
                    </div>

                    <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="hidden text-[#2b1a12]/50 transition hover:text-[#f0543a] md:block cursor-pointer"
                    >
                        <Trash size={20}/>
                    </button>


                    </div>
                </div>
            </div>

        </div>
    )

}

export default CartComponent;