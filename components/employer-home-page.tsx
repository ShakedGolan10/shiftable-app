'use client'
import { Employee, Employer } from '@/types/class.service'
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { getEmployeesByFilter } from '@/services/server-services/employer.service'
import { getDateOfApply } from '@/lib/server.utils'


export default function EmployeeHomePage({ employerUser }: { employerUser: Employer }) {

  const [usersNotApplied, setUsersNotApplied] = useState<Employee[]>([])
  const router = useRouter()
  const forDate = getDateOfApply(employerUser.applicationTime.day, employerUser.applicationTime.time)
  
  useEffect(() => {

    const getEmployees = async () => {
      const data = await getEmployeesByFilter({isApplied: false}, employerUser.id)
      setUsersNotApplied(data)
    }
    getEmployees()
  }, [])



  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <span className='text-large font-serif mt-10 mb-5 text-center'>Hi {employerUser.name}, are you ready for another week?</span>
      {/* Todo: Design the header of the name */}
      <div className='my-7'>
        <p className='text-subHeader my-3 font-semibold text-center'>Shifts application is available for {forDate}
        </p>
      </div>
      <div className='my-7 flex flex-col items-center gap-[2vh]'>
        <h4 className='text-subHeader text-center'>Employees that didnt applied yet for {forDate} : </h4>
          {(usersNotApplied.length) ? 
          <section>
            {usersNotApplied.map((user, idx)=> (
              <>
              <span key={idx} className='text-base'>{user.name}</span> 
              <br/>
              </>
              ))}
          </section> : 
          <span className='text-base'>All the employees applied !</span>}
        
      </div>

      <div className='flex flex-col gap-2 my-2'>
        <Button onClick={()=> router.push('/main/set-weekly-shifts')} className='rounded-md text-base bg-emerald-400 hover:bg-emerald-600'>Arrange shift schedule</Button>
        <Button className='rounded-md bg-teal-400 text-base hover:bg-teal-600'>Shift schedule</Button>
        <Button className='rounded-md bg-cyan-500 text-base hover:bg-cyan-700'>Employees</Button>
        <Button className='rounded-md bg-indigo-500 text-base hover:bg-indigo-700'>Edit employees messages</Button>
      </div>

    </main>
  )
}
