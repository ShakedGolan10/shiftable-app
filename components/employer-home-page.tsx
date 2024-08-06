'use client'

import { Employee, Employer } from '@/types/class.service'
import React, { useEffect, useState } from 'react'
import EmployerMsg from './employer-msg'
import { useSystemActions } from '@/store/actions/system.actions'
import { utilService } from '@/services/util.service'
import { getDateOfApply } from '@/app/main/shifts-application/shifts_apply_table'

export default function EmployeeHomePage({ employerUser }: { employerUser: Employer }) {
  // Todo: Modal opens if the employer need to do somthing urgent
  const [forDate, setForDate] = useState<string>(undefined)
  const { toggleModalAction } = useSystemActions()
  const toggleAlertModal = () => {
    toggleModalAction('You have a shift today!')
  }

  useEffect(() => {
    setForDate(getDateOfApply(employerUser.applicationTime.day, employerUser.applicationTime.time))
  }, [])


  const { dayIndex, time } = utilService.getTodayInfo();


  return (
    <main className="flex min-h-screen flex-col items-center p-20">
      <span className='text-5xl font-serif mt-10 mb-5'>Hi {employerUser.name}, are you ready for another week?</span>
      {/* Todo: Design the header of the name */}
      <div className='my-7'>
        <p className='text-3xl my-3 font-semibold text-center'>Shifts application is available for {forDate}
        </p>
      </div>
      <div className='my-7'>
        <h4 className='text-3xl text-center'>Employees that didnt applied yet for {forDate} : </h4>
        {/* Todo: Make a dynamic route based on employeeId and a Route*/}
        <p className='text-xl my-3 font-semibold text-center'>{/* Todo: useEffect that will handle list of employees that didnt Applied yet */}</p>
      </div>

      <div className='flex flex-col gap-2 my-2'>
        <button className='rounded-md bg-emerald-400 px-3 py-1.5 hover:bg-emerald-600'>Arrange shift schedule</button>
        <button className='rounded-md bg-teal-400 px-3 py-1.5 hover:bg-teal-600'>Shift schedule</button>
        <button className='rounded-md bg-cyan-500 px-3 py-1.5 hover:bg-cyan-700'>Employees</button>
        <button onClick={() => toggleAlertModal()} className='open-modal-button flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Toggle Modal</button>
      </div>

    </main>
  )
}
