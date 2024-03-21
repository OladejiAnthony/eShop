/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import "./Slider.scss"
import { sliderData } from './slider-data'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai"

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;
  //console.log(slideLength);

  //AutoSlide effect
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000; //5secs

  const nextSlide = () => {
    //setCurrentSlide(currentSlide + 1)
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
  }

  const prevSlide = () => {
    //setCurrentSlide(currentSlide - 1)
    setCurrentSlide(currentSlide === 0 ? slideLength - 1  : currentSlide - 1)
  }

  useEffect(() => {
    setCurrentSlide(0) 
    //everytime page reloads or rerenders
  },[])

  // const auto = () => {
  //   slideInterval = setInterval(nextSlide, intervalTime);
  // };
  
  useEffect(() => {
    if(autoScroll) {
        const auto = () => {
            slideInterval = setInterval(nextSlide, intervalTime)
          }
        auto();
    }
    return () => clearInterval(slideInterval);
  },[currentSlide, slideInterval, autoScroll])

  
  return (
    <div className='slider'>
        <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />
        <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
        {
            sliderData.map((slide, index) => {
                const {image, heading, desc} = slide;
                return (
                    <div 
                        key={index} 
                        className={index === currentSlide ? "slide current" : "slide"}
                    >
                        {index === currentSlide && (
                            <>
                                <img src={image} alt='slide'  />
                                <div className='content'>
                                    <h2>{heading}</h2>
                                    <p>{desc}</p>
                                    <hr />
                                    {/*Anchor tag slides down to the products section */}
                                    <a href='#product' className='--btn --btn-primary'>Shop Now</a>
                                </div>
                            </>
                        )}
                    </div>
                )
            })
        }
    </div>
  )
}

export default Slider
