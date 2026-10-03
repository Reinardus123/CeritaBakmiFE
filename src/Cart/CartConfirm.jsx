
function CartConfirmation({onClose, onSubmit}){
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
            
            <div className="w-full max-w-[400px] rounded-xl bg-white p-5">

                <div className="flex items-center justify-center">
                    <span className="text-lg font-semibold text-[#2b1a12]"> 
                        Apakah pesanan anda sudah sesuai ?
                    </span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row mt-5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-xl border border-[#f0543a] px-5 py-3 font-semibold text-[#f0543a] transition hover:bg-[#f0543a]/10 cursor-pointer"
                    >
                        Kembali ke keranjang 
                    </button>

                     <button
                        type="button"
                        onClick={onSubmit}
                        className="w-full rounded-xl bg-[#f0543a] px-5 py-3 font-semibold text-white transition hover:bg-[#d9442f] cursor-pointer"
                    >
                        Proses 
                    </button>


                </div>

            </div>




        </div>
    )
}

export default CartConfirmation;