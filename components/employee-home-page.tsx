'use client'

import { Employee } from '@/types/class.service'
import React, { useEffect, useState } from 'react'
import EmployerMsg from './employer-msg'
import { useSystemActions } from '@/store/actions/system.actions'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

export default function EmployeeHomePage({ employeeUser }: { employeeUser: Employee }) {
    // Todo: Modal opens if the user has a shift today - Make the shifts database first
    const { toggleModalAction } = useSystemActions()

    const router = useRouter()
  
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        if (employeeUser.employer.applicationTime.day === new Date().getDay()) toggleModalAction('Apply shifts today!', false)
    }, [])

    return (
        <main className="flex flex-col items-center pt-16 text-center">
            <span className='text-medium font-serif mt-10 mb-5'>Hi {employeeUser.name}, how are you today?</span>
            <div className='my-7'>
                <h4 className='text-small'>Your next shift:</h4>
                <p className='text-base my-3 font-semibold'>Sunday - Noon: 15:00-23:00{/* Todo: Design the sift today */}</p>
            </div>
            <h4 className='font-bold text-orange-700'>Remmeber to apply shifts before {`${daysOfWeek[employeeUser.employer.applicationTime.day]} at ${employeeUser.employer.applicationTime.time}`}!</h4>
            {/* Done: Design the apply shifts alert */}
            {/* Todo: Design a Button for checking whos working with you this week ! (nice feacture) */}
            <section className='my-10 h-fit'>
                <EmployerMsg employee={ employeeUser } />
            </section>
            <div className='flex flex-col gap-2 my-2'>
                <Button onClick={()=> router.push('/main/shifts-application')} className='text-base rounded-md bg-emerald-400 px-3 py-1.5 hover:bg-emerald-600'>Apply Shifts</Button>
                <Button className='text-base rounded-md bg-teal-400 px-3 py-1.5 hover:bg-teal-600'>Who's working with me today?</Button>
                <Button className='text-base rounded-md bg-cyan-500 px-3 py-1.5 hover:bg-cyan-700'>My Shifts</Button>
            </div>
           

        </main>
    )
}
