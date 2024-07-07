'use client'

import { Employee } from '@/types/class.service'
import React, { useEffect, useState } from 'react'
import EmployerMsg from './employer-msg'
import { useSystemActions } from '@/store/actions/system.actions'
import { useRouter } from 'next/navigation'

export default function EmployeeHomePage({ employeeUser }: { employeeUser: Employee }) {
    // Todo: Modal opens if the user has a shift today - Make the shifts database first
    const { toggleModalAction } = useSystemActions()

    const router = useRouter()
  
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        if (employeeUser.employer.applicationTime.day === new Date().getDay()) toggleModalAction('Apply shifts today!')
    }, [])

    return (
        <main className="flex flex-col items-center pt-16 text-center">
            <span className='text-5xl font-serif mt-10 mb-5'>Hi {employeeUser.name}, how are you today?</span>
            {/* Done: Design the header of the name */}
            <div className='my-7'>
                <h4 className='text-3xl'>Your next shift:</h4>
                <p className='text-xl my-3 font-semibold'>Sunday - Noon: 15:00-23:00{/* Todo: Design the sift today */}</p>
            </div>
            <h4 className='font-bold text-orange-700'>Remmeber to apply shifts before {`${daysOfWeek[employeeUser.employer.applicationTime.day]} at ${employeeUser.employer.applicationTime.time}`}!</h4>
            {/* Done: Design the apply shifts alert */}
            {/* Todo: Design a button for checking whos working with you this week ! (nice feacture) */}
            <section className='my-10 h-fit'>
                <EmployerMsg employee={ employeeUser } />
            </section>
            <div className='flex flex-col gap-2 my-2'>
                <button onClick={()=> router.push('/main/shifts-application')} className='rounded-md bg-emerald-400 px-3 py-1.5 hover:bg-emerald-600'>Apply Shifts</button>
                <button className='rounded-md bg-teal-400 px-3 py-1.5 hover:bg-teal-600'>Check who's working with you today</button>
                <button className='rounded-md bg-cyan-500 px-3 py-1.5 hover:bg-cyan-700'>My Shifts</button>
                <button onClick={() => toggleModalAction('You have a shift today!')} className='open-modal-button flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Toggle Modal</button>
            </div>
           

        </main>
    )
}
