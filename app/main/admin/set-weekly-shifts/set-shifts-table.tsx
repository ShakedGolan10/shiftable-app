'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { Employer } from '@/types/class.service';
import { SetShiftsTableCell } from './set-shifts-table-cell';
import { DayOrientedObject, RowItem, Shift, ShiftReqs } from '@/types/user/types.server';
import { useConfirm } from '@/hooks/useConfirm';
import ConfirmationModal from '@/components/helpers/confirm-modal';
import { getWeeklySchedule, saveWeeklySchedule } from '@/services/server-services/shifts.service';
import { useAsync } from '@/hooks/useAsync';
import GeneralTitle from '@/components/helpers/general-title';
import { createTableRows, daysOfWeek, getDateOfApply, maxRows } from '@/lib/server.utils';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';


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
    data: ShiftReqs[]
    user: Employer
    forDate: string
    setForDate: React.Dispatch<React.SetStateAction<string>>
  }


export default function SetShiftsTable({ data, user, forDate, setForDate }: IShiftsTableProps) {
  const shiftsReqs: ShiftReqs[] = data
  // getDateOfApply(user.applicationTime.day, user.applicationTime.time);
  const [selectedShifts, setSelectedShifts] = useState<DayOrientedObject<{[key: string]: boolean}>>(undefined);
  const { isModalOpen, askConfirmation, handleModalClose, msg } = useConfirm()
  const [ excuteAsyncFunc ] = useAsync()

  useEffect(()=> {
    getWeeklySchedule(user.id, forDate).then(res => (res) ? setSelectedShifts(res) : setSelectedShifts(emptyDayOrientedObject))
  },[])
  

  const confirmDailyLimit = async (day: string, shiftSelected: Shift, isRemove: boolean):Promise<boolean> => {
    if (isRemove) return
    const isEmployeeWorkingToday = Object.keys(selectedShifts[day]).find(key => selectedShifts[day][key][shiftSelected.name] === true)
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

  const handleSelectChange = async (day: string, shiftId: string, updatedShifts: Shift[], shiftUnselected?: Shift): Promise<boolean> => {
    const shiftSelected = (shiftUnselected) ? shiftUnselected : updatedShifts[updatedShifts.length-1]
    const isPossible = await checkRules(day, shiftSelected, (shiftUnselected) ? true : false)
    if (!isPossible) return false
    setSelectedShifts((prev) => {
      const newObj = {...prev,
      [day]: {
        ...prev?.[day],
        [shiftId]: {
          ...prev[day][shiftId],
          [shiftSelected.name]: true
        },
      },
    }
    if (shiftUnselected) delete newObj[day][shiftId][shiftSelected.name]
    return newObj
  });
    
    return true
  };
  
  const checkEmptyShifts = async () => {
    let isPossible = true
    for (const dayKey in selectedShifts) {
        for (const shiftKey in selectedShifts[dayKey]) {
            if (!Object.keys(selectedShifts[dayKey][shiftKey]).length) {
                const isConfirm = await askConfirmation('There are shifts that are empty')
                if (isConfirm) {
                    isPossible = true
                } else {
                    isPossible = false
                    return isPossible
                }
            } else {
                isPossible = true
            }
        }
    }
    return isPossible;
};

  const applyShifts = async () => {
    const isPossible = await checkEmptyShifts()
    if (isPossible) await excuteAsyncFunc({
        asyncOperation: () => saveWeeklySchedule(user.id, forDate, selectedShifts), 
        errorMsg: 'Couldnt apply shifts, please try again',
        successMsg: 'Weekly shifts applied successfuly',
        isLoaderDisabled: false
      }) 
  }

  const tableItems = createTableRows<WeeklyShifts, ShiftSlot>(user.weeklyWorkflow, daysOfWeek)
  
  return selectedShifts && (
  <>
    <ConfirmationModal message={msg} onClose={handleModalClose} open={isModalOpen} />
    <section className="w-full flex flex-col overflow-x-auto items-center justify-evenly flex-grow">
      <GeneralTitle title={`Set the shifts for`} />
      <div className='flex flex-row gap-5 items-center'>
          <Button isIconOnly className='bg-transparent'>
            <ArrowLeftCircleIcon />
          </Button>
          <p className='text-medium'>{forDate}</p>
          <Button isIconOnly className='bg-transparent'>
            <ArrowRightCircleIcon />
          </Button>
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
                      availableShifts={shiftsReqs.flatMap(req => ({
                        name: req.name, ...req.shifts[daysOfWeek[index].day.toLowerCase()][item.key]
                      }))}
                      selectedShifts={selectedShifts && selectedShifts[daysOfWeek[index].day.toLowerCase()][shiftElement.shiftId]}
                      onSelectChange={(updatedShifts, shiftUnselected) => handleSelectChange(daysOfWeek[index].day.toLowerCase(), shiftElement.shiftId, updatedShifts, shiftUnselected)}
                    /> :
                      <div><p>No Shifts</p></div> // remove the div?
                      }
                  </TableCell>
                  ))}
              </TableRow>
            )}
        </TableBody>
      </Table>
      <Button color='success' onPress={applyShifts}>Save Shifts</Button>
    </section>
  </>
  )
}



