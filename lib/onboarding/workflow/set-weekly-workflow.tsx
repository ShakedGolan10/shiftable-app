'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Employer } from '@/types/class.service';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, TimeInputValue } from '@nextui-org/react';
import { createTableRows, daysOfWeek, generateId, getEmptyTableRow } from '@/lib/server.utils';
import { MinusCircleIcon, PencilIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { TimeInputModal } from './shift-time-input-modal';
import { useAsync } from '@/hooks/useAsync';
import { saveOneField } from '@/services/server-services/db.service';

export default function SetWeeklyFlow({ user, setIsSaved } : { user: Employer, setIsSaved: Dispatch<SetStateAction<boolean>> }) {

    const [ tableItems, setTableItems ] = useState([...createTableRows<WeeklyShifts, ShiftSlot>(user.weeklyWorkflow, daysOfWeek, 'day')])
    const [chosenShift, setChosenShift] = useState<{day: string, shift: string}>(undefined)
    const [ weeklyFlow, setWeeklyFlow ] = useState<WeeklyShifts>(user.weeklyWorkflow)
    const [ exeuteAsyncFunc ] = useAsync()
    
    const pickShiftTime = (startTime: TimeInputValue, endTime: TimeInputValue) => {
        const newShiftId = generateId()
        const newShiftTime = `${String(startTime.hour).padStart(2, '0')}:${String(startTime.minute).padStart(2, '0')}-${String(endTime.hour).padStart(2, '0')}:${String(endTime.minute).padStart(2, '0')}`
        setTableItems(prev => {
            const shiftSlot = prev[chosenShift.shift].rowItems[chosenShift.day] as ShiftSlot
            prev[chosenShift.shift].rowItems[chosenShift.day] = {shiftId: (shiftSlot) ? shiftSlot.shiftId : newShiftId, shift: newShiftTime}
            return [...prev]
          })
        setWeeklyFlow(prev => { 
            const day = daysOfWeek[chosenShift.day].day.toLowerCase()
            const shiftSlot = prev[day][chosenShift.shift] as ShiftSlot
            if (shiftSlot) prev[day][chosenShift.shift] = {...shiftSlot ,shift: newShiftTime}
            else prev[day][chosenShift.shift] = {shift: newShiftTime, shiftId: newShiftId}
            return {...prev}
          })
          setChosenShift(undefined)
    }
    const createNewRow = (atIdx?: string) => {
        if (!atIdx) {
            setTableItems(prev => [...prev, getEmptyTableRow(prev.length, daysOfWeek)])
        }
    }
    const deleteLastRow = (atIdx?: string) => {
        if (!atIdx) {
            setTableItems(prev => [...prev].slice(0, prev.length-1))
        }
    }

    const saveWeeklyWorkflow = async () => {
      await exeuteAsyncFunc({
        asyncOps: [() => saveOneField(`users/${user.id}`, 'weeklyWorkflow', weeklyFlow)],
        successMsg: 'Weekly Workflow saved successfuly!',
        errorMsg: 'Wasnt successful please try again later'
      })
      setIsSaved(true)
    }
    
    return (
        <>
        {chosenShift && <TimeInputModal shiftSlot={weeklyFlow[daysOfWeek[chosenShift.day].day.toLowerCase()][chosenShift.shift]} setTime={(startTime: TimeInputValue, endTime: TimeInputValue) => pickShiftTime(startTime, endTime)} isOpen={Boolean(chosenShift)} onClose={() => setChosenShift(undefined)} />}
        <Table aria-label="Employer Shifts Table" className="my-4">
            <TableHeader columns={daysOfWeek}>
              {(dayElement) => <TableColumn aria-label={dayElement.day} key={dayElement.key} className="text-base text-center">{dayElement.day}</TableColumn>}
            </TableHeader>
            <TableBody>
              {tableItems.map((item) => (
              <TableRow key={item.key}>
                {item.rowItems.map((shiftElement, day) => ( // Needed to be that way instead of items attribute to better respond to state change in items
                  <TableCell height={'75'} key={day}>
                   <article className='flex flex-col gap-2'>
                      <p className='text-base text-center'>{(shiftElement) ? shiftElement.shift : 'No shift'}</p>
                      <Button onClick={()=> setChosenShift({day: day.toString(), shift: item.key})} isIconOnly className="bg-transparent w-full">
                      {(shiftElement) ?
                          <PencilIcon width={16} height={16} />
                          :
                          <PlusCircleIcon width={16} height={16} />
                          }
                      </Button>
                      </article>
                  </TableCell>
                ))}
              </TableRow>
              ))}
            </TableBody>
        </Table>
        <Button className="bg-transparent" onClick={() => createNewRow()}>
            <PlusCircleIcon width={50} height={50} />
            <span className='font-semibold w-28 text-left'>Add row</span>
        </Button> 
        <Button className="bg-transparent" onClick={() => deleteLastRow()}>
            <MinusCircleIcon width={50} height={50} />
            <span className='font-semibold w-28 text-left'>Remove LAST row</span>
        </Button> 
        <Button color='success' onClick={() => saveWeeklyWorkflow()}>
            <span>Save Weeklyflow</span>
        </Button> 
      </>
      );
}

