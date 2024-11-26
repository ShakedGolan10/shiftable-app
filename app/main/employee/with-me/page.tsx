'use client'
import { getEmployerWeeklyShifts, getWeeklySchedule } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { Employee } from '@/types/class.service';
import { getThisSunday } from '@/lib/server.utils';
import { useState } from 'react';
import { DayOrientedObject } from '@/types/user/types.server';
import WorkingWithMe from './working-with-me';

export default function ShiftsApplyPage() {
  const [forDate, setForDate] = useState<string>(getThisSunday())

  const MyShiftsWrraper = WithDataWrapper<[DayOrientedObject<{[key: string]: string}>, WeeklyShifts]>({
    dataPromises: [(user: Employee) => getWeeklySchedule(user.employer.id, forDate), (user: Employee) => getEmployerWeeklyShifts(user.employer.id)],
    Component: (props) => <WorkingWithMe {...props} setForDate={setForDate} forDate={forDate}/>, 
    errorMsg: 'Couldnt load weekly schedule',
    loadingMsg: 'Loading weekly schedule...'
  });

  return <MyShiftsWrraper />
}
