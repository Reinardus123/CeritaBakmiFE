import { Plus } from "lucide-react";


function MenuCard({image, title, description, price}){


    return (
        <div className="w-[270px] rounded-xl h-full overflow-hidden bg-[#f8f1e7] shadow-md hover:scale-105 transition duration-200 cursor-pointer">

            <img 
                src={image} 
                alt={title}
                className="object-cover h-[190px] w-full" 
            />

            <div className="p-4">
                <h3 className="text-md font-bold">
                    {title}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-[#B51F18]">
                        Rp. {price.toLocaleString("id-ID")}
                    </span>

                    <button
                        type="button"
                        className="border rounded-full p-4 cursor-pointer hover:bg-[#EC5B38] w-12 h-12 flex items-center justify-center"
                    >
                        <Plus/>
                    </button>
                </div>
            </div>
            
        </div>
    );

}

export default MenuCard;