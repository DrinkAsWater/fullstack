import React from 'react'
import { menLevelTwo } from 'src/data/category/level two/menLevelTwo'
import { womenLevelTwo } from 'src/data/category/level two/womenLevelTwo'
import { electronicsTwo } from 'src/data/category/level two/electronicsTwo'
import { furnitureLevelTwo } from 'src/data/category/level two/funitureTwo'
import { kidsLevelTwo } from 'src/data/category/level two/kidsTwo'
import { sportsLevelTwo } from 'src/data/category/level two/sportsTwo'
import { beautyLevelTwo } from 'src/data/category/level two/beautyTwo'
import { accessoriesLevelTwo } from 'src/data/category/level two/accessoriesTwo'
import { menLevelThree } from 'src/data/category/level three/menLevelThree'
import { womenLevelThree } from 'src/data/category/level three/womenLevelThree'
import { electronicsThree } from 'src/data/category/level three/electronicsThree'
import { furnitureLevelThree } from 'src/data/category/level three/funitureThree'
import { kidsLevelThree } from 'src/data/category/level three/kidsThree'
import { sportsLevelThree } from 'src/data/category/level three/sportsThree'
import { beautyLevelThree } from 'src/data/category/level three/beautyThree'
import { accessoriesLevelThree } from 'src/data/category/level three/accessoriesThree'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const categoryTwo: { [key: string]: any[] } = {
    men:            menLevelTwo,
    women:          womenLevelTwo,
    kids:           kidsLevelTwo,
    electronics:    electronicsTwo,
    home_furniture: furnitureLevelTwo,
    sports_outdoor: sportsLevelTwo,
    beauty:         beautyLevelTwo,
    accessories:    accessoriesLevelTwo,
}
const categoryThree: { [key: string]: any[] } = {
    men:            menLevelThree,
    women:          womenLevelThree,
    kids:           kidsLevelThree,
    electronics:    electronicsThree,
    home_furniture: furnitureLevelThree,
    sports_outdoor: sportsLevelThree,
    beauty:         beautyLevelThree,
    accessories:    accessoriesLevelThree,
}

const CategorySheet = ({ selectedCategory, setShowSheet }: any) => {
    const navigate = useNavigate();

    const childCategory = (category: any, parentCategoryId: any) => {
        return category.filter((child: any) => child.parentCategoryId === parentCategoryId)
    }

    return (
        <Box sx={{ zIndex: 2 }} className="bg-white shadow-lg lg:h-[500px] overflow-y-auto">
            <div className='flex text-sm flex-wrap'>
                {categoryTwo[selectedCategory]?.map((item, index) => (
                    <div key={item.categoryId} className={`p-8 lg:w-[20%] ${index % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                        <p className='text-primary-color mb-5 font-semibold'>{item.name}</p>
                        <ul className='space-y-3'>
                            {childCategory(categoryThree[selectedCategory], item.categoryId).map((child: any) => (
                                <li
                                    key={child.categoryId}
                                    onClick={() => navigate("/products/" + child.categoryId)}
                                    className='hover:text-primary-color cursor-pointer'
                                >
                                    {child.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Box>
    )
}

export default CategorySheet
