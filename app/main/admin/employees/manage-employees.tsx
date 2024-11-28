'use client'
import GeneralTitle from '@/components/helpers/general-title'
import { Employee, Employer } from '@/types/class.service'
import React, { useState } from 'react'
import EmployeeCard from './employee-card'
import { useDisclosure } from '@nextui-org/react'
import { EmployeeCardModal } from './employee-card-modal'

interface IManageEmployeesProps {
    data: [Employee[]]
    user: Employer
  }
  
export default function ManageEmployeesPage({data, user} : IManageEmployeesProps) {
  
  const [employees] = data
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(undefined)

  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
    {selectedEmployee && <EmployeeCardModal user={selectedEmployee} isOpen={isOpen} onClose={onClose} />}
    <GeneralTitle title={`Employees managment`} />
    <section className='flex flex-row gap-3'>
      {employees.map((employee, idx) => 
        <EmployeeCard employer={user} user={employee} key={idx} selectUser={(userId) => {
          setSelectedEmployee(employees[idx])
          onOpen()
        }} />
      )}
    </section>
    </>
  )
}
