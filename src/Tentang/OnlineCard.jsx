function OnlineCard({image, link}){

    return (
        <div className="w-[100px] h-[100px] bg-white rounded-xl overflow-hidden bg-[#f8f1e7] shadow-md cursor-pointer hover:scale-105 transition duration-200">
            <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
            >   
            <div className="h-[100px] flex items-center justify-center px-4">
                 <img
                src={image} 
                alt="image" 
                className="obejct-contain w-[100px] h-auto" 
            />
            </div>
        
        </a>

        </div>
    );  
}

export default OnlineCard