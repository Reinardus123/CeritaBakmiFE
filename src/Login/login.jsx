import { useState } from 'react';
import BakmiCeritaBakmi from '../assets/images/BakmiCeritaBakmi.JPEG';
import { User, EyeClosed, Eye } from 'lucide-react';
import api from '../api/api';
import Swal from 'sweetalert2';


function login({isOpen, onClose}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setIsvisible] = useState("");

    if(!isOpen){
        return null;
    }

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post(
                "/auth/login",{
                    username,
                    password
                }
            );
            Swal.fire({
                icon: "success",
                title: "Login berhasil",
                text: "Selamat datang kembali",
                confirmButtonColor :"#FFCB56"
            })

            localStorage.setItem(
                "token",
                response.data.token
            );

            onClose();

        } catch(error){
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Login gagal",
                text: "Cek kembali username dan password anda",
                confirmButtonColor: "#EC5B38"
            })
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
            

            <div className="relative w-full max-w-4xl overflow-hidden bg-white shadow-2xl md:min-h-[520px] rounded-xl">

                <button 
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl text-gray-600 shadow-sm transition hover:bg-gray-100 hover:text-black"
                >
                    X
                </button>

                <div className="grid min-h-[520px] md:grid-cols-2">

                    <div className="relative hidden overflow-hidden bg-red-700 md:block">

                        <img 
                            src={BakmiCeritaBakmi} 
                            alt="Cerita Bakmi" 
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                       <div className="absolute inset-0 bg-black/45"/>

                        <div className="relative z-10 flex h-full flex-col justify-end p-10 text-white">
                            <h2 className="text-4xl font-bold">
                                Selamat Datang Kembali!
                            </h2>

                            <p className="max-w-sm text-sm leading-relaxed text-white/90">
                                Masuk untuk menlanjutkan
                                <br />
                                pesanan dan menikmati
                                <br />
                                pengalaman terbaik di Cerita Bakmi.
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center justify-center px-6 py-12 sm:px-10">

                        <div className="w-full max-w-sm">
                            
                            <div className="mb-8 text-center">

                                <h1 className="text-3xl font-bold text-[#FFCB56]">
                                    Cerita{" "}
                                    <span className="text-[#EC5B38]">
                                        Bakmi
                                    </span>
                                </h1>
                                
                                <p className="mt-2 text-sm text-gray-500">
                                    Masuk ke akun anda
                                </p>
                            </div>

                                <form 
                                    onSubmit={handleLogin}
                                    className="space-y-5"
                                >
                                    <div>

                                        <label 
                                            htmlFor="username"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            Username
                                        </label>

                                        <div className="flex items-center border rounded-xl px-4 py-3">
                                            <input 
                                                type="username"
                                                placeholder="Masukan username anda"
                                                className="w-full outline-none" 
                                                onChange={(e) => setUsername(e.target.value)}
                                            />

                                            <User size={18} className="text-gray-400"/>
                                        </div>

                                       <label 
                                            htmlFor="password"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </label>

                                        <div className="flex items-center border rounded-xl px-4 py-3">
                                            {!visible ? (
                                                <>
                                                <input 
                                                    type="password"
                                                    placeholder="Silahkan masukan password"
                                                    className="w-full outline-none"
                                                    onChange={(e) => setPassword(e.target.value)} 
                                                />
                                                <EyeClosed size={18} className="text-gray-400 cursor-pointer" onClick={() => setIsvisible(true)}/>
                                                </>
                                            ) : (
                                                <>
                                                <input 
                                                    type="text"
                                                    placeholder="Silahkan masukan password"
                                                    className="w-full outline-none"
                                                    onChange={(e) => setPassword(e.target.value)} 
                                                />
                                                <Eye size={18} className="text-gray-400 cursor-pointer" onClick={() => setIsvisible(false)}/>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            
                                            <button
                                                type="button"
                                                className="font-medium text-red-600 hover:underline"
                                            >   
                                                Lupa password ? 
                                            </button>
                                        </div>
                                    </div>

                                     <button
                                            type="submit"
                                            className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 active:scale-[098]"
                                        >
                                            Masuk
                                        </button>
                                </form>

                                <div className="mt-7 text-center text-sm text-gray-500">
                                    
                                    <span>
                                        Belum punya akun? {""}
                                    </span>

                                    <button
                                        type="button"
                                        className="font-semibold text-red-600 hover:underline"
                                    >
                                        Daftar sekarang
                                    </button>

                                </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}


export default login;