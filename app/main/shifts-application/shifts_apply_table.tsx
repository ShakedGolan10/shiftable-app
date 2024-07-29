'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { getUserApplicableShiftsData } from '@/services/shifts.service';
import { useAuth } from '@/providers/UserContextProvider';
import { Employee } from '@/types/class.service'; // Assuming your types
import { RulesTable } from '@/components/application_rules';

const daysOfWeek = [
  { day: 'Sunday', key: '0' },
  { day: 'Monday', key: '1' },
  { day: 'Tuesday', key: '2' },
  { day: 'Wednesday', key: '3' },
  { day: 'Thursday', key: '4' },
  { day: 'Friday', key: '5' },
  { day: 'Saturday', key: '6' }
];

const emptySelectedShifts = {
  sunday: [],
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
}

interface TableShifts  {
    sunday: Shift[]
    monday: Shift[]
    tuesday: Shift[]
    wednesday: Shift[]
    thursday: Shift[]
    friday: Shift[]
    saturday: Shift[]
}

interface Shift {
  shift: string
  isSelected: boolean
}

interface RowItem {
  key: string 
  shifts: Shift[] 
}

export function ShiftsApplyTable() {
  const { user } = useAuth();
  const [applicableShifts, setApplicableShifts] = useState<TableShifts>(undefined);
  const [selectedShifts, setSelectedShifts] = useState(emptySelectedShifts);
  const [applyRules, setApplyRules] = useState<ApplicationRules>(undefined);
  const [numOfCantRule, setNumOfCantRule] = useState<number>(0);
  const [minDaysRule, setMinDaysRule] = useState<number>(0);
  const [mandatoryShiftsRule, setMandatoryShiftsRule] = useState<boolean>(false);
  const [optionalShiftsRule, setOptionalShiftsRule] = useState<number[]>([]);
  
  useEffect(() => {
    const getShiftsData = async () => {
      const {applicationRules, applicableShifts } = await getUserApplicableShiftsData((user as Employee).employer.id);
      const adJustedShifts = (): TableShifts => {
        const dayObj = {}
        daysOfWeek.forEach((day) => {
          if (!applicableShifts[day.day.toLowerCase()].length) dayObj[day.day.toLowerCase()] = []
          else dayObj[day.day.toLowerCase()] = applicableShifts[day.day.toLowerCase()].map((shift: string)=> {return {shift, isSelected: false}})
        })
        return dayObj as TableShifts
        
      }
      const tableShifts = adJustedShifts()
      setApplicableShifts(tableShifts);
      setApplyRules(applicationRules);
      setOptionalShiftsRule(applicationRules.optionalShifts.map(() => 0))
    };
    if (user) getShiftsData();
  
  }, [user]);

  const createRows = (): RowItem[] => {
    const maxShiftsPerDay = daysOfWeek.reduce((max, day) => {
      const shifts = applicableShifts[day.day.toLowerCase()] || [];
      return Math.max(max, shifts.length);
    }, 0);
  
    const rows = [];
  
    for (let rowIndex = 0; rowIndex < maxShiftsPerDay; rowIndex++) {
      const shifts: Shift[] = daysOfWeek.map(day => applicableShifts[day.day.toLowerCase()]?.[rowIndex] || "");
      rows.push({
        key: rowIndex.toString(),
        shifts
      });
    }
    return rows;
  };
  
  const checkRules = (item: RowItem, day: string) => {
    const { shift } = applicableShifts[day][item.key] as Shift
    let isAllMandatoryShiftsSelected:boolean = false 
    setSelectedShifts(prev => {
      const shiftIdx = (prev[day]).indexOf(shift)
      for (const key in applyRules) {
        switch (key) {
          case "minDays":
            if (!prev[day].length) {
              prev[day].push(shift)
              setMinDaysRule(previous=> previous + 1)
            }
              else if (shiftIdx === -1) {
                prev[day].push(shift)
                if (!prev[day].length) setMinDaysRule(previous=> previous + 1)
              } else {  
                  if (prev[day].length === 1) setMinDaysRule(previous=> previous - 1)
                  prev[day].splice(shiftIdx, 1)
            }
            break;
          case "numOfCant":
            break;
          case "mandatoryShifts":
            for (const day in applyRules.mandatoryShifts) {
              if (prev[day].includes(applyRules.mandatoryShifts[day])) isAllMandatoryShiftsSelected = true
              else {
                isAllMandatoryShiftsSelected = false
                break
              }
            }
            setMandatoryShiftsRule(isAllMandatoryShiftsSelected)
            break;
          case "optionalShifts":
            break;
          
        }
      }
      return {...prev}
    })
   
  }

  const selectShift = (item: RowItem, day: string) => {
    if (!applicableShifts[day][item.key]) return 
    setApplicableShifts(prev => {
      prev[day][item.key].isSelected = !prev[day][item.key].isSelected 
      return {...prev}
    })
      checkRules(item, day)

  }

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
            <TableCell key={index} onClick={() => selectShift(item, daysOfWeek[index].day.toLowerCase())} 
              aria-labelledby={`shift-${item.key}-${index}`} 
              className={`light:bg-green dark:bg-slate-700 hover:bg-light-green hover:dark:bg-light-green 
              ${shift ? ` cursor-pointer` : ` cursor-not-allowed hover:bg-transparent hover:dark:bg-transparent`} 
              ${shift.isSelected ? ` dark:bg-light-green` : ``}
              text-center p-[3%] text-lg`}>
              {shift.shift || "No Shifts"}
            </TableCell>
          ))}
        </TableRow>
      )}
      </TableBody>
    </Table>
  <RulesTable applicationRules={applyRules} rulesState={{numOfCantRule, minDaysRule, mandatoryShiftsRule, optionalShiftsRule}} />
  </>
  );
}
