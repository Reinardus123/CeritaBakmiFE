import { useState, useEffect, useRef } from "react";
import Tentang from "../assets/images/Tentang.JPEG";
import tokped from "../assets/images/tokped.png";
import shopee from "../assets/images/Shoppee.png";


function About(){

    const [isVisible, setIsVisible] = useState(false);

    const abRef = useRef(null);

     useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    setIsVisible(true);
                } else{
                    setIsVisible(false);
                }
            },{
                threshold: 0.2,
            }
        );
        if(abRef.current){
            observer.observe(abRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={abRef}
            id="about" 
            className={`max-w-8xl mx-auto mt-6 rounded-lg px-6 transition duration-500 ease-out ${isVisible ? "translate-y-0 opacity-100" : "transalte-y-12 opacity-0"}`}>

             <h1 className="hero text-5xl font-bold leading-[0.95] tracking-tight text-[#FFCB56] md:text-6xl lg:text-6xl">
                    Tentang Kami
             </h1>

             <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-[#EC5B38] rounded-xl mt-4">
               
                    <div className="h-[400px] md:h-[550px]">
                        <img src={Tentang} alt="tentang" className="h-full w-full object-cover" />
                    </div>

                    <div className="flex flex-col justify-center px-8 py-10 md:px-12">
                        <h2 className="hero text-3xl font-bold text-white md:text-4xl">
                            Kami hadir untuk 
                            <br />
                            menyajikan kehangatan
                            <br />
                            dalam setiap mangkuk.
                        </h2>

                        <p className="mt-6 text-white/90">
                            Didirikan pada tahun 2025, berawal dari dapur sederhana,
                            <br />
                            dengan mimpi besar menyajikan bakmi dengan cita rasa autentik,
                            <br />
                            bahan berkualitas, dan harga yang bersahabat.
                        </p>

                        <p className="mt-4 text-white/90">
                            Setiap helai mie dibuat dengan penuh perhatian,
                            <br />
                            setiap topping kami pilih dengan teliti.
                        </p>

                        <div className="mt-8 border-t border-white/40 pt-8">
                            


                        </div>
                    </div>

             </div>
            
        </div>
    );
}

export default About;