import React, { useState } from 'react'
import smartphoneIMG from '@/assets/imgs/header-smartphone.png'
import Image from 'next/image'
import '@/styles/modules/welcome-page.scss'
import { Button } from '@nextui-org/react'
import GeneralTitle from './helpers/general-title'
import { redirect } from 'next/navigation'

export default function WelcomeCmp({ onOpen, onLoginDemoUser }) {

    return (
        <main className={`py-28 text-center md:pt-36 lg:text-left xl:pb-32`}>
            <div className="container mx-auto lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div className="welcome-page-summery flex flex-col items-start tablet:items-center mb-16 xl:mr-12">
                    <GeneralTitle title={`Shift management application`} />
                    <p className='text-base mb-8'>Start getting things done together with your team based on Shiftable's revolutionary shift management features made for small and medium businesses</p>
                    <Button color='success' className='hover:bg-transparent text-black border border-warning-100' onClick={onOpen}>Login</Button>
                    <Button color='primary' className='hover:bg-transparent text-black border border-warning-100' onClick={() => window.location.assign('/signup')}>Onboard as new Employer Now !</Button>
                    <Button color='secondary' className='hover:bg-transparent text-black border border-success-100' onClick={() => onLoginDemoUser(true)}>Try as an Employee demo user</Button>
                    <Button color='warning' className='hover:bg-transparent text-black border border-warning-100' onClick={() => onLoginDemoUser(false)}>Try as an Employer demo user</Button>
                    <a target='_blank' href="https://wa.me/972535302345"><Button color='default' className='hover:bg-transparent text-black border border-warning-100'>Not a member? Contact us!</Button></a>
                </div>
                <div className="xl:text-right">
                    <Image className='inline w-auto h-auto' priority src={smartphoneIMG} alt='front page img' width={500} height={500} />
                </div>
            </div>
        </main>
    )
}
