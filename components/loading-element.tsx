'use client'
import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function LoadingElement() {
    return (
        <>
        <Spinner className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
        </>
    )
}
