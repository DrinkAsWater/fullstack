import React, { MouseEvent, useEffect, useState } from 'react'
import './ProuctCard.css'
import { Button } from '@mui/material'
import { Favorite, ModeComment } from '@mui/icons-material'
import { teal } from '@mui/material/colors'
import { Product } from 'src/types/ProductTypes'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'src/State/Store'
import { addProductToWishlist } from 'src/State/customer/wishlistSlice'

const ProductCard = ({ item }: { item: Product }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isHover, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {

    let interval: any
    if (isHover) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      }, 1000);
    }
    else if (interval) {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);

  }, [isHover])

  const handleWihlist=(e:any)=>{
    e.stopPropagation();
    item.id &&  dispatch(addProductToWishlist({ productId: item.id  }))
  }

  return (
    <div onClick={() => navigate(`/product-details/${item.category?.categoryId}/
    ${item.title}/${item.id}`)} className='group px-4 relative'>
      <div className='card'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {item.images.map((item, index) => <img
          className='card-media object-top'
          src={item} alt=""
          style={{ transform: `translateX(${(index - currentImage) * 100}%)` }}
        />)}

        {isHover && <div className='indicator flex flex-col items-center space-y-2'>
          <div className='flex gap-3'>
            <Button onClick={handleWihlist} variant='contained' >
              <Favorite />
            </Button>
            <Button variant='contained' >
              <ModeComment />
            </Button>
          </div>
        </div>
        }
      </div>
      <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
        <div className='name'>
          <h1>{item.seller?.businessDetails.businessName}</h1>
          <p>{item.title}</p>
        </div>
        <div className='price flex items-center gap-3'>

          <span className="font-sans text-gray-800">
            NT${item.sellingPrice}
          </span>
          <span className='thin-line-through text-gray-400'>
            NT$ {item.mrpPrice}
          </span>
          <span className='text-primary-color font-semibold'>
            {item.discountPercent}%
          </span>

        </div>

      </div>

    </div>

  )
}

export default ProductCard