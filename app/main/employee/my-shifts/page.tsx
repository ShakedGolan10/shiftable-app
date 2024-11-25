'use client'
import { getEmployerWeeklyShifts, getWeeklySchedule } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { Employee } from '@/types/class.service';
import { getThisSunday } from '@/lib/server.utils';
import { useState } from 'react';
import MyShiftsTable from './my-shifts-table';
import { DayOrientedObject } from '@/types/user/types.server';

export default function ShiftsApplyPage() {
  const [forDate, setForDate] = useState<string>(getThisSunday())

  return WithDataWrapper<[DayOrientedObject<{[key: string]: string}>, WeeklyShifts]>({
    dataPromises: [(user: Employee) => getWeeklySchedule(user.employer.id, forDate), (user: Employee) => getEmployerWeeklyShifts(user.employer.id)],
    Component: (props) => <MyShiftsTable {...props} setForDate={setForDate} forDate={forDate}/>, 
    errorMsg: 'Couldnt load weekly schedule',
    loadingMsg: 'Loading weekly schedule...'
  });

}
