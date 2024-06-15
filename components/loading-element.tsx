'use client'
import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function LoadingElement() {
    return (
        <>
        <div className='h-full w-full z-[200] bg-black opacity-[50%]' />
        <Spinner className='absolute h-[10vh] w-[10vh] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
        </>
    )
}
