import { useState, useEffect, useRef } from "react";
import lokasi from "../Lokasi.js";
import LokasiCard from "./LokasiCard";

function Lokasi(){

    const [isVisible, setIsVisible] = useState(false);
    const LocRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    setIsVisible(true);
                }
                else{
                    setIsVisible(false);
                }
            } , {
                threshold: 0.2,
            }
        );

        if(LocRef.current){
            observer.observe(LocRef.current);
        }

        return () => observer.disconnect();
    },[]);

    return (
        <div ref={LocRef} id="Location" className={`max-w-8xl px-6 mt-6 transition duration-500 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            
            <h1 className="hero text-5xl font-bold leading-[0.95] tracking tight text-[#FFCB56] md:text-6xl lg:text-6xl">
                Kunjungi kami di 
            </h1>

            <div className="flex flex-col justify-center items-center mt-6 gap-20 lg:flex-row lg:items-stretch">
                {lokasi.map((loc) => (
                    <LokasiCard
                        key={loc.id}
                        {...loc}
                    />
                ))}
            </div>


        </div>
    );
}

export default Lokasi;