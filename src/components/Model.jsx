import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import ModelView from './ModelView'
import { yellowImg } from '../utils'
import * as THREE from 'three'
import { models,sizes } from '../constants'


gsap.registerPlugin(ScrollTrigger)

const Model = () => {

    const [size,setSize] = useState('small');
    const [model,setModel] = useState({
        title:'iPhone 15 Pro in Natural Titanium',
        color:['#8F8A81','#FFE789','#6F6c64'],
        img:yellowImg
    });
    
    const cameraControlSmall=useRef()
    const cameraControlLarge=useRef()


    const small=useRef(new THREE.Group())
    const large=useRef(new THREE.Group())

    //roation
    const [smallRotation,setSmallRotation] = useState(0)
    const [largeRotation,setLargeRotation] = useState(0)



    useGSAP(() => {
        gsap.to('#heading', { opacity: 1, y: 0,duration:1 ,scrollTrigger:{trigger:'#heading',start:'top 90%',end:'bottom 90%',}})
    }, [])

  return (
    <section className='common-padding'>
        <div className='screen-max-width'>
            <h1 id="heading" className='section-heading'>Take a closer look.</h1>
            <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                    <ModelView index={1} groupRef={small} gsapType='view1' controlRef={cameraControlSmall} setRotation={setSmallRotation}
                    item={model} size={size} />
                    <ModelView index={2} groupRef={large} gsapType='view2' controlRef={cameraControlLarge} setRotation={setLargeRotation}
                    item={model} size={size} />
                    <canvas  className='fixed overflow-hidden top-0 left-0 w-full h-full'  >
                       
                        </canvas>
                </div>
                <div className="mx-auto w-full">
                    <p className="text-sm font-light text-center mb-5">{model.title}</p>
                    <div className="flex items-center justify-center ">
                        <ul className='color-container'>
                        {models.map((item,index)=>(
                            <li key={index} className="w-6 h-6  rounded-full" style={{backgroundColor:item.color[0]}} onClick={()=>setModel(item)}></li>
                        ))}
                        </ul>
                        <button className='size-btn-container'>
                            {sizes.map(({label,value})=>{
                                console.log(label,value)
                                console.log(size,value,size===value)
                                return(
                                    <span key={label} className={`size-btn`} style={{backgroundColor:size===value?'white':'transparent',color:size===value?'black':'white'} } onClick={()=>setSize(value)}>{label}</span>
                                )
                            })}
                        </button>
                    </div>
                
                </div>

            </div>
        </div>
      
    </section>
  )
}

export default Model
