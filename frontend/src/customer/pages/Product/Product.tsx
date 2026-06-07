import React, { useEffect, useState } from 'react'
import FilterSection from './FilterSection'
import ProductCard from './ProductCard'
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, useTheme } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'
import { fetchAllProducts } from 'src/State/customer/ProductSlice'
import { useAppDispatch, useAppSelector } from 'src/State/Store'
import { useParams, useSearchParams } from 'react-router-dom'

const categoryLabel: Record<string, string> = {
    // L1
    men: "男裝", women: "女裝", kids: "童裝", electronics: "電子產品",
    home_furniture: "家居傢俱", sports_outdoor: "運動戶外", beauty: "美妝保養", accessories: "手錶飾品",
    // Men L2/L3
    men_tops: "男士上衣", men_bottoms: "男士褲裝", men_outerwear: "男士外套",
    men_footwear: "男士鞋類", men_fashion_accessories: "男士配件",
    men_short_sleeve_tshirts: "男士短袖T恤", men_long_sleeve_shirts: "男士長袖襯衫",
    men_polos: "男士Polo衫", men_hoodies: "男士連帽衫", men_jeans: "男士牛仔褲",
    men_casual_pants: "男士休閒褲", men_sports_pants: "男士運動褲", men_suit_pants: "男士西裝褲",
    men_shorts: "男士短褲", men_jackets: "男士夾克", men_windbreakers: "男士風衣",
    men_down_jackets: "男士羽絨衣", men_blazers: "男士西裝外套", men_sneakers: "男士運動鞋",
    men_formal_shoes: "男士正裝鞋", men_casual_shoes: "男士休閒鞋", men_sandals: "男士涼鞋",
    men_sunglasses: "男士太陽眼鏡", men_belt: "男士皮帶", men_hats: "男士帽子", men_bags: "男士包包",
    // Women L2/L3
    women_tops: "女士上衣", women_dresses: "女士裙裝", women_pants: "女士褲裝",
    women_outerwear: "女士外套", women_footwear: "女士鞋類", women_accessories: "女士配件",
    women_shirts: "女士襯衫", women_tshirts: "女士T恤", women_tank_tops: "女士背心",
    women_knit_sweaters: "女士針織毛衣", women_casual_dresses: "女士連身裙",
    women_evening_dresses: "女士晚禮服", women_skirts: "女士半身裙", women_mini_skirts: "女士迷你裙",
    women_jeans: "女士牛仔褲", women_casual_pants: "女士休閒褲", women_suit_pants: "女士西裝褲",
    women_yoga_pants: "女士瑜伽褲", women_trench_coats: "女士風衣", women_down_jackets: "女士羽絨衣",
    women_cardigans: "女士開衫", women_heels: "女士高跟鞋", women_sneakers: "女士運動鞋",
    women_sandals: "女士涼鞋", women_boots: "女士靴子", women_bags: "女士包包",
    women_sunglasses: "女士太陽眼鏡", women_scarves: "女士絲巾",
    // Kids
    boys: "男童", girls: "女童", babies: "嬰幼兒", kids_footwear: "童鞋",
    boys_tshirts: "男童T恤", boys_pants: "男童褲子", boys_jackets: "男童外套", boys_sets: "男童套裝",
    girls_dresses: "女童洋裝", girls_tshirts: "女童T恤", girls_skirts: "女童裙子",
    baby_onesies: "嬰兒連身衣", baby_sets: "嬰兒套裝",
    // Electronics
    smartphones: "智慧手機", laptops: "筆記型電腦", headphones: "耳機音響",
    tablets: "平板電腦", cameras: "相機攝影", smartwatches: "智慧手錶",
    game_consoles: "遊戲主機", computer_accessories: "電腦配件",
    iphone_15: "Apple iPhone 15", galaxy_s24: "Samsung Galaxy S24",
    macbook_pro_14: "MacBook Pro 14吋", dell_xps_13: "Dell XPS 13",
    bose_qc_45: "Bose QuietComfort 45", sony_wh_1000xm5: "Sony WH-1000XM5",
    // Furniture
    sofa: "沙發", bed: "床具", dining_table_chairs: "餐桌椅", bookshelf: "書櫃",
    tv_stand: "電視櫃", chair: "椅子", cabinet: "櫥櫃",
    l_shaped_sofa: "L型沙發", double_bed: "雙人床", office_chair: "辦公椅",
    // Sports
    fitness: "健身運動", outdoor: "戶外探險", ball_sports: "球類運動",
    sports_footwear: "運動鞋類", swimming: "游泳水上",
    fitness_clothing: "健身服", yoga_gear: "瑜伽用品", hiking_gear: "登山裝備",
    camping_gear: "露營用品", running_shoes: "跑步鞋", training_shoes: "訓練鞋",
    // Beauty
    skincare: "護膚", makeup: "彩妝", perfume: "香水", haircare: "髮型護理",
    moisturizer: "保濕乳液", sunscreen: "防曬乳", serum: "精華液", face_mask: "面膜",
    lipstick: "口紅唇彩", foundation: "粉底液", women_perfume: "女士香水", shampoo: "洗髮精",
    // Accessories
    watches: "手錶", jewelry: "珠寶飾品", bags: "包包皮件", eyewear: "眼鏡",
    mechanical_watches: "機械錶", smart_watches: "智慧手錶", fashion_watches: "時尚手錶",
    necklaces: "項鍊", bracelets: "手鍊", earrings: "耳環", rings: "戒指",
    handbags: "手提包", backpacks: "後背包", wallets: "皮夾",
    sunglasses: "太陽眼鏡", optical_glasses: "光學眼鏡",
}

