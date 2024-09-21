'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { Employer } from '@/types/class.service';
import { getNextSunday } from '@/lib/server.utils';
import { EmployerTableCell } from './set-shifts-table-cell';
import { DayOrientedObject, Shift, ShiftReqs } from '@/types/user/types.server';

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
  const [emoloyeesShiftCount, setEmoloyeesShiftCount] = useState<DayOrientedObject<number>>(emptyDayOrientedObject)
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

  const checkRules = (day: string, shiftIdx: number, updatedShifts: Shift[]) :boolean => {
    // const existIdx = emoloyeesShiftCount[day].findIndex((shiftObj) => shiftObj.name === updatedShifts)
    return true
  }

  const handleSelectChange = (day: string, shiftIdx: number, updatedShifts: Shift[]): boolean => {
    const isPossible = checkRules(day, shiftIdx, updatedShifts)
    if (!isPossible) return false
    const { shiftId } = user.weeklyWorkflow[day][shiftIdx]
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
                    <EmployerTableCell
                      day={day.toLowerCase()}
                      shiftIndex={shiftIndex}
                      availableShifts={shiftsReqs.flatMap(req => ({
                        name: req.name, ...req.shifts[day.toLowerCase()][shiftIndex]
                      }))}
                      // selectedShifts={selectedShifts[day]?.[shiftIndex] || []}
                      onSelectChange={(updatedShifts) => handleSelectChange(day.toLowerCase(), shiftIndex, updatedShifts)}
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
}
