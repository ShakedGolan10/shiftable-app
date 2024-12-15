'use client'

import { Employee } from '@/types/class.service'
import React, { useEffect, useState } from 'react'
import EmployerMsg from './employer-msg'
import { useSystemActions } from '@/store/actions/system.actions'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import GeneralTitle from './helpers/general-title'
import { getThisSunday } from '@/lib/server.utils'

export default function EmployeeHomePage({ employeeUser }: { employeeUser: Employee }) {
    const { toggleModalAction } = useSystemActions()

    const router = useRouter()
  
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    useEffect(() => {
        if (employeeUser.employer.applicationTime.day === new Date().getDay()) toggleModalAction('Apply shifts today!')
    }, [])

    return (
        <>
            <GeneralTitle title={`Hi ${employeeUser.name}, how are you today?`} />
        <main className="flex flex-col items-center pt-16 text-center">
            <p className='font-bold text-base text-orange-700'>Remmeber to apply shifts before {`${daysOfWeek[employeeUser.employer.applicationTime.day]} at ${employeeUser.employer.applicationTime.time}`}!</p>
            <section className='my-10 h-fit'>
                <EmployerMsg employee={ employeeUser } />
            </section>
            <div className='flex flex-col gap-2 my-2'>
                <Button onClick={()=> router.push('/main/employee/shifts-application')} className='text-base rounded-md bg-emerald-400 px-3 py-1.5 hover:bg-emerald-600'>Apply Shifts</Button>
                <Button onClick={()=> router.push('/main/employee/with-me')} className='text-base rounded-md bg-teal-400 px-3 py-1.5 hover:bg-teal-600'>Who's working with me today?</Button>
                <Button onClick={()=> router.push(`/main/employee/my-shifts/Sun%20Dec%2022%202024`)} className='text-base rounded-md bg-cyan-500 px-3 py-1.5 hover:bg-cyan-700'>My Shifts</Button>
                                                        {/* main/employee/my-shifts/${getThisSunday()} */}
            </div>
           

        </main>
        </>
    )
}
