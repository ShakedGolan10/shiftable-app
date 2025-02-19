'use client'
import { useAppSelector } from '@/store/store'
import { Card, Spinner } from '@nextui-org/react'
import React from 'react'

export default function OpacityLoader() {
    
    const { isLoading } = useAppSelector(state => state.systemReducer)
    
    return (
        <Card className={`flex ${(!isLoading) ? 'hidden ' : ''} flex-col items-center justify-center h-screen w-screen opacity-50 bg-black z-[300] absolute`}>
        <Spinner color='success' className='my-2' />
        </Card>
    )
}
