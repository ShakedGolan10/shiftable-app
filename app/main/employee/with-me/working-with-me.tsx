import React from 'react';
import { Employee } from '@/types/class.service';
import GeneralTitle from '@/components/helpers/general-title';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

interface IWorkingWithMe {
  data: [
    { [key: string]: { [key: string]: string } },
    WeeklyShifts
  ];
  user: Employee;
  dayName: string;
}

export default function WorkingWithMe({ data, user, dayName }: IWorkingWithMe) {
  const [todaySched, weeklySchedule] = data;

  const todayEmployees = Object.keys(todaySched).reduce((acc, shiftId, shiftIdx) => {
    if (todaySched[shiftId][user.id]) {
      acc.push({
        shift: (weeklySchedule[dayName][shiftIdx] as ShiftSlot).shift,
        employees: Object.values(todaySched[shiftId]).filter(name => name !== user.name),
      });
    }
    return acc;
  }, [] as { shift: string; employees: string[] }[]);

  return (
    <>
      <GeneralTitle title={`Who's working with me today?`} />
      <GeneralTitle title={dayName} />
      {todayEmployees.length ? (
        <Table aria-label="Employer Shifts Table">
          <TableHeader columns={[{name: 'Shift', idx: 0}, {name: 'Employees', idx: 1}]}>
            {(column) => (
              <TableColumn key={column.idx} className="text-base text-center">
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={todayEmployees}>
            {todayEmployees.map((employeeObj, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <p className='text-center'>{employeeObj.shift}</p>
                </TableCell>
                <TableCell>
                  {employeeObj.employees.map((employee, index) => (
                    <p className='text-center'key={index}>{employee}</p>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <h1 className="text-subHeader">You're not working today!</h1>
      )}
    </>
  );
}
