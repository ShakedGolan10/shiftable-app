'use client'
import React from 'react'
import { motion } from "motion/react";
import { Employer } from '@/types/class.service';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { createTableRows, daysOfWeek } from '@/lib/server.utils';
import { PencilIcon, PlusCircleIcon } from '@heroicons/react/24/solid';



export default function SetWeeklyFlow({ user } : { user: Employer }) {

    const tableItems = createTableRows<WeeklyShifts, ShiftSlot>(user.weeklyWorkflow, daysOfWeek, 'day')

    return (
      <Table aria-label="Employer Shifts Table" className="my-4">
        <TableHeader columns={daysOfWeek}>
          {(dayElement) => <TableColumn aria-label={dayElement.day} key={dayElement.key} className="text-base text-center">{dayElement.day}</TableColumn>}
        </TableHeader>
        <TableBody items={tableItems}>
          {(item) => (
              <TableRow key={item.key}>
                {item.rowItems.map((shiftElement, index) => (
                  <TableCell height={'100'} key={index}>
                    {shiftElement ? 
                    <article className='flex flex-col gap-2'>
                        <p className='text-base text-center'>{shiftElement.shift}</p>
                        <Button isIconOnly className="bg-transparent w-full">
                        <PencilIcon width={16} height={16} />
                        </Button>
                    </article>
                    :
                    <Button isIconOnly className="bg-transparent w-full">
                    <PlusCircleIcon width={16} height={16} />
                    </Button> 
                      }
                  </TableCell>
                  ))}
              </TableRow>
            )}
        </TableBody>
      </Table>
      );
}
