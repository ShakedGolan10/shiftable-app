'use client'
import { Employer, Employee } from '@/types/class.service'
import React from 'react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { getEmployeesByFilter } from '@/services/server-services/employer.service'
import { getDateOfApply } from '@/lib/server.utils'
import GeneralTitle from './helpers/general-title'
import WithDataWrapper from './helpers/cmp-wrapper'


function EmployerHomePage({ user, data }: { user: Employer, data: [Employee[]] }) {
  const [employeesNotApplied] = data
  const router = useRouter()
  const forDate = getDateOfApply(user.applicationTime.day, user.applicationTime.time)

  return (
    <>
    <GeneralTitle title={`Hi ${user.name}, are you ready for another week?`} />
    <section className="flex flex-col items-center pt-16 text-center">
      <div className='my-7'>
        <p className='text-subHeader my-3 font-semibold text-center'>Shifts application is available for {forDate}
        </p>
      </div>
      <div className='my-7 flex flex-col items-center gap-[2vh]'>
        <p className='text-subHeader text-center'>Employees that didnt applied yet for {forDate} : </p>
          {(employeesNotApplied.length) ? 
          <section>
            {employeesNotApplied.map((user, idx)=> (
              <span key={idx} className='text-base'>{user.name}</span> 
              ))}
          </section> : 
          <span className='text-base'>All the employees applied !</span>}
        
      </div>

      <div className='flex flex-col gap-2 my-2'>
        <Button onClick={()=> router.push(`main/admin/set-weekly-shifts/Sun%20Dec%2022%202024`)} className='rounded-md text-base bg-emerald-400 hover:bg-emerald-600'>Arrange shift schedule</Button>
        <Button onClick={()=> router.push(`main/admin/work-week/Sun%20Dec%2022%202024`)} className='rounded-md bg-teal-400 text-base hover:bg-teal-600'>Shift schedule</Button>
        <Button onClick={()=> router.push('main/admin/employees')} className='rounded-md bg-cyan-500 text-base hover:bg-cyan-700'>Employees</Button>
        <Button onClick={()=> router.push('main/admin/msgs')} className='rounded-md bg-indigo-500 text-base hover:bg-indigo-700'>Edit employees messages</Button>
      </div>

    </section>
    </>
  )
}

 const EmployerHomePageWrapper = WithDataWrapper<[Employee[]]>({
    dataPromises: [(user: Employer) => getEmployeesByFilter({isApplied: false}, user.id)],
    Component: (props) => <EmployerHomePage {...props} />, 
    errorMsg: 'Couldnt load Employer page',
    loadingMsg: 'Loading Employer page...'
  });

  export default EmployerHomePageWrapper