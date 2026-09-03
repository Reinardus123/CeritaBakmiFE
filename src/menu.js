import BakmiAyamLebar from "./assets/images/BakmiAyamLebar.jpeg";
import BakmiLebarAyamKampung from "./assets/images/BakmiLebarAyamKampung.JPEG"; 
import BihunAyam from "./assets/images/BihunAyam.JPEG";
import BihunAyamKampung from "./assets/images/BihunAyamKampung.JPEG";
import BakmiAyamKampung from "./assets/images/BakmiAyamKampung.JPEG";
import KwetiawAyam from "./assets/images/KwetiawAyam.JPEG";
import Kwetiaw from "./assets/images/Kwetiaw.JPEG";
import BakmiAja from "./assets/images/BakmiAja.jpeg";
import BaksoGoreng from "./assets/images/BasoGoreng.JPEG";
import PangsitKuah from "./assets/images/PangsitKuah.JPEG";
import BaksoKuah from "./assets/images/BaksoKuah.JPEG";
import PangsitGoreng from "./assets/images/PangsitGoreng.JPEG";
import CirengGoreng from "./assets/images/CirengGoreng.jpeg";
import KentangGoreng from "./assets/images/KentangGoreng.jpeg";
import RotiBakar from "./assets/images/RotiBakar.JPEG";
import PisanGoreng from "./assets/images/PisangGoreng.JPEG";

const menu = [
    {
        id: 1,
        title: "Bakmi Kecil Ayam Kecap",
        description: "Bakmi kecil dengan topping daging ayam kecap.",
        price: 26000,
        image: BakmiAja,
        category: "Bakmi"
    },

    {
        id:2,
        title: "Bakmi Kecil Ayam Kampung",
        description: "Bakmi kecil dengan topping ayam kampung.",
        price: 36000,
        image: BakmiAyamKampung,
        category: "Bakmi"
    },

    {
        id: 3,
        title: "Bakmi Lebar Ayam Kecap",
        description: "Bakmi lebar dengan topping ayam cincang.",
        price: 26000,
        image: BakmiAyamLebar,
        category: "Bakmi"
    }, 

    {
        id: 4,
        title: "Bakmi Lebar Ayam Kampung",
        description: "Bakmi lebar dengan topping ayam kampung.",
        price: 36000,
        image: BakmiLebarAyamKampung,
        category: "Bakmi"
    },

    {
        id: 5,
        title: "Kwetiaw Ayam Kecap",
        description: "Kwetiaw dengan topping ayam cincang.",
        price: 26000,
        image: KwetiawAyam,
        category: "Bakmi"
    },

    {
        id:6,
        title: "Kwetiaw Ayam Kampung",
        description: "Kwetiaw dengan topping ayam kampung.",
        price: 36000,
        image: Kwetiaw,
        category: "Bakmi"
    },

    {
        id: 7,
        title: "Bihun Ayam Kecap",
        description: "Bihun dengan topping ayam cincang.",
        price: 26000,
        image: BihunAyam,
        category: "Bakmi"
    },

    {
        id: 8,
        title: "Bihun Ayam Kampung",
        description: "Bihun dengan topping ayam kampung.",
        price: 36000,
        image: BihunAyamKampung,
        category: "Bakmi"
    },

    {
        id:9,
        title: "Bakso Goreng",
        description : "Bakso goreng yang trbuat dari daging ayam",
        price: 12000,
        image: BaksoGoreng,
        category: "Lainnya"
    },

    {
        id:10,
        title: "Pangsit kuah (5 pcs)",
        description: "Pangsit kuah",
        price: 18000,
        image: PangsitKuah,
        category: "Lainnya"
    },

    {
        id: 11,
        title: "Bakso kuah (5 pcs)",
        description: "Bakso sapi kuah",
        price: 18000,
        image: BaksoKuah,
        category:  "Lainnya"
    }, 

    {
        id:12,
        title: "Pangsit Goreng (5 pcs)",
        description: "Pangsit Goreng",
        price: 20000,
        category: "Lainnya",
        image: PangsitGoreng
    }, 

    {
        id: 13,
        title: "Cireng Goreng",
        description: "Cireng Goreng",
        price:23000,
        category: "Cemilan",
        image: CirengGoreng 
    }, 
    {
        id:14,
        title: "Kentang Goreng",
        description: "Kentang Goreng",
        price: 22000,
        category: "Cemilan",
        image: KentangGoreng
    }, 

    {
        id: 15,
        title: "Roti Bakar",
        description: "Roti bakar cokelat keju",
        price: 25000,
        category: "Cemilan",
        image: RotiBakar
    }, 

    {
        id:16,
        title : "Pisang Goreng Wijen",
        description: "Pisang Goreng Wijen",
        price : 23000,
        category: "Cemilan",
        image: PisanGoreng
    }
];

export default menu;