'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { Employer } from '@/types/class.service';
import { SetShiftsTableCell } from './set-shifts-table-cell';
import { DayOrientedObject, Shift, ShiftReqs } from '@/types/user/types.server';
import { useConfirm } from '@/hooks/useConfirm';
import ConfirmationModal from '@/components/helpers/confirm-modal';
import { getWeeklySchedule, saveWeeklySchedule } from '@/services/server-services/shifts.service';
import { useAsync } from '@/hooks/useAsync';
import GeneralTitle from '@/components/helpers/general-title';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
  }


export default function SetShiftsTable({ data, user, forDate }: IShiftsTableProps) {
  const shiftsReqs: ShiftReqs[] = data
  const [selectedShifts, setSelectedShifts] = useState<DayOrientedObject<Shift[]>>(undefined);
  const [emoloyeeDailyShiftCount, setEmoloyeeDailyShiftCount] = useState<DayOrientedObject<string[]>>(emptyDayOrientedObject)
  const {isModalOpen, askConfirmation, handleModalClose, msg} = useConfirm()
  const [ excuteAsyncFunc ] = useAsync()

  useEffect(()=> {
    getWeeklySchedule(user.id, forDate).then(res => (res) ? setSelectedShifts(res) : setSelectedShifts(emptyDayOrientedObject))
  },[])
  
  const maxRows = (items: WeeklyShifts) => {
    const maxRowsPerColumn = Object.values(items).reduce((acc, element) => {
      return Math.max(acc, element.length);
    }, 0);
    if (maxRowsPerColumn) return [...Array(maxRowsPerColumn)].map(() => '')
      else return []
  
  };

  const confirmDailyLimit = async (day: string, shiftSelected: Shift, isRemove: boolean):Promise<boolean> => {
    const isExist = (emoloyeeDailyShiftCount[day][shiftSelected.name]?.length >= 1)
    if (!isExist) {
      setEmoloyeeDailyShiftCount(prev => ({...prev, [day]: {
              ...prev[day],
              [shiftSelected.name]: [shiftSelected.shiftId]
            }
          })
        )
        return true
    } else {
      if (isRemove) setEmoloyeeDailyShiftCount(prev => ({...prev, [day]: {
            ...prev[day],
            [shiftSelected.name]: prev[day][shiftSelected.name].filter(shiftId => shiftId !== shiftSelected.shiftId)
          }
        })
      )
      else {
        const isPossible = await askConfirmation(`Youre about to asign ${shiftSelected.name} for more then 1 shift this day`)
        if (isPossible) {
          setEmoloyeeDailyShiftCount(prev => ({...prev, [day]: {
            ...prev[day],
            [shiftSelected.name]: [...prev[day][shiftSelected.name],  shiftSelected.shiftId]
          }
         })) 
        return true
      } else throw new Error('')
      }
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
        await confirmDailyLimit(day, shiftSelected, isRemove)
      ]) 
      return true 
    } catch (error) {
      return false
    } 
  }

  const handleSelectChange = async (day: string, shiftIdx: number, updatedShifts: Shift[], shiftUnselected?: Shift): Promise<boolean> => {
    const { shiftId } = user.weeklyWorkflow[day][shiftIdx]
    const shiftSelected = (shiftUnselected) ? shiftUnselected : updatedShifts[updatedShifts.length-1]
    const isPossible = await checkRules(day, shiftSelected, (shiftUnselected) ? true : false)
    if (!isPossible) return false
    setSelectedShifts((prev) => ({
      ...prev,
      [day]: {
        ...prev?.[day],
        [shiftId]: {
          ...prev[day][shiftId],
          [shiftSelected.name]: (shiftUnselected) ? false : true
        },
      },
    }));
    
    return true
  };

  const checkEmptyShifts = async () => {
    
  }

  // Todo: add a check empty shifts and warning feature
  // Todo: add an option to mark a shift as cancelled / not working
  // Todo make the ShiftsReqs be a / work with the selectedShifts type (DayOrientedObject<Shift[]>) for updating shift apply, and continue from where stopped

  const applyShifts = async () => {
    await checkEmptyShifts()
    await excuteAsyncFunc({
      asyncOperation: () => saveWeeklySchedule(user.id, forDate, selectedShifts), 
      errorMsg: 'Couldnt apply shifts, please try again',
      successMsg: 'Weekly shifts applied successfuly',
      isLoaderDisabled: false
    }) 
  }

  return (
  <>
    <ConfirmationModal message={msg} onClose={handleModalClose} open={isModalOpen} />
    <section className="w-full flex flex-col overflow-x-auto items-center justify-evenly flex-grow">
      <GeneralTitle title={`Set the shifts for the ${forDate}`} />
      <Table aria-label="Employer Shifts Table" className="text-xs">
        <TableHeader>
          {daysOfWeek.map((day) => (
            <TableColumn key={day} className="text-center">{day}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {maxRows(user.weeklyWorkflow).map((_, shiftIndex) => (
              <TableRow key={shiftIndex}>
                {daysOfWeek.map((day) => (
                  <TableCell key={day}>
                    {(user.weeklyWorkflow[day.toLowerCase()][shiftIndex]) ? 
                    <SetShiftsTableCell
                      day={day.toLowerCase()}
                      shiftIndex={shiftIndex}
                      availableShifts={shiftsReqs.flatMap(req => ({
                        name: req.name, ...req.shifts[day.toLowerCase()][shiftIndex]
                      
                      }))}
                      selectedShifts={selectedShifts && selectedShifts[day.toLowerCase()][user.weeklyWorkflow[day.toLowerCase()][shiftIndex].shiftId]}
                      onSelectChange={async (updatedShifts, shiftUnselected) => await handleSelectChange(day.toLowerCase(), shiftIndex, updatedShifts, shiftUnselected)}
                    /> :
                      <div><p>No Shifts</p></div> // remove the div?
                      }
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button color='success' onPress={applyShifts}>Apply Shifts</Button>
    </section>
  </>
  )
}



