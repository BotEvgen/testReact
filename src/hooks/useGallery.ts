import React, { useState } from 'react'

import { TWFeatureMediaProps } from '@widgets/WFeatureMedia'


type TGalleryReturnEntity = {
   slides: TPictureEntity[] | []
   setSlides: React.Dispatch<React.SetStateAction<TPictureEntity[] | []>>
   addSlide: (slide: TPictureEntity) => void
   editSLide: (index: number, newSlideInfo: TWFeatureMediaProps) => void
   replaceSlides: (first: number, second: number) => void
   remove: (indexOfRemove: number) => void
   resetGallery: () => void
   options: {
      galleryIsEmpty: boolean
   }
}

const useGallery = (
   initialSlides: TPictureEntity[] | [] = []
): TGalleryReturnEntity => {
   const [slides, setSlides] = useState<TPictureEntity[] | []>([
      ...initialSlides,
   ])

   const galleryIsEmpty = !slides.length

   const addSlide = (slide: TPictureEntity) => {
      setSlides((prevSlides) => [...prevSlides, slide])
   }

   const editSLide = (index: number, newSlideInfo: TWFeatureMediaProps) => {
      if (slides.length) {
         const picture = { ...slides[index] }

         const slideInfo = { ...newSlideInfo }

         picture.description_text = slideInfo.description
         picture.copyright_credits = slideInfo.copyright || null
         picture.renditions.original.href = slideInfo.src

         const newState = [
            ...slides.slice(0, index),
            picture,
            ...slides.slice(index + 1, slides.length),
         ]
         setSlides(newState)
      }
   }

   const replaceSlides = (first: number, second: number) => {
      if (slides.length > 1) {
         const result = new Map()
         slides.map((_, index) => {
            switch (index) {
               case first:
                  return result.set(index, slides[second])
               case second:
                  return result.set(index, slides[first])
               default:
                  return result.set(index, slides[index])
            }
         })
         setSlides(Array.from(result.values()))
      }
   }

   const remove = (indexOfRemove: number) => {
      if (slides.length) {
         const newState = slides.filter(
            (value, index) => indexOfRemove !== index
         )
         setSlides(newState)
      }
   }

   const resetGallery = () => {
      setSlides([...initialSlides])
   }

   return {
      slides,
      setSlides,
      addSlide,
      replaceSlides,
      editSLide,
      remove,
      resetGallery,
      options: {
         galleryIsEmpty,
      },
   }
}

export { useGallery }
