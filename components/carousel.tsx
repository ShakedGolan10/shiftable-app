'use client'
import React, { useEffect, useState } from 'react'

export default function Carousel({ slides }) {

    let [current, setCurrent] = useState(0);
    useEffect(() => {
        const slideTimer = setInterval(() => nextSlide(), 2000)
        return () => {
            clearInterval(slideTimer)
        }
    }, [])
    let nextSlide = () => {
        setCurrent(prevCurrent => (prevCurrent === slides.length - 1 ? 0 : prevCurrent + 1));
    }
    return (
        <section className='overflow-hidden relative'>
            <div className='flex transition ease-out duration-40' style={{
                transform: `translateX(-${current * 100}%)`,
            }}>
                {slides.map((s, idx) => {
                    return <article key={idx} className="flex flex-shrink-0 justify-center w-full p-2 mb-2" style={{
                        // display: (idx !== current) ? 'none' : 'block'
                    }}>
                        <span>{s}</span>
                    </article>
                })}
            </div>
        </section>
    )
}
