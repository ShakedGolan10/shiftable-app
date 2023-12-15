import React, { useState } from 'react'
import smartphoneIMG from '@/assets/imgs/header-smartphone.png'
import Image from 'next/image'
import styles from '@/styles/modules/welcome-page.module.scss'

export default function MainHeader({ toggleLoginModal }) {


    return (
        <header id="header" className={`py-28 text-center md:pt-36 lg:text-left xl:pt-44 xl:pb-32`}>
            <div className="container mx-auto px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div className="mb-16 lg:mt-32 xl:mt-40 xl:mr-12">
                    <h1 className={`${styles['h1-large']} mb-5`}>Shift management application</h1>
                    <p className={`${styles['p-large']} mb-8`}>Start getting things done together with your team based on Pavo's revolutionary team management features</p>
                    <button className={`${styles['btn-solid-lg']}`} onClick={toggleLoginModal}>Login</button>
                    {/* Done: Create a login modal, No need for store usage, better use props! */}
                    <a className={`${styles['btn-solid-lg']} ${styles['secondary']}`} href="#your-link">Not a member? Contact us!</a>
                </div>
                <div className="xl:text-right">
                    <Image className='inline' src={smartphoneIMG} alt='aaaaa' width={500} height={500} />
                </div>
            </div>
        </header>
    )
}
