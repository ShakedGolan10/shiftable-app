'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { Employer } from '@/types/class.service';
import { getNextSunday } from '@/lib/server.utils';
import { SetShiftsTableCell } from './set-shifts-table-cell';
import { DayOrientedObject, Shift, ShiftReqs } from '@/types/user/types.server';
import { useSystemActions } from '@/store/actions/system.actions';
import { useConfirm } from '@/hooks/useConfirm';
import ConfirmationModal from '@/components/helpers/confirm-modal';

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

interface ShiftsTableProps {
    data:  ShiftReqs[]
    user: Employer;
  }

export default function SetShiftsTable({ data, user }: ShiftsTableProps) {
  const shiftsReqs = data
  const [selectedShifts, setSelectedShifts] = useState<DayOrientedObject<Shift[]>>(emptyDayOrientedObject);
  const [emoloyeeDailyShiftCount, setEmoloyeeDailyShiftCount] = useState<DayOrientedObject<string[]>>(emptyDayOrientedObject)
  const {isModalOpen, askConfirmation, handleModalClose} = useConfirm()
  const forDate = getNextSunday();

  useEffect(() => {  
    console.log('selectedShifts :', selectedShifts)
  }, [selectedShifts]);

  const maxRows = (items: WeeklyWorkflow) => {
    const maxRowsPerColumn = Object.values(items).reduce((acc, element) => {
      return Math.max(acc, element.length);
    }, 0);
    if (maxRowsPerColumn) return [...Array(maxRowsPerColumn)].map(() => '')
      else return []
  
  };

  const checkRules = async (day: string, shiftIdx: number, shiftSelected: Shift, isRemove: boolean):Promise<boolean> => {
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
            [shiftSelected.name]: [prev[day][shiftSelected.name]].filter(shiftId => shiftId !== shiftSelected.shiftId)
          }
        })
      )
      else {
        const isPossible = await askConfirmation()
        if (isPossible) {
          setEmoloyeeDailyShiftCount(prev => ({...prev, [day]: {
            ...prev[day],
            [shiftSelected.name]: [prev[day][shiftSelected.name]].filter(shiftId => shiftId !== shiftSelected.shiftId)
          }
         })
        ) 
        return true
      }
        else return false
      }
    }
  }

  const handleSelectChange = async (day: string, shiftIdx: number, updatedShifts: Shift[], shiftUnselected?: Shift): Promise<boolean> => {
    const { shiftId } = user.weeklyWorkflow[day][shiftIdx]
    const shiftSelected = (shiftUnselected) ? shiftUnselected : updatedShifts[updatedShifts.length-1]
    const isPossible = await checkRules(day, shiftIdx, shiftSelected, (shiftUnselected) ? true : false)
    if (!isPossible) return false
    setSelectedShifts((prev) => ({
      ...prev,
      [day]: {
        ...prev?.[day],
        [shiftId]: updatedShifts,
      },
    }));
    
    return true
  };

  return (shiftsReqs && shiftsReqs.length) &&
  <>
    <ConfirmationModal message='Youre about to add an employee to a shift that contredict the rules' onClose={handleModalClose} open={isModalOpen} />
    <div className="w-full overflow-x-auto">
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
                      // selectedShifts={selectedShifts[day]?.[shiftIndex] || []}
                      onSelectChange={async (updatedShifts, shiftUnselected) => await handleSelectChange(day.toLowerCase(), shiftIndex, updatedShifts, shiftUnselected)}
                    /> :
                      <div><p>No Shifts</p></div>}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button className="mt-4" onPress={() => console.log('Apply shifts')}>Apply Shifts</Button>
    </div>
    </>
}
