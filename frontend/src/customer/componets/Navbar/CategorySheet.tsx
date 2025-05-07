import React from 'react'
import { menLevelTwo } from 'src/data/category/level two/menLevelTwo'
import { womenLevelTwo } from 'src/data/category/level two/womenLevelTwo'
import { electronicsTwo } from 'src/data/category/level two/electronicsTwo'
import { furnitureLevelTwo } from 'src/data/category/level two/funitureTwo'
import { menLevelThree } from 'src/data/category/level three/menLevelThree'
import { womenLevelThree } from 'src/data/category/level three/womenLevelThree'
import { electronicsThree } from 'src/data/category/level three/electronicsThree'
import { furnitureLevelThree } from 'src/data/category/level three/funitureThree'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const categoryTwo: { [key: string]: any[] } = {
    men: menLevelTwo,
    women: womenLevelTwo,
    electronics: electronicsTwo,
    home_funiture: furnitureLevelTwo
}
const categoryThree: { [key: string]: any[] } = {
    men: menLevelThree,
    women: womenLevelThree,
    electronics: electronicsThree,
    home_funiture: furnitureLevelThree
}




const CategorySheet = ({ selectedCategory, setShowSheet }: any) => {
    const navigate = useNavigate();

    const childCategory = (category: any, parentCategoryId: any) => {
        return category.filter((child: any) => child.parentCategoryId == parentCategoryId)
    }

    return (
        <Box sx={
            { zIndex: 2 }
        } className="bg-white shadow-lg lg:h-[500px] overflow-y-auto">
            <div className='flex text-sm flex-wrap'>
                {
                    categoryTwo[selectedCategory]?.map((item, index) => <div className={`p-8 lg:w-[20%] ${index % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                        <p className='text-primary-color mb-5 font-semibold'>{item.name}</p>
                        <ul className='sace-y-3'>

                            {childCategory(categoryThree[selectedCategory], item.categoryId).map
                                ((item: any) => <div>

                                    <li onClick={() => navigate("/products/" + item.categoryId)} className='hover:text-primary-color cursor-pointer'>
                                        {item.name}
                                    </li>
                                </div>)}



                        </ul>

                    </div>)
                }

            </div>

        </Box>
    )
}

export default CategorySheet