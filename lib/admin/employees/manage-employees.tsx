'use client'
import GeneralTitle from '@/components/helpers/general-title'
import { Employee, Employer } from '@/types/class.service'
import React, { useEffect, useState } from 'react'
import { Button, useDisclosure } from '@nextui-org/react'
import { EmployeeCardModal } from '@/lib/admin/employees/employee-card-modal'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useConfirm } from '@/hooks/useConfirm'
import ConfirmationModal from '@/components/helpers/confirm-modal'
import { useAsync } from '@/hooks/useAsync'
import { createNewEmployee, updateUserCredentials, updateUserData } from '@/services/admin.service'
import EmployeeCard from './employee-card'
import { saveOneField } from '@/services/server-services/db.service'

interface IManageEmployeesProps {
    data: [Employee[]]
    user: Employer
  }
  
export default function ManageEmployeesPage({data, user} : IManageEmployeesProps) {
  
  const [ employees, setEmployees ] = useState(data[0])
  const [selectedEmployeeIdx, setSelectedEmployeeIdx] = useState<number>(-1)
  const { askConfirmation, handleModalClose, isConfirmModalOpen, msg } = useConfirm()
  const [ executeAsyncFunc ] = useAsync()
  
  const saveBlockedShifts = async (blockedShifts: string[]) => {
    await executeAsyncFunc<[void]>({
      asyncOps: [() => saveOneField(`users/${employees[selectedEmployeeIdx].id}`, 'blockedShifts', blockedShifts)],
      errorMsg: 'Couldnt save employee info please try again later...',
      successMsg: 'Saving new employee info has been successful'
    })
    setEmployees(prev => {
      prev[selectedEmployeeIdx].blockedShifts = blockedShifts
      return [...prev]
    })
  }
  
  const saveEmployee = async (employeeId: string, name: string, email: string, password: string) => {
    if (!employeeId) {
      const isApproved = await askConfirmation(`Youre about to create new employee`)
      if (isApproved) {
        const newEmployee = await executeAsyncFunc<[Employee]>({
          asyncOps: [() => createNewEmployee(name, email, password, user.id)],
          errorMsg: 'Couldnt save new employee please try again later...',
          successMsg: 'Saving new employee has been successful'
        })
        setEmployees(prev => {
          prev[selectedEmployeeIdx] = newEmployee[0]
          return [...prev]
        })
        setSelectedEmployeeIdx(-1)
      }
    } else {
      const isApproved = await askConfirmation(`Youre about to change Employee's private information`)
      if (isApproved) {
        await executeAsyncFunc<[boolean, boolean]>({
          asyncOps: [() => updateUserData(employeeId, name), () => updateUserCredentials({ userId: employeeId, newCreds: { email, password }})],
          errorMsg: 'Couldnt save employee info please try again later...',
          successMsg: 'Saving new employee info has been successful'
        })
        setEmployees(prev => {
          prev[selectedEmployeeIdx] = {...prev[selectedEmployeeIdx], name, email}
          return [...prev]
        })
        setSelectedEmployeeIdx(-1)
      }
    }
    
}
  return (
    <>
    <ConfirmationModal message={msg} onClose={handleModalClose} open={isConfirmModalOpen} />
    {<EmployeeCardModal 
        saveEmployee={saveEmployee} 
        employee={employees[selectedEmployeeIdx]} 
        isOpen={selectedEmployeeIdx >= 0} 
        onClose={() => setSelectedEmployeeIdx(-1)} 
        employer={user}
        saveBlockedShifts={saveBlockedShifts}
        />}
    <GeneralTitle title={`Employees managment`} />
    <span>Create new employee</span>
    <Button className='bg-transparent' onClick={()=> setSelectedEmployeeIdx(employees.length)} >
    <PlusCircleIcon />
    </Button>
    <section className='flex flex-wrap justify-center gap-3'>
        {employees.map((employee, idx) => 
          <EmployeeCard employer={user} user={employee} key={idx} selectUser={() => setSelectedEmployeeIdx(idx)} />
        )}
    </section>
    </>
  )
}