const Product = () => {
    const theme = useTheme()
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"))
    const [sort, setSort] = useState<string>("")
    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();
    const [searchParam, setSearchParams] = useSearchParams();
    const { category } = useParams();
    const { product } = useAppSelector((store => store))
    const handleSortChange = (event: any) => {
        setSort(event.target.value)
        setPage(1)
    }
    const handlePageChange = (value: number) => {
        setPage(value)
    }
    useEffect(() => {
        const [minPrice, maxPrice] = searchParam.get("price")?.split("-") || [];
        const color = searchParam.get("color");
        const size = searchParam.get("size");
        const minDiscount = searchParam.get("discount") ? Number(searchParam.get("discount")) : undefined;
        const pageNumber = page - 1;
        dispatch(fetchAllProducts({
            category: category || undefined,
            color: color || undefined,
            size: size || undefined,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            minDiscount,
            sort: sort || "",
            pageNumber,
        }))
    }, [category, searchParam, sort, page])

    const title = category ? (categoryLabel[category] || category.replace(/_/g, " ")) : "所有商品"

    return (
        <div className='z-10 mt-10'>
            <div>
                <h1 className='text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase'>{title}</h1>
            </div>

            <div className='lg:flex'>
                <section className='filter_section hidden lg:block w-[20%]'>
                    <FilterSection />
                </section>
                <div className='w-full lg:w-[80%] space-y-5'>
                    <div className='flex justify-between items-center px-9 h-[4]'>
                        <div className='relative w-[50%]'>
                            {!isLarge && (<IconButton>
                                <FilterAlt />
                            </IconButton>)
                            }
                            {!isLarge && (<Box>
                                <FilterSection />
                            </Box>)
                            }
                        </div>

                        <FormControl size='small' sx={{ width: "200px" }}>
                            <InputLabel id="demo-simple-select-label">排序</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                label="Age"
                                onChange={handleSortChange}
                            >
                                <MenuItem value={"price_low"}>價格：從低到高</MenuItem>
                                <MenuItem value={"price_high"}>價格：從高到低</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Divider />
                    <section className='products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center'>
                        {product.products.map((item) => <ProductCard key={item.id} item={item} />)}
                    </section>
                    <div className='flex justify-center py-10'>
                        <Pagination
                            page={page}
                            onChange={(e, value) => handlePageChange(value)}
                            count={product.totalPage}
                            variant="outlined"
                            color='primary' />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Product