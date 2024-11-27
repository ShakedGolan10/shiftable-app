import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button } from '@nextui-org/react';
import { Employee } from '@/types/class.service';
import { DayOrientedObject, Shift } from '@/types/user/types.server';
import GeneralTitle from '@/components/helpers/general-title';
import { createTableRows, daysOfWeek, getLastSunday, getNextSunday } from '@/lib/server.utils';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';


interface IMyShiftsTable {
  data: [
    weeklySchedule: DayOrientedObject<{[key: string]: string}>,
    weeklyWorkflow: WeeklyShifts
  ];
  user: Employee
  forDate: string
  setForDate: React.Dispatch<React.SetStateAction<string>>
}


export default function MyShiftsTable({ data, user, setForDate, forDate }: IMyShiftsTable) {
  const [weeklySchedule, weeklyWorkflow] = data
  const tableItems = createTableRows<WeeklyShifts, ShiftSlot>(weeklyWorkflow, daysOfWeek, 'day')
  return (
  <>
      <GeneralTitle title={`Weekly schedule for week ${forDate}`} />
      <div className='flex flex-row gap-5 items-center'>
          <Button onClick={()=> setForDate(getLastSunday(forDate))} isIconOnly className='bg-transparent'>
            <ArrowLeftCircleIcon />
          </Button>
          <p className='text-medium'>{forDate}</p>
          <Button onClick={()=> setForDate(getNextSunday(forDate))} isIconOnly className='bg-transparent'>
            <ArrowRightCircleIcon />
          </Button>
      </div>
      {(weeklySchedule) ? 
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
                      <div className="my-5 mx-1 flex flex-col gap-4">
                        {(weeklySchedule[daysOfWeek[index].day.toLowerCase()][shiftElement.shiftId][user.id]) ? 
                          <Chip size="lg" key={shiftElement.shiftId} style={{backgroundColor: 'lightgreen'}} className="text-base p-5">
                              {weeklySchedule[daysOfWeek[index].day.toLowerCase()][shiftElement.shiftId][user.id]}
                          </Chip> :
                            <p key={shiftElement.shiftId}>No Shifts</p>}
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
    :
    <h1 className='text-subHeader'>No shift schedule for {forDate}</h1>  
    }
  </>
  )
}



