import React from 'react'

const SimilarProductCard = () => {
  return (
    <div><div className='group px-4 relative'>
    <div className='card'
    
    >
       <img
        className='card-media object-top'
        src={"https://img-retro-girl.freetls.fastly.net/retrogirl/image_item/108/108192/10819210_b.jpg?20241030122315"} alt=""
      />      
    </div>
    <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
      <div className='name'>
        <h1>抽褶絲帶 SH</h1>
        <p>T-shirt</p>
      </div>
      <div className='price flex items-center gap-3'>

        <span className="font-sans text-gray-800">
          NT$1200 
        </span>
        <span className='thin-line-through text-gray-400'>
        NT$ 1800
        </span>
        <span className='text-primary-color font-semibold'>
          60%
        </span>
    
      </div>

    </div>

  </div>
  </div>
    )

}

export default SimilarProductCard