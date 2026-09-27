import LogoCB from "../assets/images/LogoCB.png";
import {useState } from "react";
import Login from "../Login/login";
import { useAuth } from "./Context";
import { User } from "lucide-react";
import { useRef, useEffect } from "react";


function Navbar(){

    const [isOpen, setIsOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const {isLoggedIn, logout} = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const menuItems =[
        {name: "Home", href: "#home"},
        {name: "Menu", href: "#menu"},
        {name: "About", href:"#about"},
        {name: "Location", href: "#Location"},
        {name: "Contact", href: "#contact"}
];

    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event){
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setIsUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown",handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    },[]);

const handleMenuClick = () => {
    setIsOpen(false);
}


    return (

        <>
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
      
     

        <div className="flex items-center gap-3">
            {isLoggedIn ? (

                <div className="relative" ref={menuRef}>
                     <button
                        type="button"
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="border rounded-full p-2 cursor-pointer"
                    >
                        <User
                            className="cursor-pointer"
                           
                        />
                    </button>

                    {isUserMenuOpen && (
                        <div className="absolute right-0 top-12 w-48 rounded-xl bg-white shadow-lg border border-gray-200 p-2">

                            <button
                                type="button"
                                className="w-full rounded-lg px-4 py-3 text-left hover:bg-red-50"

                            >
                             Profil
                            </button>
                            
                            <button
                                type="button"
                                onClick={logout}
                                className="w-full rounded-lg px-4 py-3 text-left text-red-600 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                </div>
            ) : (
       
                 <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="rounded-full bg-[#2b1a12] px-5 py-2 font-semibold text-white transition hover:bg-red-600"
            >
                Login
            </button>
            )}
           

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
        </div>

     </nav>

     

       <Login
        isOpen={isLoginOpen}
        onClose = {() => setIsLoginOpen(false)}     
     />

    </>
     
    );
    
}

export default Navbar;