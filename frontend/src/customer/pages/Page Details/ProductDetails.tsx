import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { teal } from '@mui/material/colors';
import { Button, Divider, MenuItem, Select } from '@mui/material';
import { AddShoppingCart, FavoriteBorder, LocalShipping, Remove, Shield, Wallet, WorkspacePremium } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import SimilarProduct from './SimilarProduct1';
import ReviewCard from '../Review/ReviewCard';
import { useAppDispatch, useAppSelector } from 'src/State/Store';
import { useParams } from 'react-router-dom';
import { fetchProductById } from 'src/State/customer/ProductSlice';
import { addItemToCart } from 'src/State/customer/cartSlice';
import { addProductToWishlist } from 'src/State/customer/wishlistSlice';


const ProductDetails = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const dispatch = useAppDispatch()
  const { productId } = useParams()
  const { product } = useAppSelector(store => store)
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)))
  }, [productId])

  useEffect(() => {
    if (product.product?.sizes) {
      setSelectedSize(product.product.sizes.split(",")[0].trim())
    }
  }, [product.product])

  const handleActiveImage = (value: number) => () => {
    setActiveImage(value)
  }

  const handleAddToCart = () => {
    dispatch(addItemToCart({
      jwt: localStorage.getItem("jwt"),
      request: { productId: product.product?.id, size: selectedSize, quantity },
    }))
  }

  const handleAddToWishlist = () => {
    if (product.product?.id) {
      dispatch(addProductToWishlist({ productId: product.product.id }))
    }
  }
  return (
    <div className='px-5 lg:px-20 pt-10'>

      <div className='grid grid-col-1 lg:grid-cols-2 gap-10'>
        <section className='flex flex-col lg:flex-row gap-5'>
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product.product?.images.map((item, index) => <img onClick={handleActiveImage(index)} className="lg:w-full w-[50px]" src={item} alt="" />)}

          </div>
          <div className='w-full lg:w-[85%]'>
            <img className='w-full rounded-md  ' src={product.product?.images[activeImage]} alt="" />

          </div>

        </section>

        <section>
          <h1 className='font-bold text-lg text-primary-color'>
            {product.product?.seller?.businessDetails.businessName}
          </h1>
          <p className='text-gray-500 font-semibold'>{product.product?.title}</p>
          <div className='flex justify-between items-center py-2 border w-[180px] px-3 pt-5'>
            <div className='flex gap-1 items-center'>
              <span>4</span>
              <StarIcon sx={{ color: teal[500], fontSize: "17px" }} />

            </div>
            <Divider orientation='vertical' flexItem />
            <span>
              234
            </span>
          </div>
          <div>
            <div className='price flex items-center gap-3'>
              <span className='font-sans text-gray-800'>
                NT${product.product?.sellingPrice}
              </span>
              <span className='thin-line-through text-gray-400'>
                NT${product.product?.mrpPrice}
              </span>
              <span className='text-primary-color font-semibold'>
                {product.product?.discountPercent}%
              </span>
              <p className='text-sm'>加節加鐘不加價QQNT$1500

              </p>
            </div>
          </div>

          <div className='mt-7 space-y-3'>

            <div className='flex items-center gap-4 '>
              <Shield sx={{ color: teal[500] }} />
              <p>正貨保證，品質卓越 </p>
            </div>
            <div className='flex items-center gap-4 '>
              <WorkspacePremium sx={{ color: teal[500] }} />
              <p>不滿意就全額退款</p>
            </div>
            <div className='flex items-center gap-4 '>
              <LocalShipping sx={{ color: teal[500] }} />
              <p>全館免運費，退貨零負擔 </p>
            </div>
            <div className='flex items-center gap-4 '>
              <Wallet sx={{ color: teal[500] }} />
              <p>貨到付款（部分地區適用） </p>
            </div>

          </div>

          {product.product?.sizes && (
            <div className='mt-7 space-y-2'>
              <h1>選擇尺寸</h1>
              <div className='flex flex-wrap gap-2'>
                {product.product.sizes.split(",").map((size) => (
                  <button
                    key={size.trim()}
                    onClick={() => setSelectedSize(size.trim())}
                    className={`px-4 py-1 border rounded-md text-sm font-medium transition-colors
                      ${selectedSize === size.trim() ? "bg-primary-color text-white border-primary-color" : "hover:border-primary-color"}`}
                  >
                    {size.trim()}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className='mt-7 space-y-2'>
            <h1>購買數量</h1>
            <div className='flex items-center gap-2 w-[140px] justify-between'>
              <Button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <AddIcon />
              </Button>
            </div>
          </div>

          <div className='mt-12 flex items-center gap-5'>
            <Button
              onClick={handleAddToCart}
              fullWidth
              variant='outlined'
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}>
              加入購物車
            </Button>
            <Button
              onClick={handleAddToWishlist}
              fullWidth
              variant='outlined'
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}>
              願望清單
            </Button>
          </div>
          {product.product?.description && (
            <div className='mt-5 text-sm text-gray-600 leading-relaxed'>
              <p>{product.product.description}</p>
            </div>
          )}
          <div className='mt-12 space-y-5'>
            <ReviewCard />
            <Divider />
          </div>
        </section>

      </div>

      <div className='mt-20'>
        <h1 className='text-lg font-bold'>
          推薦商品
        </h1>
        <div className='pt-5'>
          <SimilarProduct />
        </div>

      </div>



    </div>
  )
}

export default ProductDetails