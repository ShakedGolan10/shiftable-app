'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Link } from '@nextui-org/react';
import { Employee, Employer } from '@/types/class.service';
import { SetShiftsTableCell } from './set-shifts-table-cell';
import { useConfirm } from '@/hooks/useConfirm';
import ConfirmationModal from '@/components/helpers/confirm-modal';
import { saveWeeklySchedule } from '@/services/server-services/shifts.service';
import { useAsync } from '@/hooks/useAsync';
import GeneralTitle from '@/components/helpers/general-title';
import { createTableRows, daysOfWeek, getLastSunday, getNextSunday } from '@/lib/server.utils';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const emptyDayOrientedObject = {
    sunday: {},
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {}
}

interface IShiftsTableProps {
    data: [ShiftReqsOOP, DayOrientedObject<{[key: string]: string}>, Employee[]]
    user: Employer
    forDate: string
  }

const createEmptyShiftReqPerEmployee = (weeklyFlow: WeeklyShifts, employee: Employee): TableShifts => {
  let emptyShiftReq = {}
  Object.keys(weeklyFlow).forEach(dayKey => {
    emptyShiftReq[dayKey] = weeklyFlow[dayKey].map(shift => {
        if (!employee.blockedShifts.includes(shift.shiftId)) return {...shift, isSelected: false, isCant: false}
      })
  })
  return emptyShiftReq as TableShifts
}

