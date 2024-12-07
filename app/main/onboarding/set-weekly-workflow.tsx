'use client'
import React, { useState } from 'react'
import { Employer } from '@/types/class.service';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { createTableRows, daysOfWeek, getEmptyTableRow } from '@/lib/server.utils';
import { MinusCircleIcon, PencilIcon, PlusCircleIcon } from '@heroicons/react/24/solid';



export default function SetWeeklyFlow({ user } : { user: Employer }) {

    const [ tableItems, setTableItems ] = useState([...createTableRows<WeeklyShifts, ShiftSlot>(user.weeklyWorkflow, daysOfWeek, 'day')])

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
    // Todo: Define a plus sign for every row (to add row at a requested location)
    // Todo: Define an empty line of shifts row
    // Todo: Enable create, edit, & delete operations upon shift
    // Todo: Enable create & delete operations upon row
    return (
        <>
        <Table aria-label="Employer Shifts Table" className="my-4">
            <TableHeader columns={daysOfWeek}>
          {(dayElement) => <TableColumn aria-label={dayElement.day} key={dayElement.key} className="text-base text-center">{dayElement.day}</TableColumn>}
            </TableHeader>
            <TableBody items={tableItems}>
          {(item) => (
              <TableRow key={item.key}>
                {item.rowItems.map((shiftElement, index) => (
                  <TableCell height={'100'} key={index}>
                    <article className='flex flex-col gap-2'>
                        <p className='text-base text-center'>{(shiftElement) ? shiftElement.shift : 'No shift'}</p>
                        {(shiftElement) ?
                        <Button isIconOnly className="bg-transparent w-full">
                            <PencilIcon width={16} height={16} />
                        </Button>
                        :
                        <Button isIconOnly className="bg-transparent w-full">
                            <PlusCircleIcon width={16} height={16} />
                        </Button> 
                    }
                    </article>
                  </TableCell>
                  ))}
                </TableRow>
                )}
            </TableBody>
        </Table>
        <div className='flex'>
        <Button isIconOnly className="bg-transparent" onClick={() => createNewRow()}>
            <PlusCircleIcon width={50} height={50} />
        </Button> 
        <Button isIconOnly className="bg-transparent" onClick={() => deleteLastRow()}>
            <MinusCircleIcon width={50} height={50} />
        </Button> 
        </div>
      </>
      );
}

