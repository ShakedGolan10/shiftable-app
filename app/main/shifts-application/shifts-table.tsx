'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { getUserApplicableShiftsData } from '@/services/shifts.service';
import { useAuth } from '@/providers/UserContextProvider';
import { Employee } from '@/types/class.service'; // Assuming your types

const daysOfWeek = [
  { day: 'Sunday', key: '0' },
  { day: 'Monday', key: '1' },
  { day: 'Tuesday', key: '2' },
  { day: 'Wednesday', key: '3' },
  { day: 'Thursday', key: '4' },
  { day: 'Friday', key: '5' },
  { day: 'Saturday', key: '6' }
];

export default function ShiftsTable() {
  const { user } = useAuth();
  const [shiftsData, setShiftsData] = useState(null);
  const [applyRules, setApplyRules] = useState(null);
  
  useEffect(() => {
    const getShiftsData = async () => {
      const { applicable_shifts, application_rules } = await getUserApplicableShiftsData((user as Employee).employer.id);
      setShiftsData(applicable_shifts);
      setApplyRules(application_rules);
    };
    if (user) getShiftsData();
  
  }, [user]);

  const createRows = () => {
    if (!shiftsData) return [];

    const maxShiftsPerDay = Math.max(...daysOfWeek.map(day => shiftsData[day.day.toLowerCase()]?.length || 0));

    return Array.from({ length: maxShiftsPerDay }, (_, rowIndex) => {
      return {
        key: rowIndex.toString(),
        shifts: daysOfWeek.map(day => shiftsData[day.day.toLowerCase()]?.[rowIndex] || "")
      };
    });
  };

  const selectShift = (item, index) => {
    console.log('item:', item, index);
  };

  return shiftsData && (
    <Table aria-label="Shifts table" className="w-full">
    <TableHeader columns={daysOfWeek}>
      {(column) => <TableColumn aria-label={column.day} key={column.key} className="text-lg">{column.day}</TableColumn>}
    </TableHeader>
    <TableBody items={createRows()}>
      {(item) => (
        <TableRow aria-labelledby={`shifts-row-${item.key}`} key={item.key}>
          {item.shifts.map((shift, index) => (
            <TableCell key={index} onClick={() => selectShift(item, index)} 
              aria-labelledby={`shift-${item.key}-${index}`} 
              className={`light:bg-green dark:bg-slate-700 hover:bg-light-green hover:dark:bg-light-green 
              ${shift ? ` cursor-pointer` : `cursor-not-allowed hover:bg-transparent hover:dark:bg-transparent`}  text-center p-[3%] text-lg`}>
              {shift || "No Shifts"}
            </TableCell>
          ))}
        </TableRow>
      )}
    </TableBody>
  </Table>
  );
}
