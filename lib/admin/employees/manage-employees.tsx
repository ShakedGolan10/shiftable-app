'use client'
import GeneralTitle from '@/components/helpers/general-title'
import { Employee, Employer } from '@/types/class.service'
import React, { useState } from 'react'
import EmployeeCard from './employee-card'
import { Button, useDisclosure } from '@nextui-org/react'
import { EmployeeCardModal } from '@/lib/admin/employees/employee-card-modal'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useConfirm } from '@/hooks/useConfirm'
import ConfirmationModal from '@/components/helpers/confirm-modal'
import { useAsync } from '@/hooks/useAsync'
import { createNewEmployee, updateUserCredentials, updateUserData } from '@/services/admin.service'

interface IManageEmployeesProps {
    data: [Employee[]]
    user: Employer
  }
  
export default function ManageEmployeesPage({data, user} : IManageEmployeesProps) {
  
  const [ employees, setEmployees ] = useState(data[0])
  const [selectedEmployeeIdx, setSelectedEmployeeIdx] = useState<number>(undefined)
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { askConfirmation, handleModalClose, isConfirmModalOpen, msg } = useConfirm()
  const [ executeAsyncFunc ] = useAsync()

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
        onClose()
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
        onClose()
      }
    }
    
}
  return (
    <>
    <ConfirmationModal message={msg} onClose={handleModalClose} open={isConfirmModalOpen} />
    {selectedEmployeeIdx && <EmployeeCardModal saveEmployee={saveEmployee} user={employees[selectedEmployeeIdx]} isOpen={isOpen} onClose={onClose} />}
    <GeneralTitle title={`Employees managment`} />
    <span>Create new employee</span>
    <Button className='bg-transparent' onClick={()=> {
      setSelectedEmployeeIdx(employees.length)
      onOpen()
      }} >
    <PlusCircleIcon />
    </Button>
    <section className='flex flex-wrap justify-center gap-3'>
        {employees.map((employee, idx) => 
          <EmployeeCard employer={user} user={employee} key={idx} selectUser={() => {
            setSelectedEmployeeIdx(idx)
            onOpen()
          }}  />
        )}
    </section>
    </>
  )
}
