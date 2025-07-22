import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useState, useEffect } from 'react'
import { smallHeroVideo,heroVideo } from '../utils'

const Hero = () => {
  useGSAP(()=>{
    gsap.to('.hero-title',{
      opacity:1,
      delay:2,
      duration:1,
      ease:'power2.inOut'
    })
    gsap.from('#cta',{
      opacity:0,
      delay:2,
      duration:1,
      y:100,
      ease:'power2.inOut'
    })
    gsap.to('video',{
      opacity:1,
      delay:0.5,
      duration:1,
      ease:'power2.inOut',
      
    })
  })

  // Handle video src based on innerWidth < 760 and greater, also add useEffect



  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 500
      ? smallHeroVideo
      : heroVideo
  )

  useEffect(() => {
    const handleResize = () => {
      setVideoSrc(
        window.innerWidth < 500
          ? smallHeroVideo
          : heroVideo
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  
  return (
    <section className='w-full nav-height translate-y-5 bg-black relative'>
      <div className='h-5/6 w-full flex-col  flex-center'>
      <p className='hero-title translate-y-5'>iPhone 15 Pro</p>
      <div className='md:w-10/12 w-9/12 '>
      <video controls={false}   autoPlay muted  playsInline={true} key={videoSrc} className='pointer-events-none opacity-0' >
        <source src={videoSrc} type='video/mp4' />
      </video>


      </div>
      <div id='cta' className='flex flex-col items-center  justify-center translate-y-10'>
        <div className="btn"><p>Buy</p></div>
        <p>From $199/month or $999</p>
      </div>

      </div>
      
    </section>
  )
}

export default Hero
