'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { useAuth } from '@/providers/UserContextProvider';
import { Employer } from '@/types/class.service';
import { getNextSunday } from '@/lib/server.utils';
import { getEmployeesShiftsReqs } from '@/services/employer.service';
import { EmployerTableCell } from './employer_table_cell';
import { RowItem, Shift, ShiftReqs } from '@/services/shifts.service';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function EmployerTable() {
  const { user } = useAuth<Employer>();
  
  const [shiftsReqs, setShiftsReqs] = useState<ShiftReqs[] | null>(null);
  const [selectedShifts, setSelectedShifts] = useState<Record<string, Record<number, string[]>>>({});

  useEffect(() => {
    if (!user) return 
    const fetchShifts = async () => {
      try {
        const forDate = getNextSunday();
        const shiftsReqsData = await getEmployeesShiftsReqs(forDate);
        console.log('shiftsReqsData: ', shiftsReqsData)
        // Todo: Set the rows of the table, the num of rows needs to be the longest day (by num of shifts) and handle in case there arnt any shifts at the same row
        setShiftsReqs(shiftsReqsData);
      } catch (error) {
        console.error('Failed to fetch shifts:', error);
      }
    };
    
    fetchShifts()

    

  }, [user]);

  const maxRows = (items: WeeklyWorkflow) => {
    const maxRowsPerColumn = Object.values(items).reduce((acc, element) => {
      return Math.max(acc, element.length);
    }, 0);
    console.log('maxRowsPerColumn', maxRowsPerColumn)
    if (maxRowsPerColumn) return [...Array(maxRowsPerColumn)].map(() => '')
      else return []
    // const rows = [];
  
    // for (let rowIndex = 0; rowIndex < maxShiftsPerDay; rowIndex++) {
    //   const shifts: Shift[] = daysOfWeek.map(day => applicableShifts[day.day.toLowerCase()]?.[rowIndex] || "");
    //   rows.push({
    //     key: rowIndex.toString(),
    //     shifts
    //   });
    // }
    // return rows;
  };

  const handleSelectChange = (day: string, shiftIndex: number, updatedShifts: string[]) => {
    setSelectedShifts((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [shiftIndex]: updatedShifts,
      },
    }));
  };

  return ( (shiftsReqs && shiftsReqs.length) ?  
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
                    <EmployerTableCell
                      day={day.toLowerCase()}
                      shiftIndex={shiftIndex}
                      availableShifts={shiftsReqs.flatMap(req => req.shifts[day.toLowerCase()])}
                      selectedShifts={selectedShifts[day]?.[shiftIndex] || []}
                      onSelectChange={(updatedShifts) => handleSelectChange(day.toLowerCase(), shiftIndex, updatedShifts)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Button className="mt-4" onPress={() => console.log('Apply shifts')}>Apply Shifts</Button>
    </div>
  : <h1>There are no requests yet!</h1>) 
}
