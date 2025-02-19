// 'use client'
import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function LoadingElement({ msg } : { msg?: string}) {
    return (
        <div className='flex flex-col items-center justify-center h-screen w-screen z-[299] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Spinner className='my-2' />
        {
            msg && <p className='loading-text'>{msg}</p>
        }
        </div>
    )
}
