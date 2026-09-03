import { href } from "react-router-dom";
import LogoCB from "../assets/images/LogoCB.png";
import { useState } from "react";



function Navbar(){

    const[isOpen, setIsOpen] = useState(false);

    const menuItems =[
        {name: "Home", href: "#home"},
        {name: "Menu", href: "#menu"},
        {name: "About", href:"#about"},
        {name: "Location", href: "#Location"},
        {name: "Contact", href: "#contact"}
];

const handleMenuClick = () => {
    setIsOpen(false);
}


    return (
     <nav className="absolute top-0 left-0 z-30 mx-auto flex h-24 w-full items-center justify-between px-6 lg:px-8">
        
      <div className="flex items-center md:flex">
        
            <img 
             src={LogoCB}
             alt="Logo"
             className="w-44 h-44 translate-y-2 -translate-x-5"
            />
      </div>

      <div className="absolute left-1/2 hidden -translate-x-1/2 gap-15 md:flex">
        {menuItems.map((item) => (
            <a 
                key={item.name}
                href={item.href}
                className="font-semibold transition-colors duration-200 hover:text-red-600"
            >
                {item.name}
            </a>
        ))}
      </div>

      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2b1a12]/10 bg-[#fffaf4] text-black transition hover:text-red md:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? "X" : "☰"}
      </button>
        
        {isOpen && (
           <div className="absolute left-4 right-4 top-[150px] rounded-3xl border border-[#2b1a12]/10 bg-[#fffaf4] md:hidden">
            <div className="mt-4 flex flex-col gap-1">  
                {menuItems.map((item) => (
                    <a 
                        key={item.name}
                        href={item.href}
                        onClick={handleMenuClick}
                        className="rounded-full px-4 py-3 text-base font-medium transitions-colors duration-200 hover:bg-[#a52218]"
                    >
                        {item.name}
                    </a>
                ))}
            </div>



           </div>
        )}


     </nav>
    );
    
}

export default Navbar;