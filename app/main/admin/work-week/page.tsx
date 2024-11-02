'use client'
import { getWeeklySchedule } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { Employer } from '@/types/class.service';
import { getThisSunday } from '@/lib/server.utils';
import WorkWeekTable from './work_week_table';

export default function ShiftsApplyPage() {
  const forDate = getThisSunday() 
  const WorkWeekTableWithData = WithDataWrapper({
    dataPromise: (user: Employer) => getWeeklySchedule(user.id, 'Sun Sep 29 2024'),
    Component: (props) => <WorkWeekTable {...props} />, 
    errorMsg: 'Couldnt load weekly schedule',
    loadingMsg: 'Loading weekly schedule...'
  });

  return <WorkWeekTableWithData />;
}
