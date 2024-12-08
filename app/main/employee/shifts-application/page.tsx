'use client'
import { getEmployerApplicationRules, getEmployerWeeklyShifts } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { ShiftsApplyTable } from '@/lib/employee/shifts-application/shifts-apply-table';
import { Employee } from '@/types/class.service';

export default function ShiftsApplyPage() {
  
  const ShiftsApplyWrapper = WithDataWrapper<[WeeklyShifts, ApplicationRules]>({
    dataPromises: [(user: Employee) => getEmployerWeeklyShifts(user.employer.id), (user: Employee) => getEmployerApplicationRules(user.employer.id)],
    Component: (props) => <ShiftsApplyTable {...props}  />, 
    errorMsg: 'Couldnt load employees applications',
    loadingMsg: 'Loading Shifts requests...'
  });

  return <ShiftsApplyWrapper />

}
