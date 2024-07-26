'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { getUserApplicableShiftsData } from '@/services/shifts.service';
import { useAuth } from '@/providers/UserContextProvider';
import { Employee } from '@/types/class.service'; // Assuming your types
import { ApplicationRules } from '@/components/application_rules';

const daysOfWeek = [
  { day: 'Sunday', key: '0' },
  { day: 'Monday', key: '1' },
  { day: 'Tuesday', key: '2' },
  { day: 'Wednesday', key: '3' },
  { day: 'Thursday', key: '4' },
  { day: 'Friday', key: '5' },
  { day: 'Saturday', key: '6' }
];

export function ShiftsApplyTable() {
  const { user } = useAuth();
  const [applicableShifts, setApplicableShifts] = useState(null);
  const [applyRules, setApplyRules] = useState(null);
  const [numOfCantRule, setNumOfCantRule] = useState<number>(0);
  const [minDaysRule, setMinDaysRule] = useState<number>(0);
  const [mandatoryShiftsRule, setMandatoryShiftsRule] = useState<boolean>(false);
  const [optionalShiftsRule, setOptionalShiftsRule] = useState<number[]>([0]);
  
  useEffect(() => {
    const getShiftsData = async () => {
      const { applicableShifts, applicationRules } = await getUserApplicableShiftsData((user as Employee).employer.id);
      setApplicableShifts(applicableShifts);
      setApplyRules(applicationRules);
      console.log('rules:', applicationRules)
    };
    if (user) getShiftsData();
  
  }, [user]);

  
  const createRows = () => {
    if (!applicableShifts) return [];

    const maxShiftsPerDay = Math.max(...daysOfWeek.map(day => applicableShifts[day.day.toLowerCase()]?.length || 0));

    return Array.from({ length: maxShiftsPerDay }, (_, rowIndex) => {
      return {
        key: rowIndex.toString(),
        shifts: daysOfWeek.map(day => applicableShifts[day.day.toLowerCase()]?.[rowIndex] || "")
      };
    });
  };

  const selectShift = (item, index) => {
    console.log('item:', item, index);
  };

  return applicableShifts && (
    <>
    <span className='text-5xl font-serif mt-10 mb-5 '>Please apply shifts</span>
    <Table aria-label="Shifts table" className="w-full my-2">
    <TableHeader columns={daysOfWeek}>
      {(column) => <TableColumn aria-label={column.day} key={column.key} className="text-lg text-center">{column.day}</TableColumn>}
    </TableHeader>
    <TableBody items={createRows()}>
      {(item) => (
        <TableRow aria-labelledby={`shifts-row-${item.key}`} key={item.key}>
          {item.shifts.map((shift, index) => (
            <TableCell key={index} onClick={() => selectShift(item, index)} 
              aria-labelledby={`shift-${item.key}-${index}`} 
              className={`light:bg-green dark:bg-slate-700 hover:bg-light-green hover:dark:bg-light-green 
              ${shift ? ` cursor-pointer` : ` cursor-not-allowed hover:bg-transparent hover:dark:bg-transparent`} text-center p-[3%] text-lg`}>
              {shift || "No Shifts"}
            </TableCell>
          ))}
        </TableRow>
      )}
    </TableBody>
  </Table>
  <ApplicationRules applicationRules={applyRules} rulesState={{numOfCantRule, minDaysRule, mandatoryShiftsRule, optionalShiftsRule}} />
  </>
  );
}
