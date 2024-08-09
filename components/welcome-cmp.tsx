import React, { useState } from 'react'
import smartphoneIMG from '@/assets/imgs/header-smartphone.png'
import Image from 'next/image'
import '@/styles/modules/welcome-page.scss'
import { Button } from '@nextui-org/react'

export default function WelcomeCmp({ onOpen, onLoginDemoUser, isLoadingLogin }) {

    return (
        <main className={`py-28 text-center md:pt-36 lg:text-left xl:pb-32`}>
            <div className="container mx-auto lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div className="welcome-page-summery flex flex-col items-start tablet:items-center mb-16 xl:mr-12">
                    <h1 className='text-large mb-5'>Shift management application</h1>
                    <p className='text-base mb-8'>Start getting things done together with your team based on Shiftable's revolutionary shift management features</p>
                    <Button className='login-btn' onClick={onOpen}>Login</Button>
                    <Button color='success' className='hover:bg-transparent hover:text-success-100 border border-success-100' isLoading={isLoadingLogin} onClick={() => onLoginDemoUser(true)}>Try as an Employee demo user</Button>
                    <Button color='warning' className='hover:bg-transparent hover:text-warning-100 border border-warning-100' isLoading={isLoadingLogin} onClick={() => onLoginDemoUser(false)}>Try as an Employer demo user</Button>
                    <a target='_blank' href="https://wa.me/972535302345"><Button className='contact-us-btn'>Not a member? Contact us!</Button></a>
                </div>
                <div className="xl:text-right">
                    <Image className='inline w-auto h-auto' priority src={smartphoneIMG} alt='front page img' width={500} height={500} />
                </div>
            </div>
        </main>
    )
}
