import Navbar from "../Navbar/Navbar";
import HeroSectionBakmi from "../assets/images/HeroSectionBackmi.jpeg";
import Bakmi from "../assets/images/Bakmi.png";
import Quality from "../assets/images/Quality.png";
import Halal from "../assets/images/LogoHalal.png";

function Hero(){
    
    return (
        <section id="home" className="relative min-h-screen overflow-hidden bg-[#f8f1e7]">
         
        <div className="absolute inset-0 md:left-1/2">
            <img 
                src={HeroSectionBakmi} 
                alt="Bakmi"
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-y-0 w-[90%] bg-gradient-to-r from-[#f8f1e7] via-[#f8f1e7]/80 to-transparent sm:w-[65%] md:w-[50%] lg:w-[35%]"/>
        </div>

        <Navbar/>

        <div className="relative z-10 flex min-h-screen flex-col items-start justify-center px-6 pt-24 md:w-1/2">

            <div className="flex flex-col">
                <h1 className="hero text-5xl font-bold leading-[0.95] tracking-tight text-[#2b1a12] md:text-6xl lg:text-7xl">
                    <span className="text-5xl font-bold md:text-6xl text-[#FFCB56]">
                        SETIAP MANGKUK
                    </span>
                    <br />

                    <span className="text-5xl font-semibold text-[#EC5B38] md:text-6xl">
                        PUNYA CERITA
                    </span>
                </h1>

                <p className="mt-6">
                    Nikmati kisah rasa di setiap gigitan,
                    <br />
                    keunggiulan di setiap sajian.
                </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">

                <a 
                    href="#menu"
                    className="rounded-lg bg-[#EC5B38] px-6 py-3 text-centern font-bold transition  hover:bg-[#FFCB56] "
                >
                    Order Now
                </a>

                <a 
                    href="#menu"
                    className="rounded-lg border border-[#EC5B38] bg-transparent px-6 py-3 text-center font-bold transition hover:bg-[#EC5B38]"
                >   
                    Explore Menu
                </a>
                

            </div>

            <div className="mt-12 flex flex-row gap-6">
                <div className="flex items-center gap-4">
                    <img src={Bakmi} alt="bakmi" className="h-8 w-8" />
                    <div >
                        <p className="font-bold">
                            Freshly Made
                        </p>
                        <p>Everyday</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <img src={Quality} alt="quality"  className="h-8 w-8"/>
                        <div>
                            <p className="font-bold">
                                Quality
                            </p>
                            <p>Ingredients</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <img src={Halal} alt="halal" className="h-12 w-12" />
                        <div>
                            <p className="font-bold">
                                100%
                            </p>
                            <p>Halal</p>
                        </div>
                    </div>
                </div>
            </div>



        </div>



        </section>
    )

}

export default Hero;