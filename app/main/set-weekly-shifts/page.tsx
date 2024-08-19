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
  const [selectedShifts, setSelectedShifts] = useState<Shift[]>([]);

  useEffect(() => {
    if (!user) return 
    const fetchAndArrangeShifts = async () => {
      try {
        const forDate = getNextSunday();
        let shiftsReqsData = await getEmployeesShiftsReqs('Sun Aug 18 2024');
        setShiftsReqs(shiftsReqsData);
      } catch (error) {
        console.error('Failed to fetch shifts:', error);
      }
    };
    
    fetchAndArrangeShifts()

    

  }, [user]);

  useEffect(() => {  
    console.log({selectedShifts})
  }, [selectedShifts]);

  const maxRows = (items: WeeklyWorkflow) => {
    const maxRowsPerColumn = Object.values(items).reduce((acc, element) => {
      return Math.max(acc, element.length);
    }, 0);
    if (maxRowsPerColumn) return [...Array(maxRowsPerColumn)].map(() => '')
      else return []
  
  };

  const handleSelectChange = (day: string, shiftIdx: number, updatedShifts: Shift[]) => {
    const { shiftId } = user.weeklyWorkflow[day][shiftIdx]
    setSelectedShifts((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [shiftId]: updatedShifts,
      },
    }));
  };

  return ( (shiftsReqs && shiftsReqs.length && user) &&
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
                      availableShifts={shiftsReqs.flatMap(req => {return {
                        name: req.name, ...req.shifts[day.toLowerCase()][shiftIndex]
                      }})}
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
  ) 
}
