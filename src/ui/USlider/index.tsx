import React, { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Thumbs } from 'swiper'
import { Box } from '@mui/material'
import { useSwiperRef } from '@/hooks/useSwiperRef'

type TUSlider = Partial<React.ComponentProps<typeof Swiper>>

SwiperCore.use([Thumbs, Navigation])

const USlider: FC<TUSlider> = ({ children, ...rest }) => {
   const [navigationPrevRef, setNavigationPrevRef] =
      useSwiperRef<HTMLDivElement>()
   const [navigationNextRef, setNavigationNextRef] =
      useSwiperRef<HTMLDivElement>()

   return (
      <Box
         sx={{
            position: 'relative',
         }}
      >
         <Swiper
            {...rest}
            navigation={{
               prevEl: navigationPrevRef,
               nextEl: navigationNextRef,
            }}
         >
            {React.Children.map(children, (child, index) => (
               <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
         </Swiper>
         <Box>
            <div
               className="swiper-button swiper-button-prev"
               ref={setNavigationPrevRef}
            >
               <div className="arrow arrow-left" />
            </div>
            <div
               className="swiper-button swiper-button-next"
               ref={setNavigationNextRef}
            >
               <div className="arrow arrow-right" />
            </div>
         </Box>
      </Box>
   )
}

export default USlider
