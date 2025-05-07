import { Delete } from '@mui/icons-material'
import { Avatar, Box, Grid2, IconButton, Rating } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const ReviewCard = () => {
  return (
    <div className='flex justify-between '>

      <Grid2 container spacing={9} >

        <Grid2 size={{ xs: 1 }}>
          <Box>
            <Avatar className='text-white ' sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}>
              Z
            </Avatar>
          </Box>

        </Grid2>
        <Grid2 size={{ xs: 9 }}>
          <div className='space-y-2'>
            <div>
              <p className='font-semibold text-lg'>Drink</p>
              <p className="opacity-70">2025-01-09T22:17:11</p>
            </div>

          </div>
          <Rating
            readOnly
            value={4}
            precision={1}
          />
          <p>CP值超高，好產品！</p>
          <div>
            <img className='w-24 h-24 object-cover' src="https://cdn.pixabay.com/photo/2023/11/08/04/30/girl-8373900_1280.jpg" alt="" />
          </div>
        </Grid2>
      </Grid2>
      <div>
        <IconButton>
          <Delete sx={{ color: red[700] }} />
        </IconButton>

      </div>

    </div>
  )
}

export default ReviewCard