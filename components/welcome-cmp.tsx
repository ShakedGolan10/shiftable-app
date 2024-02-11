import React, { useState } from 'react'
import smartphoneIMG from '@/assets/imgs/header-smartphone.png'
import Image from 'next/image'
import '@/styles/modules/welcome-page.scss'

export default function WelcomeCmp({ toggleLoginModal }) {

    return (
        <main id="main" className={`py-28 text-center md:pt-36 lg:text-left xl:pb-32`}>
            <div className="container mx-auto lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div className="welcome-page-summery mb-16 lg:mt-32 xl:mt-40 xl:mr-12">
                    <h1 className='h1-large mb-5'>Shift management application</h1>
                    <p className='p-large mb-8'>Start getting things done together with your team based on Shiftable's revolutionary shift management features</p>
                    <button className='login-btn' onClick={toggleLoginModal}>Login</button>
                    {/* Done: Create a login modal, No need for store usage, better use props! */}
                    <button className='contact-us-btn'><a target='_blank' href="https://wa.me/972535302345">Not a member? Contact us!</a></button>
                </div>
                <div className="xl:text-right">
                    <Image className='inline' src={smartphoneIMG} alt='front page img' width={500} height={500} />
                </div>
            </div>
        </main>
    )
}
