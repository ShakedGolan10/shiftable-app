'use client'
import { getWeeklySchedule } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { Employer } from '@/types/class.service';
import { getThisSunday } from '@/lib/server.utils';
import WorkWeekTable from './work_week_table';
import { useState } from 'react';

export default function ShiftsApplyPage() {
  const [forDate, setForDate] = useState<string>(getThisSunday())

  const WorkWeekTableWithData = WithDataWrapper({
    dataPromise: (user: Employer) => getWeeklySchedule(user.id, forDate),
    Component: (props) => <WorkWeekTable {...props} setForDate={setForDate} forDate={forDate}/>, 
    errorMsg: 'Couldnt load weekly schedule',
    loadingMsg: 'Loading weekly schedule...'
  });

  return <WorkWeekTableWithData />;
}
