'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Switch } from "@nextui-org/react";
import { applyShiftsRequest, getUserApplicableShiftsData } from '@/services/shifts.service';
import { useAuth } from '@/providers/UserContextProvider';
import { Employee } from '@/types/class.service'; // Assuming your types
import { RulesTable } from '@/components/application_rules';
import LoadingElement from '@/components/loading-element';

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

export interface TableShifts  {
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
  isCant: boolean
}

interface RowItem {
  key: string 
  shifts: Shift[] 
}

export function ShiftsApplyTable() {

  const { user, isLoadingAuth } = useAuth();
  const [applicableShifts, setApplicableShifts] = useState<TableShifts>(undefined);
  const [selectedShifts, setSelectedShifts] = useState(emptySelectedShifts);
  const [applyRules, setApplyRules] = useState<ApplicationRules>(undefined);
  const [numOfCantRule, setNumOfCantRule] = useState<number>(0);
  const [minDaysRule, setMinDaysRule] = useState<number>(0);
  const [mandatoryShiftsRule, setMandatoryShiftsRule] = useState<boolean>(false);
  const [optionalShiftsRule, setOptionalShiftsRule] = useState<number[]>([]);
  const [isCant, setIsCant] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)


  useEffect(() => {
    const getShiftsData = async () => {
      const {applicationRules, applicableShifts } = await getUserApplicableShiftsData((user as Employee).employer.id);
      const adJustedShifts = (): TableShifts => {
        const dayObj = {}
        daysOfWeek.forEach((day) => {
          if (!applicableShifts[day.day.toLowerCase()].length) dayObj[day.day.toLowerCase()] = []
          else dayObj[day.day.toLowerCase()] = applicableShifts[day.day.toLowerCase()].map((shift: string)=> {return {shift, isSelected: false, isCant: false}})
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
  
  const checkRules = (day: string, isRemove: boolean, shiftIdx: string, prevStateOfShift: Shift) => {
    let isAllMandatoryShiftsSelected:boolean = false 
     for (const key in applyRules) {
        switch (key) {
          case "minDays":
              if (selectedShifts[day].length === 1 && !isRemove) setMinDaysRule(previous=> previous + 1)
              else if (selectedShifts[day].length === 0 && isRemove) setMinDaysRule(previous=> previous - 1)
            break;
          case "numOfCant":
            let count = 0
              if (applicableShifts[day][shiftIdx].isCant && isCant) count++
              else if (prevStateOfShift.isCant) count--
            setNumOfCantRule(prev => {
             return (prev + count > 0) ? prev + count : 0
            })
            break;
          case "mandatoryShifts":
            for (const day in applyRules.mandatoryShifts) {
              if (selectedShifts[day].includes(applyRules.mandatoryShifts[day])) isAllMandatoryShiftsSelected = true
              else {
                isAllMandatoryShiftsSelected = false
                break
              }
            }
            setMandatoryShiftsRule(isAllMandatoryShiftsSelected)
            break;
          case "optionalShifts":
            applyRules.optionalShifts.forEach(({ shiftsToChoose }, idx) => {
              let count = 0
              for (const day in shiftsToChoose) {
                if (selectedShifts[day].includes(shiftsToChoose[day])) count++
                else if (isRemove && selectedShifts[day].includes(shiftsToChoose[day])) count--
              }
              setOptionalShiftsRule(prev => {
                prev[idx] = count
                return [...prev]
              })
            })
            break;
          
        }
      }
  }

  const selectShift = (item: RowItem, day: string) => {
    
    if (!applicableShifts[day][item.key]) return 
    if (isCant && (numOfCantRule >= applyRules.numOfCant)) return 
    
    let prevStateOfShift: Shift
    
    setApplicableShifts(prev => {
      prevStateOfShift ={...prev[day][item.key]}
      if (!isCant) {
        prev[day][item.key].isSelected = !prev[day][item.key].isSelected 
        prev[day][item.key].isCant = false
      } else {
        prev[day][item.key].isCant = true
        prev[day][item.key].isSelected = false
      }
      return {...prev}
    })
    const { shift } = applicableShifts[day][item.key] as Shift
    let shiftIdx: number
      setSelectedShifts(prev => { 
        shiftIdx = (prev[day]).indexOf(shift)
        if (shiftIdx === (-1) && !isCant) prev[day].push(shift)
        else prev[day].splice(shiftIdx, 1)
        return {...prev}
      })
      setTimeout(()=> { // needs timeout because the set state of the selectedShifts is async 
        checkRules(day, (shiftIdx === -1) ? false : true, item.key, prevStateOfShift)
      }, 10)

  }

  const applyShifts = async () => {
    setIsLoading(true)
    await applyShiftsRequest(applicableShifts, (user as Employee).employer.id)
    setIsLoading(false)
  }

  return applicableShifts ? (
    <>
    <span className='text-5xl font-serif '>Please apply your shifts</span>
    <span className='text-2xl '>Pay attention to the rules table</span>
    <Table aria-label="Shifts table" className="w-full">
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
              ${(shift.isCant) ? ` dark:bg-red light:bg-red` : (shift.isSelected) ? ` dark:bg-light-green light:bg-light-green` : ``}
              text-center p-[3%] text-lg`}>
              {shift.shift || "No Shifts"}
            </TableCell>
          ))}
        </TableRow>
      )}
      </TableBody>
    </Table>
    <Switch isSelected={isCant} onValueChange={setIsCant}>
        Toggle to choost shifts you cant work
    </Switch> 
  <RulesTable applicationRules={applyRules} rulesState={{numOfCantRule, minDaysRule, mandatoryShiftsRule, optionalShiftsRule}} applyShifts={applyShifts} isLoading={isLoading} />
  </>
  ) : !isLoadingAuth && <LoadingElement msg="Loading your shifts..." />
}
