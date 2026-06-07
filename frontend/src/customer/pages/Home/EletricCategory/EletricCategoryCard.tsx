import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeCategory } from 'src/types/HomeCategoryTypes';

export const EletricCategoryCard = ({item}:{item:HomeCategory}) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/products/${item.categoryId}`)} className='flex flex-col gap-2 justify-center cursor-pointer'>
      <img
      className='object-contain h-10'
        src={item.image}
        alt=""
        
      />
      <h2 className='font-semibold text-sm text-center'>{item.name}</h2>
    </div>
  );
};
