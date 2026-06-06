import React from "react";
import { EletricCategory } from "./EletricCategory/EletricCategory";
import { CategoryGrid } from "./CategoryGrid/CategoryGrid";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import { Button } from "@mui/material";
import { Storefront } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="space-y-5 lg:space-y-10 relative pb-20">
            <EletricCategory />
            <CategoryGrid />
            <section className="pt-10 lg:pt-16">
                <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10 text-center">
                    今日優惠
                </h1>
                <Deal />
            </section>
            <section className="py-10 lg:py-16">
                <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-10 text-center">
                    依類別購物
                </h1>
                <ShopByCategory />
            </section>
            <section className="lg:px-20 relative h-[200px] lg:h-[450px] overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="成為賣家"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-1/2 left-4 lg:left-[10rem] transform -translate-y-1/2 text-white space-y-3">
                    <h1 className="font-bold text-xl lg:text-4xl">輕鬆上架商品</h1>
                    <p className="text-base lg:text-2xl">
                        透過 <span className="logo">DrinkAsWater</span>
                    </p>
                    <p className="text-base lg:text-2xl">讓賣家更輕鬆</p>
                    <div className="pt-4">
                        <Button
                            onClick={() => navigate("/become-seller")}
                            startIcon={<Storefront />}
                            variant="contained"
                            size="large"
                        >
                            加入成為賣家
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
