'use client'
import { getEmployeeWeeklySchedule } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { Employee } from '@/types/class.service';
import { getThisSunday } from '@/lib/server.utils';
import { useState } from 'react';
import MyShiftsTable from './my-shifts-table';

export default function ShiftsApplyPage() {
  const [forDate, setForDate] = useState<string>(getThisSunday())

  const MyShiftsTableWithData = WithDataWrapper({
    dataPromise: (user: Employee) => getEmployeeWeeklySchedule(user.employer.id, forDate),
    Component: (props) => <MyShiftsTable {...props} setForDate={setForDate} forDate={forDate}/>, 
    errorMsg: 'Couldnt load weekly schedule',
    loadingMsg: 'Loading weekly schedule...'
  });

  return <MyShiftsTableWithData />;
}
