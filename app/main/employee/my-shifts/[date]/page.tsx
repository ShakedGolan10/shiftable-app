'use client'
import { getEmployerWeeklyShifts, getWeeklySchedule } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { Employee } from '@/types/class.service';
import MyShiftsTable from '@/lib/employee/my-shifts/my-shifts-table';
import { useParams } from 'next/navigation';

export default function MyShiftsPage() {
  
  const params = useParams()
  const forDate = decodeURIComponent(params.date as string)

  const MyShiftsWrraper = WithDataWrapper<[DayOrientedObject<{[key: string]: string}>, WeeklyShifts]>({
    dataPromises: [(user: Employee) => getWeeklySchedule(user.employer.id, forDate), (user: Employee) => getEmployerWeeklyShifts(user.employer.id)],
    Component: (props) => <MyShiftsTable {...props} forDate={forDate}/>, 
    errorMsg: 'Couldnt load weekly schedule',
    loadingMsg: 'Loading weekly schedule...'
  });

  return <MyShiftsWrraper />
}