export default function SetShiftsTable({ data, user, forDate }: IShiftsTableProps) {
  
  const [rawDataShiftReqs, existedWeeklySched, employees] = data
  const [shiftsReqs, setShiftsReqs] = useState<ShiftReqsOOP>(null)
  const [selectedShifts, setSelectedShifts] = useState<DayOrientedObject<{[key: string]: string}>>(undefined);
  const { isConfirmModalOpen, askConfirmation, handleModalClose, msg } = useConfirm()
  const [ executeAsyncFunc ] = useAsync()
  const router = useRouter()

  useEffect(()=> {
    if (!rawDataShiftReqs || !employees) return 
        (existedWeeklySched) ? setSelectedShifts(existedWeeklySched) : setSelectedShifts(emptyDayOrientedObject)
            const emptyShiftReqs:ShiftReqsOOP = {}
            const dataLength = Object.keys(rawDataShiftReqs).length
              if (employees.length === dataLength) { // if all users applied reqs
                setShiftsReqs(rawDataShiftReqs)
              } 
              else if (!dataLength) {
                employees.map(employee => {
                    emptyShiftReqs[employee.id] = {
                      id: employee.id,
                      name: employee.name,
                      shifts: createEmptyShiftReqPerEmployee(user.weeklyWorkflow, employee)
                    }
                })
                setShiftsReqs(emptyShiftReqs)
              }
              else if (dataLength < employees.length) {
                employees.forEach(employee => {
                  if (!rawDataShiftReqs[employee.id]) {
                    emptyShiftReqs[employee.id] = {
                      id: employee.id,
                      name: employee.name,
                      shifts: createEmptyShiftReqPerEmployee(user.weeklyWorkflow, employee)
                    }
                  } else emptyShiftReqs[employee.id] = rawDataShiftReqs[employee.id]
                  
                })
                setShiftsReqs(emptyShiftReqs)
              }
  },[])

  const confirmDailyLimit = async (day: string, shiftSelected: Shift, isRemove: boolean):Promise<boolean> => {
    if (isRemove) return
    const isEmployeeWorkingToday = Object.keys(selectedShifts[day]).find(key => selectedShifts[day][key][shiftSelected.employeeId])
    if (!isEmployeeWorkingToday) return true
    else {
        const isPossible = await askConfirmation(`Youre about to asign ${shiftSelected.name} for more then 1 shift this day`)
        if (isPossible) return true
        else throw new Error('')
    }
  }


  const confirmOveridePreference = async (shiftSelected: Shift, isRemove: boolean) => {
    let isPossible:boolean
    if (!shiftSelected.isCant) return true
    if (shiftSelected.isCant && !isRemove) {
        isPossible = await askConfirmation(`${shiftSelected.name} marked he preffer not to work this day`)
        if (isPossible) return true
        else throw new Error('')
      }      
    }

  const checkRules = async (day: string, shiftSelected: Shift, isRemove: boolean):Promise<boolean> => {
    try {
      await Promise.all([
        await confirmOveridePreference(shiftSelected, isRemove),
        await confirmDailyLimit(day, shiftSelected, isRemove),
      ]) 
      return true 
    } catch (error) {
      return false
    } 
  }

  const handleSelectChange = async (day: string, updatedShifts: Shift[], shiftUnselected?: Shift): Promise<boolean> => {
    const shiftSelected = (shiftUnselected) ? shiftUnselected : updatedShifts[updatedShifts.length-1]
    const isPossible = await checkRules(day, shiftSelected, (shiftUnselected) ? true : false)
    if (!isPossible) return false
    setSelectedShifts((prev) => {
      const newObj = {...prev,
      [day]: {
        ...prev?.[day],
        [shiftSelected.shiftId]: {
          ...prev[day][shiftSelected.shiftId],
          [shiftSelected.employeeId]: shiftSelected.name
        },
      },
    }
    if (shiftUnselected) delete newObj[day][shiftSelected.shiftId][shiftSelected.employeeId]
    return newObj
  });
    
    return true
  };
  
  const checkEmptyShifts = async () => {
    let isPossible = true
    for (const dayKey in user.weeklyWorkflow) {
        for (const shiftKey in user.weeklyWorkflow[dayKey]) {
          const { shiftId } = user.weeklyWorkflow[dayKey][shiftKey]
          if (!selectedShifts[dayKey][shiftId]) {
            const isConfirm = await askConfirmation('There are shifts that are empty')
                if (isConfirm) isPossible = true
                else isPossible = false
                  return isPossible
          }
          if (!Object.keys(selectedShifts[dayKey][shiftId]).length) {
                const isConfirm = await askConfirmation('There are shifts that are empty')
                if (isConfirm) isPossible = true
                else isPossible = false
                  return isPossible
            } 
        }
    }
    return isPossible;
};

  const applyShifts = async () => {
    const isPossible = await checkEmptyShifts()
    if (isPossible) await executeAsyncFunc({
        asyncOps:[() => saveWeeklySchedule(user.id, forDate, selectedShifts)], 
        errorMsg: 'Couldnt apply shifts, please try again',
        successMsg: 'Weekly shifts applied successfuly',
        isLoaderDisabled: false
      }) 
  }

  const tableItems = createTableRows<WeeklyShifts, ShiftSlot>(user.weeklyWorkflow, daysOfWeek, 'day')
  
  return (selectedShifts && shiftsReqs && user.employees.length) ? (
  <>
    <ConfirmationModal message={msg} onClose={handleModalClose} open={isConfirmModalOpen} />
    <section className="w-full flex flex-col overflow-x-auto items-center justify-evenly gap-2 flex-grow">
      <GeneralTitle title={`Set the shifts for`} />
      <div className='flex flex-row gap-5 items-center'>
          <Link  size='sm' color='foreground' href={`/main/admin/set-weekly-shifts/${getLastSunday(forDate)}`}>
            <Button className='bg-transparent'> 
            <ArrowLeftCircleIcon />
            </Button>
          </Link>
          <p className='text-medium'>{forDate}</p>
          <Link size='sm' color='foreground' href={`/main/admin/set-weekly-shifts/${getNextSunday(forDate)}`}>
          <Button className='bg-transparent'>
            <ArrowRightCircleIcon />
            </Button>
          </Link>
      </div>
      <Table aria-label="Employer Shifts Table" className="text-xs">
        <TableHeader columns={daysOfWeek}>
          {(dayElement) => <TableColumn aria-label={dayElement.day} key={dayElement.key} className="text-base text-center">{dayElement.day}</TableColumn>}
        </TableHeader>
        <TableBody items={tableItems}>
          {(item) => (
              <TableRow key={item.key}>
                {item.rowItems.map((shiftElement, index) => (
                  <TableCell key={index}>
                    {shiftElement ? 
                    <SetShiftsTableCell
                      day={daysOfWeek[index].day.toLowerCase()}
                      shiftIndex={index}
                      availableShifts={Object.values(shiftsReqs).flatMap(req => ({
                        name: req.name, employeeId: req.id ,...req.shifts[daysOfWeek[index].day.toLowerCase()][item.key]
                      }))}
                      selectedShifts={selectedShifts && selectedShifts[daysOfWeek[index].day.toLowerCase()][shiftElement.shiftId]}
                      onSelectChange={(updatedShifts, shiftUnselected) => handleSelectChange(daysOfWeek[index].day.toLowerCase(), updatedShifts, shiftUnselected)}
                    /> :
                      <div><p>No Shifts</p></div> 
                      }
                  </TableCell>
                  ))}
              </TableRow>
            )}
        </TableBody>
      </Table>
      <Button className='mt-2' color='success' onPress={applyShifts}>Save Shifts</Button>
    </section>
  </>
  ) 
  : 
   (!user.employees.length && <>
      <p className='text-subHeader'>{`We have noticed you dont have employees in your account!`}</p>
      <Button
          onClick={() => router.push('/main/admin/employees')}
          color="secondary"
        >
          <span>Press this button to add Employees now</span>
          <ArrowRightIcon  width={50} height={50} />
        </Button>
    </>)
}



