function MenuCard({image, title, description, price}){


    return (
        <div className="w-[270px] rounded-xl h-full overflow-hidden bg-[#f8f1e7] shadow-md hover:scale-105 transition duration-200 cursor-pointer">

            <img 
                src={image} 
                alt={title}
                className="object-cover h-[190px] w-full" 
            />

            <div className="p-4">
                <h3 className="text-lg font-bold">
                    {title}
                </h3>

                <p className="mt-2 text-sm">
                    {description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-[#B51F18]">
                        Rp. {price.toLocaleString("id-ID")}
                    </span>
                </div>
            </div>
            
        </div>
    );

}

export default MenuCard;