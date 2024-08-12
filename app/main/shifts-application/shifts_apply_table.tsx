'use client'
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Switch } from "@nextui-org/react";
import { applyShiftsRequest, getUserApplicableShiftsData } from '@/services/shifts.service';
import { useAuth } from '@/providers/UserContextProvider';
import { Employee } from '@/types/class.service'; // Assuming your types
import { RulesTable } from '@/components/application_rules';
import LoadingElement from '@/components/loading-element';
import { useSystemActions } from '@/store/actions/system.actions';

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

export interface TableShifts {
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

export const getDateOfApply = (day: number, time: string): string =>  {
  const [targetHour, targetMinute] = time.split(':').map(Number);
    const now = new Date();
    const nowDay = now.getDay();
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();
    
    const isAfterTargetDay = nowDay > day || (nowDay === day && (nowHour > targetHour || (nowHour === targetHour && nowMinute > targetMinute)));

    const nextSunday = new Date();
    nextSunday.setDate(now.getDate() + (7 - nowDay + (isAfterTargetDay ? 7 : 0)));

    const nextSundayString = nextSunday.toDateString();

    return nextSundayString;
}


export function ShiftsApplyTable() {

  const { user, isLoadingAuth } = useAuth<Employee>();
  const [applicableShifts, setApplicableShifts] = useState<TableShifts>(undefined);
  const [selectedShifts, setSelectedShifts] = useState(emptySelectedShifts);
  const [applyRules, setApplyRules] = useState<ApplicationRules>(undefined);
  const [numOfCantRule, setNumOfCantRule] = useState<number>(0);
  const [minDaysRule, setMinDaysRule] = useState<number>(0);
  const [mandatoryShiftsRule, setMandatoryShiftsRule] = useState<boolean>(false);
  const [optionalShiftsRule, setOptionalShiftsRule] = useState<number[]>([]);
  const [isCant, setIsCant] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [forDate, setForDate] = useState<string>(undefined)
  const { toggleModalAction } = useSystemActions()

  useEffect(() => {
    if (!user) return 

    const getShiftsData = async () => {
      const {applicationRules, applicableShifts } = await getUserApplicableShiftsData(user.employer.id);
      const adJustedShifts = (): TableShifts => {
        const dayObj = {}
        daysOfWeek.forEach((element) => {
          if (!applicableShifts[element.day.toLowerCase()].length) dayObj[element.day.toLowerCase()] = []
          else dayObj[element.day.toLowerCase()] = applicableShifts[element.day.toLowerCase()].map((shift: string)=> {return {shift, isSelected: false, isCant: false}})
        })
        return dayObj as TableShifts
      }
      const tableShifts = adJustedShifts()
      setApplicableShifts(tableShifts);
      setApplyRules(applicationRules);
      setOptionalShiftsRule(applicationRules.optionalShifts.map(() => 0))
      setForDate(getDateOfApply(user.employer.applicationTime.day, user.employer.applicationTime.time))
    };
      getShiftsData();
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
              // console.log('daa:', selectedShifts, applyRules.mandatoryShifts[weekDay])
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

  const selectShift = (item: RowItem, day: string) => {
    const { shift } = applicableShifts[day][item.key] as Shift
    let prevStateOfShift: Shift
    let shiftIdx: number

    if (!applicableShifts[day][item.key]) return 
    if (isCant && (numOfCantRule >= applyRules.numOfCant)) return 
    if (isCant && applicableShifts[day][item.key].isCant) return 
    
    
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
    try {
      setIsLoading(true)
      await applyShiftsRequest(applicableShifts, user.employer.id, forDate)
      toggleModalAction('Shifts applied successfuly !', false)
    } catch (error) {
      toggleModalAction('Shifts falied to apply', true)
    } finally {
      setIsLoading(false)
    }
  }

  return applicableShifts ? (
    <>
    <h1 className='text-medium font-serif '>Please apply your shifts for {forDate}</h1>
    <span className='text-small '>Pay attention to the rules table</span>
    <Table aria-label="Shifts table" className="w-full">
      <TableHeader columns={daysOfWeek}>
      {(column) => <TableColumn aria-label={column.day} key={column.key} className="text-base text-center">{column.day}</TableColumn>}
      </TableHeader>
      <TableBody items={createRows()}>
      {(item) => (
        <TableRow aria-labelledby={`shifts-row-${item.key}`} key={item.key}>
            {item.shifts.map((shift, index) => (
            <TableCell key={index} onClick={() => selectShift(item, daysOfWeek[index].day.toLowerCase())} 
              aria-labelledby={`shift-${item.key}-${index}`} 
              className={`light-mobile:bg-green light-tablet:bg-green light-desktop:bg-green dark-mobile:bg-slate-700 dark-tablet:bg-slate-700 dark-desktop:bg-slate-700
              hover:bg-light-green hover:dark-mobile:bg-light-green hover:dark-tablet:bg-light-green hover:dark-desktop:bg-light-green  
              text-center p-[2.6%] text-base
              ${shift ? ` cursor-pointer` : ` cursor-not-allowed hover:bg-transparent`} 
              ${(shift.isCant) ? ` bg-red`
              : (shift.isSelected) ? ` bg-light-green` : ``}
              `}>
              {shift.shift || "No Shifts"}
            </TableCell>
          ))}
        </TableRow>
      )}
      </TableBody>
    </Table>
    <Switch isSelected={isCant} onValueChange={setIsCant}>
        Toggle to mark the shifts you cant work
    </Switch> 
  <RulesTable applicationRules={applyRules} rulesState={{numOfCantRule, minDaysRule, mandatoryShiftsRule, optionalShiftsRule}} applyShifts={applyShifts} isLoading={isLoading} />
  </>
  ) : !isLoadingAuth && <LoadingElement msg="Loading your shifts..." />
}
