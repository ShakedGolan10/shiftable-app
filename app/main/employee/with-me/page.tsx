'use client'
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { Employee } from '@/types/class.service';
import { getThisSunday } from '@/lib/server.utils';
import WorkingWithMe from './working-with-me';
import { getEmployerWeeklyShifts, getTodaySchedule } from '@/services/server-services/shifts.service';

export default function WorkingWithMePage() {

    const forDate = getThisSunday()
    const today = new Date();
    const dayName = (today.toLocaleDateString('en-US', { weekday: 'long' })).toLowerCase()

  const WorkingWithMeWrapper = WithDataWrapper<[{ [key: string] : { [key: string]: string } }, WeeklyShifts]>({
    dataPromises: [(user: Employee) => getTodaySchedule(user.employer.id, 'Sun Dec 01 2024', 'friday'), (user: Employee) => getEmployerWeeklyShifts(user.employer.id)],
    Component: (props) => <WorkingWithMe {...props} dayName={'friday'} />, 
    errorMsg: 'Couldnt load data',
    loadingMsg: 'Loading data...'
  });

  return <WorkingWithMeWrapper />
}
