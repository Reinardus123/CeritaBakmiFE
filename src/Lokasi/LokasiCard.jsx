import { LocationEdit, Phone, Clock } from "lucide-react"
function LokasiCard ({image, alamat, telepon, jam, link}){

    return (

        <div className="w-full max-w-[540px] h-full rounded-xl overflow-hidden bg-[#EC5B38] shadow-md hover:scale-105 transition duration-200 cursor-pointer">
            <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
            >
            <img 
                src={image} 
                alt={alamat}
                className="object-cover h-[500px] w-full" 
            />

            <div className="p-4">
                <div className="flex items-center gap-4">
                    <div className="w-6 shrink-0 flex justify-center">
                        <LocationEdit size={24} className="text-white"/>
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-white">
                        {alamat}
                    </h3>
                </div>

                <div className="flex items-center gap-4 mt-3">
                     <div className="w-6 shrink-0 flex justify-center">
                        <Phone size={24} className="text-white"/>
                    </div>

                    <h3 className="text-lg font-semibold text-white text-md">
                        {telepon}
                    </h3>
                </div>

                <div className="flex items-center gap-4 mt-3">
                     <div className="w-6 shrink-0 flex justify-center">
                        <Clock size={24} className="text-white"/>
                    </div>

                    <h3 className="text-lg font-semibold text-white text-md">
                        {jam}
                    </h3>
                </div>
            </div>
            </a>
        </div>

    );
}

export default LokasiCard;