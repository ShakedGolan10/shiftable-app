import React from 'react';
import { Employee } from '@/types/class.service';
import GeneralTitle from '@/components/helpers/general-title';


interface IWorkingWithMe {
  data: [
    { [key: string] : { [key: string]: string } },
    WeeklyShifts
  ];
  user: Employee
  dayName: string
}


export default function WorkingWithMe({ data, user, dayName }: IWorkingWithMe) {
  const [ todaySched , weeklySchedule ] = data
  const todayEmployees = Object.keys(todaySched).reduce((acc, shiftId, shiftIdx) => {
    if (todaySched[shiftId][user.id]) {
      acc.push({
        shift: (weeklySchedule[dayName][shiftIdx] as ShiftSlot).shift,
        employees: Object.values(todaySched[shiftId]).filter(name => name !== user.name),
      });
    }
    return acc
  }, [] as { shift: string; employees: string[] }[]);
  return (
  <>
      <GeneralTitle title={`Who's working with me today ? `} />
      {(todayEmployees.length) ? 
        todayEmployees.map((obj, idx) => 
          <article className='flex flex-col gap-4' key={idx}>
              <p className='text-subHeader font-bold'>Shift: {obj.shift}</p>
              <div className='flex flex-col gap-2'>
              {obj.employees.map(employee => 
                <li className='text-base' key={employee}>{employee}</li>
              )}
              </div>
          </article>

        )
    :
    <h1 className='text-subHeader'>Youre not working today!</h1>  }
  </>
  )
}



