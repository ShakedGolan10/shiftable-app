'use client'

import { Employee, Employer } from '@/types/class.service'
import React, { useEffect, useState } from 'react'
import { utilService } from '@/services/util.service'
import { getDateOfApply } from '@/app/main/shifts-application/shifts_apply_table'
import { Button } from '@nextui-org/react'
import { getEmployeesByFilter } from '@/services/employer.service'

export default function EmployeeHomePage({ employerUser }: { employerUser: Employer }) {
  // Todo: Modal opens if the employer need to do something urgent like 
  const [forDate, setForDate] = useState<string>(undefined)
  const [usersNotApplied, setUsersNotApplied] = useState<Employee[]>([])
  
  useEffect(() => {
    setForDate(getDateOfApply(employerUser.applicationTime.day, employerUser.applicationTime.time))

    const getEmployees = async () => {
      const data = await getEmployeesByFilter([{field: 'isApplied', value: false}], employerUser.id)
      setUsersNotApplied(data)
    }
    getEmployees()
  }, [])


  const { dayIndex, time } = utilService.getTodayInfo();


  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <span className='text-4xl font-serif mt-10 mb-5'>Hi {employerUser.name}, are you ready for another week?</span>
      {/* Todo: Design the header of the name */}
      <div className='my-7'>
        <p className='text-2xl my-3 font-semibold text-center'>Shifts application is available for {forDate}
        </p>
      </div>
      <div className='my-7 flex flex-col items-center gap-[2vh]'>
        <h4 className='text-xl text-center'>Employees that didnt applied yet for {forDate} : </h4>
          {(usersNotApplied.length) ? 
          <section>
            {usersNotApplied.map((user, idx)=> <span key={idx} className='text-medium'>{user.name}</span>)}
          </section> : 
          <span className='text-medium'>All the employees applied !</span>}
        
      </div>

      <div className='flex flex-col gap-2 my-2'>
        <Button className='rounded-md bg-emerald-400 hover:bg-emerald-600'>Arrange shift schedule</Button>
        <Button className='rounded-md bg-teal-400 hover:bg-teal-600'>Shift schedule</Button>
        <Button className='rounded-md bg-cyan-500 hover:bg-cyan-700'>Employees</Button>
        <Button className='rounded-md bg-indigo-500 hover:bg-indigo-700'>Edit employees messages</Button>
      </div>

    </main>
  )
}
