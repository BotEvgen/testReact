import React, { FC, ReactNode, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperClass from 'swiper/types/swiper-class'

import Box from '@mui/material/Box'

import USlider from '@ui/USlider'

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/thumbs/thumbs.min.css'

type TWSlider = Partial<React.ComponentProps<typeof Swiper>> & {
   renderThumbs?: ReactNode[]
   thumbsSwiperProps?: Partial<React.ComponentProps<typeof Swiper>>
}

const WSlider: FC<TWSlider> = ({
   children,
   renderThumbs,
   thumbsSwiperProps,
   ...rest
}) => {
   const thumbsRef = useRef<SwiperClass | null>(null)

   const setSwiperRef = (swiper: SwiperClass) => {
      thumbsRef.current = swiper
   }

   useEffect(() => {
      thumbsRef.current?.updateSlides()
   }, [React.Children.toArray(children).length])

   return (
      <Box>
         <USlider
            {...rest}
            thumbs={{ swiper: thumbsRef.current }}
            allowTouchMove={false}
         >
            {children}
         </USlider>
         {renderThumbs && (
            <Swiper {...thumbsSwiperProps} onSwiper={setSwiperRef}>
               {renderThumbs.map((thumb, index) => (
                  <SwiperSlide key={index}>{thumb}</SwiperSlide>
               ))}
            </Swiper>
         )}
      </Box>
   )
}

export default WSlider
