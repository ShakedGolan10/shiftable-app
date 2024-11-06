'use client'
import GeneralTitle from '@/components/helpers/general-title'
import { Employee, Employer } from '@/types/class.service'
import React, { useState } from 'react'
import EmployeeCard from './employee-card'

interface IManageEmployeesProps {
    data: Employee[]
    user: Employer
  }
  
export default function ManageEmployeesPage({data, user} : IManageEmployeesProps) {
  
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(undefined)

  return (
    <>
    <GeneralTitle title={`Employees managment`} />
    <section className='flex flex-row gap-3'>
      {data.map((employee, idx) => 
        <EmployeeCard employer={user} user={employee} key={idx} selectUser={(userId) => setSelectedEmployee(data[idx])} />
      )}
    </section>
    </>
  )
}
