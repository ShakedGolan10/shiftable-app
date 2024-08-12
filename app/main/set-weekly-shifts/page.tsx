'use client';
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { useAuth } from '@/providers/UserContextProvider';
import { Employer } from '@/types/class.service';
import { getNextSunday } from '@/lib/server.utils';
import { getEmployeesShiftsReqs } from '@/services/employer.service';
import { ShiftReqs } from '@/services/server-services/employer.service';
import { EmployerTableCell } from './employer_table_cell';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function EmployerTable() {
  const { user } = useAuth<Employer>();
  
  const [shiftsReqs, setShiftsReqs] = useState<ShiftReqs[] | null>(null);
  const [selectedShifts, setSelectedShifts] = useState<Record<string, Record<number, string[]>>>({});

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const forDate = getNextSunday();
        const shiftsReqsData = await getEmployeesShiftsReqs(forDate);
        console.log('shiftsReqs: ', shiftsReqs)
        setShiftsReqs(shiftsReqsData);
      } catch (error) {
        console.error('Failed to fetch shifts:', error);
      }
    };
    
    if (user) fetchShifts();
  }, [user]);

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
          {Object.keys(shiftsReqs[0].shifts.friday).map((_, shiftIndex) => (
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
