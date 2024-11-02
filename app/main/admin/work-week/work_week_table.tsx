import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react';
import { Employer } from '@/types/class.service';
import { DayOrientedObject } from '@/types/user/types.server';
import GeneralTitle from '@/components/helpers/general-title';
import { createTableRows, daysOfWeek } from '@/lib/server.utils';


interface IWorkWeekTableProps {
  data: DayOrientedObject<{[key: string]: boolean}>
  user: Employer
}


export default function WorkWeekTable({ data, user }: IWorkWeekTableProps) {
  const selectedShifts = data
  const tableItems = createTableRows<WeeklyShifts, ShiftSlot>(user.weeklyWorkflow, daysOfWeek)
  
  return (
  <>
      <GeneralTitle title={`Weekly schedule for this week`} />
      <Table aria-label="Employer Shifts Table">
        <TableHeader columns={daysOfWeek}>
          {(dayElement) => <TableColumn aria-label={dayElement.day} key={dayElement.key} className="text-base text-center">{dayElement.day}</TableColumn>}
        </TableHeader>
        <TableBody items={tableItems}>
          {(item) => (
              <TableRow key={item.key}>
                {item.rowItems.map((shiftElement, index) => (
                  <TableCell key={index}>
                  {shiftElement ? 
                    <div className='flex flex-col h-40'>
                      <p className='text-base border-b border-gray-500'>{shiftElement.shift}</p>
                      <div className="my-5 mx-1 flex flex-col gap-4 overflow-y-scroll">
                        {Object.keys(selectedShifts[daysOfWeek[index].day.toLowerCase()][shiftElement.shiftId]).map(name =>
                            <Chip size="lg" key={name} style={{backgroundColor: 'lightgreen'}} className="text-base p-3">
                              {name}
                            </Chip>
                        )}
                      </div>
                    </div>
                      :
                          <p>No Shifts</p>                      
                      }
                  </TableCell>
                  ))}
              </TableRow>
            )}
        </TableBody>
      </Table>
  </>
  )
}



