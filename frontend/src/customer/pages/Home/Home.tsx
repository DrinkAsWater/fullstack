import React from "react";
import { EletricCategory } from "./EletricCategory/EletricCategory";
import { CategoryGrid } from "./CategoryGrid/CategoryGrid";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import { Button } from "@mui/material";
import { Storefront } from "@mui/icons-material";

const Home = () => {
return(
    
    <div className="sapce-y-5 lg:space-y-10 relative pb-20">
        <EletricCategory/>
        <CategoryGrid/>
        <div className="pt-20">
            <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20 text-center">今日優惠</h1>
            <Deal/>
         </div>
        <section className="py-20">
            <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20 text-center">依類別購物</h1>
        <ShopByCategory/>
         </section>
         <section className=" lg:px-20 relative h-[200px] lg:h-[450px] object-cover">
    <img
        className="w-full h-full "
        src="https://www.tubujx.com/wp-content/uploads/2023/11/20231123132706.jpg"
        alt=""
    />
     <div className="absolute top-1/2  left-4 lg:left-[10rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3">
    <h1 >
      輕鬆上架商品
    </h1>
    <p className="text-xl lg:text-2xl ">
      透過 <span className="logo">DrinkAsWater</span>
    </p>
    <p className="text-xl lg:text-2xl">
      讓賣家更輕鬆
    </p>
    <div className="pt-6 flex justify-start">
        <Button startIcon={<Storefront/>} variant="contained"size="large">
        加入成為賣家 
        </Button>     
    </div>
  </div>
</section>


         
    </div>       
    

)


}

export default Home;