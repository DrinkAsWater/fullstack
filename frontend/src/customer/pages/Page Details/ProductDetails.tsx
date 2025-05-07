import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { teal } from '@mui/material/colors';
import { Button, Divider } from '@mui/material';
import { AddShoppingCart, Diversity1, FavoriteBorder, LocalShipping, Remove, Shield, Wallet, WorkspacePremium } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import SimilarProduct from './SimilarProduct1';
import ReviewCard from '../Review/ReviewCard';
import { useAppDispatch, useAppSelector } from 'src/State/Store';
import { useParams } from 'react-router-dom';
import { fetchProductById } from 'src/State/customer/ProductSlice';


const ProductDetails = () => {
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useAppDispatch()
  const { productId } = useParams()
  const { product } = useAppSelector(store => store)
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)))
  }, [productId])
  const handleActiveImage = (value: number) => () => {
    setActiveImage(value)
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

          <div className='mt-7 space-y-2'>
            <h1>購買數量</h1>
            <div className='flex items-center gap-2 w-[140px] justify-between'>
              <Button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                <Remove />
              </Button>
              <span>
                {quantity}
              </span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <AddIcon />
              </Button>

            </div>

          </div>


          <div className='mt-12 flex items-center gap-5'>
            <Button
              fullWidth
              variant='outlined'
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}>
              加入購物車
            </Button>

            <Button
              fullWidth
              variant='outlined'
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}>
              願望清單
            </Button>
          </div>
          <div className='mt-5' >
            <p>彈性羅紋針織設計是每年非常流行的單品。
              領口是高領的，所以不需要圍巾！雖然價格不高，但質感很好，建議買兩三個顏色。
              享受與外衣和下裝相配的多彩色彩變化♪
              搭配：
              
              TW
              
              略過導覽功能
              搜尋
              
              
              
              建立
              
              1
              
              顯示圖片
              
              TW
              首頁
              Shorts
              訂閱內容
              個人中心
              觀看記錄
              播放清單
              你的影片
              稍後觀看
              喜歡的影片
              訂閱內容
              
              Stanley 史丹利
              
              Code With Zosh
              
              室友Cyo
              
              滾石唱片 ROCK RECORDS
              
              Code Marshal
              
              Bouali Ali
              
              烙賽瑞奇 Outside Richie
              顯示更多
              探索
              發燒影片
              音樂
              電影
              直播
              遊戲
              新聞
              體育
              課程
              Podcast
              更多 YouTube 功能
              YouTube Premium
              YouTube 工作室
              YouTube Music
              YouTube Kids
              設定
              檢舉記錄
              說明
              提供意見
              簡介媒體著作權與我們聯絡創作者廣告開發人員
              條款隱私權政策與安全性YouTube 運作方式測試新功能
              © 2025 Google LLC
              
              經典的冬季內衣單品，羅紋高領針織衫。
              簡約設計，與任何下裝完美搭配◎
            </p>
          </div>
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