import MenuCard from "./MenuCard.jsx";
import menuData from "../menu.js";
import { useState,useRef, useEffect } from "react";

function Menu(){
    const[selectedCategories, setSelectedCategories] = useState("Bakmi");
    const [isVisible, setIsVisible] = useState(false);
    const expRef = useRef(null);

    const categories = [...new Set(menuData.map((menu) => menu.category))];
    const filteredCategories = 
    selectedCategories === "" ? menuData : menuData.filter((menu) => menu.category === selectedCategories);

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
        if(expRef.current){
            observer.observe(expRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        
        <div ref={expRef} id="menu" className={`mx-auto max-w-8xl px-6 transition-all duration-500 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
            
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-4">
                <h1 className="hero text-5xl font-bold leading-[0.95] tracking-tight text-[#2b1a12] md:text-6xl lg:text-7xl">
                    <span className="text-5xl font-bold md:text-6xl text-[#FFCB56]">
                        Menu
                    </span>
                </h1>
                <div className="mt-4 flex md:justify-center gap-3 overflow-x-auto pb-2">
                   
                        {categories.map((category) => (
                            <button 
                                key={category}
                                className="rounded-full bg-[#EC5B38] px-5 py-2 text-white cursor-pointer hover:scale-105 transition duration-200 shrink-0"
                                onClick={() => setSelectedCategories(category)}
                            >
                                {category}
                            </button>
                        ))}
                    
                </div>
            </div>

            <div className="grid grid-cols-1 justify-items-center gap-4 mt-6 md:grid-cols-3 lg:grid-cols-5">

                {filteredCategories.map((menu) => (
                    <MenuCard
                        key={menu.title}
                        {...menu}
                    />
                ))}
            </div>

        </div>


    );

}

export default Menu;