'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch } from "@nextui-org/react";
import { Employee } from '@/types/class.service';
import { saveUserShiftsRequest } from '@/services/server-services/shifts.service';
import { useAsync } from '@/hooks/useAsync';
import { createTableRows, daysOfWeek, getDateOfApply } from '@/lib/server.utils';
import { Shift, TableShifts, WeeklyShifts } from '@/types/user/types.server';
import GeneralTitle from '@/components/helpers/general-title';
import { RulesTable } from '@/lib/employee/shifts-application/rules-table';

interface ShiftsTableProps {
  data: [
    weeklyWorkflow: WeeklyShifts,
    applyRules: ApplicationRules
  ];
  user: Employee;
}

export function ShiftsApplyTable({ data, user }: ShiftsTableProps) {

  const [ weeklyWorkflow, applyRules ] = data;
  const [applicableShifts, setApplicableShifts] = useState<TableShifts>(undefined);
  const [selectedShifts, setSelectedShifts] = useState({
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  });
  const [numOfCantRule, setNumOfCantRule] = useState<number>(0);
  const [minDaysRule, setMinDaysRule] = useState<number>(0);
  const [mandatoryShiftsRule, setMandatoryShiftsRule] = useState<boolean>(false);
  const [optionalShiftsRule, setOptionalShiftsRule] = useState<number[]>([]);
  const [isCant, setIsCant] = useState<boolean>(false)
  const [ executeAsyncFunc ] = useAsync()
  const forDate = getDateOfApply(user.employer.applicationTime.day, user.employer.applicationTime.time)

  useEffect(() => {
    const adJustedShifts = (): TableShifts => {
      const dayObj = {}
      daysOfWeek.forEach((dayElement) => {
        if (!weeklyWorkflow[dayElement.day.toLowerCase()].length) dayObj[dayElement.day.toLowerCase()] = []
        else {
          dayObj[dayElement.day.toLowerCase()] = weeklyWorkflow[dayElement.day.toLowerCase()]
          .map(({ shift, shiftId }) => {
            if (user.blockedShifts.includes(shiftId)) return {}
            else return {shift, shiftId, isSelected: false, isCant: false}
          })}})
          return dayObj as TableShifts
    }
    const tableShifts = adJustedShifts()
    setApplicableShifts(tableShifts);
    setOptionalShiftsRule(applyRules.optionalShifts.map(() => 0))
  },[])

  const checkRules = (day: string, isRemove: boolean, shiftIdx: string, prevStateOfShift: Shift) => {
    let isAllMandatoryShiftsSelected:boolean = false 
     for (const key in applyRules) {
        switch (key) {
          case "minDays":
              if (selectedShifts[day].length === 1 && !isRemove && !isCant) setMinDaysRule(previous=> previous + 1)
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
            for (const weekDay in applyRules.mandatoryShifts) {
              if (selectedShifts[weekDay].includes(applyRules.mandatoryShifts[weekDay])) isAllMandatoryShiftsSelected = true
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
              for (const weekDay in shiftsToChoose) {
                const isSameShift = Boolean(applicableShifts[day][shiftIdx].shift === shiftsToChoose[weekDay] && weekDay === day)
                if (isSameShift && !isRemove && !isCant) count++
                else if (isSameShift && isRemove) count--
              }
              setOptionalShiftsRule(prev => {
                prev[idx]+=count
                return [...prev]
              })
            })
            break;
          
        }
      }
  }

  const selectShift = (item: { key: string, rowItems: Shift[] }, day: string) => {
    if (!applicableShifts[day][item.key] || !applicableShifts[day][item.key].shift) return 
    if (isCant && (numOfCantRule >= applyRules.numOfCant)) return 
    if (isCant && applicableShifts[day][item.key].isCant) return 
    
    let prevStateOfShift: Shift
    let shiftIdx: number
    const { shift } = applicableShifts[day][item.key] as Shift
    
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
    
    setSelectedShifts(prev => { 
        shiftIdx = (prev[day]).indexOf(shift)
        if (shiftIdx === (-1) && !isCant) prev[day].push(shift)
        else if (shiftIdx > (-1)) prev[day].splice(shiftIdx, 1)
        return {...prev}
      })
      setTimeout(()=> { // needs timeout because the set state of the selectedShifts is async 
        checkRules(day, (shiftIdx === -1) ? false : true, item.key, prevStateOfShift)
      }, 10)

  }
  
  const applyShifts = async () => {
    await executeAsyncFunc({
      asyncOps: [() => saveUserShiftsRequest(user.id, user.employer.id, forDate, applicableShifts)],
      errorMsg: 'Couldnt apply shifts',
      successMsg: 'Shifts applied successfuly' 
    })
    
  }
useEffect(()=> console.log({applicableShifts}),[applicableShifts])
return applicableShifts &&
  <>
  <GeneralTitle title={`Please apply your shifts for ${forDate}`} />
  <span className='text-small'>Pay attention to the rules table</span>
  <Table aria-label="Shifts table" className="w-full">
    <TableHeader columns={daysOfWeek}>
      {(dayElement) => <TableColumn aria-label={dayElement.day} key={dayElement.key} className="text-base text-center">{dayElement.day}</TableColumn>}
    </TableHeader>
    <TableBody items={createTableRows<TableShifts, Shift>(applicableShifts, daysOfWeek, 'day')}>
      {(item) => (
        <TableRow aria-labelledby={`shifts-row-${item.key}`} key={item.key}>
            {item.rowItems.map((shiftElement, index) => (
            <TableCell height={100} key={index} onClick={() => selectShift(item, daysOfWeek[index].day.toLowerCase())} 
              aria-labelledby={`shift-${item.key}-${index}`} 
              className={`light-mobile:bg-green light-tablet:bg-green light-desktop:bg-green 
                dark-mobile:bg-slate-700 dark-tablet:bg-slate-700 dark-desktop:bg-slate-700  
              text-center p-[2.6%] text-base
              ${shiftElement && shiftElement.shift ? ` cursor-pointer hover:bg-light-green hover:dark-mobile:bg-light-green hover:dark-tablet:bg-light-green hover:dark-desktop:bg-light-green` : ` cursor-not-allowed hover:bg-transparent`} 
              ${(shiftElement.isCant) ? ` bg-red`
              : (shiftElement.isSelected) ? ` bg-light-green` : ``}
              `}>
              {shiftElement.shift || "No Shifts"}
            </TableCell>
          ))}
        </TableRow>
      )}
    </TableBody>
  </Table>
  <Switch isSelected={isCant} onValueChange={setIsCant}>
      Toggle to mark the shifts you cant work
  </Switch> 
<RulesTable applicationRules={applyRules} rulesState={{numOfCantRule, minDaysRule, mandatoryShiftsRule, optionalShiftsRule}} applyShifts={applyShifts} />
</>
}
