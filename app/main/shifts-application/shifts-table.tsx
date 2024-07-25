'use client'

import React, { useEffect, useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button} from "@nextui-org/react";
import { getUserApplicableShiftsData } from '@/services/shifts.service';
import { useAuth } from '@/providers/UserContextProvider';
import { Employee } from '@/types/class.service';

export default function ShiftsTable({rows, columns}:any) {
  const { user } = useAuth()
  const [shiftsData, setShiftsData] = useState<WeeklyWorkflow>(null)
  const [applyRules, setApplyRules] = useState<Application_Rules>(null)

  useEffect(()=> {
    const getShiftsData = async () => {
      const {applicable_shifts, application_rules} = await getUserApplicableShiftsData((user as Employee).employer.id)
      setShiftsData(applicable_shifts)
      setApplyRules(application_rules)
    }
    if (user) getShiftsData()

  },[user])

  useEffect(()=> {console.log('the data :', shiftsData, applyRules)},[shiftsData, applyRules])
  return (
    <>
    <Table>
        <TableHeader columns={columns}>
          {(column: any) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item: any) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell className='bg-white text-gray-950'>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    
      </>
  )
}
