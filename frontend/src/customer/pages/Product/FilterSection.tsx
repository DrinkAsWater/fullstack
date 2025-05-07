import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { teal } from '@mui/material/colors'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { colors } from 'src/data/Filter/color'
import { discount } from 'src/data/Filter/discount'
import { price } from 'src/data/Filter/price'

const FilterSection = () => {
  const [expendColor, setExpendColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleColorToggle = () => {
    setExpendColor(!expendColor);
  };
  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  }

  const clearAllFilters = () => {
    console.log("clearAllFilters", searchParams)
    searchParams.forEach((value: any, key: any) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };



  return (
    <div className='-z-50 space-y-5 bg-white'>
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
        <p className="text-lg font-semibold">
          篩選條件
        </p>
        <Button onClick={clearAllFilters} size='small' className='text-teal-600 cursor-pointer font-semibold'>
          清除全部
        </Button>
      </div>
      <Divider />

      <div className='px-9 space-y-6'>
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
              }}
              className='text-2xl font-semibold'
              id='color'>
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby="color"
              defaultValue=""
              name="color"
              onChange={updateFilterParams}
            >
              {colors.slice(0, expendColor ? colors.length : 5).map((item) => <FormControlLabel value={item.name} control={<Radio />} label={<div className='flex items-center gap-3'>
                <p>{item.name}</p>
                <p style={{ backgroundColor: item.hex }} className={`h-5 w-5 rounded-full 
        ${item.name === "white" ? "border" : ""}`}>

                </p>
              </div>} />
              )}


            </RadioGroup>
          </FormControl>
          <div>
            <button
              onClick={handleColorToggle}
              className=' text-primary-color cursor-pointer hover:text-teal-900 flex items-center'>
              {expendColor ? "hide" : `+${colors.length - 5}more`}
            </button>
          </div>

        </section>

        <section>
          <FormControl>
            <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", pb: "14px", color: teal[600] }}
              className='text-2xl font-semibold'
              id="price">
              價格
            </FormLabel>
            <RadioGroup
              name="price"
              onChange={updateFilterParams}
              aria-labelledby="price"
              defaultValue=""

            >
              {price.map((item, index) => (<FormControlLabel
                key={item.name}
                value={item.value} control={<Radio size='small' />}
                label={item.name} />))}

            </RadioGroup>
          </FormControl>
          <Divider />
        </section>
        <section>
          <FormControl>
            <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", pb: "14px", color: teal[600] }}
              className='text-2xl font-semibold'
              id="brand">
              折扣優惠
            </FormLabel>
            <RadioGroup
              name="discount"
              onChange={updateFilterParams}
              aria-labelledby="brand"
              defaultValue=""

            >
              {discount.map((item, index) => (<FormControlLabel
                key={item.name}
                value={item.value} control={<Radio size='small' />}
                label={item.name} />))}

            </RadioGroup>
          </FormControl>
          <Divider />

        </section>

      </div>



    </div>
  )
}

export default FilterSection