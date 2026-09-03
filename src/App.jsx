import Hero from "./HeroSection.jsx/Hero";
import Menu from "./Menu/Menu";
import About from "./Tentang/About";
import Lokasi from "./Lokasi/Lokasi";

function App(){
    
    return(

        <div className="bg-[#f8f1e7] pb-20">
            <Hero/>
            <Menu/>
            <About/>
            <Lokasi/>
        </div>
        
        
    );
}

export default App;