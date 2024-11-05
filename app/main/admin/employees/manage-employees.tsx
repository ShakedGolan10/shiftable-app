import { Employee, Employer } from '@/types/class.service'
import React from 'react'

interface IManageEmployeesProps {
    data: Employee[]
    user: Employer
  }
  
export default function ManageEmployeesPage({data, user} : IManageEmployeesProps) {
  return (
    <div>ManageEmployees</div>
  )
}
