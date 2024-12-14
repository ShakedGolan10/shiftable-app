'use client'
import { getWeeklySchedule } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { Employer } from '@/types/class.service';
import WorkWeekTable from '@/lib/admin/work-week/work_week_table';
import { useParams } from 'next/navigation';

export default function WorkWeekPage() {
  const params = useParams()
  const forDate = decodeURIComponent(params.date as string)

  const WorkWeekWrapper = WithDataWrapper<[DayOrientedObject<{[key: string]: string}>]>({
    dataPromises: [(user: Employer) => getWeeklySchedule(user.id, forDate)],
    Component: (props) => <WorkWeekTable {...props} forDate={forDate} />, 
    errorMsg: 'Couldnt load weekly schedule',
    loadingMsg: 'Loading weekly schedule...'
  });

  return <WorkWeekWrapper />
}
