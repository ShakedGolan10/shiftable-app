'use client'
import { getEmployerWeeklyShifts } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { ShiftsApplyTable } from './shifts-apply-table';
import { Employee } from '@/types/class.service';

export default function ShiftsApplyPage() {
  
  const ShiftsTableWithData = WithDataWrapper({
    dataPromise: (user: Employee) => getEmployerWeeklyShifts(user.employer.id),
    Component: (props) => <ShiftsApplyTable {...props}  />, 
    errorMsg: 'Couldnt load employees applications',
    loadingMsg: 'Loading Shifts requests...'
  });

  return <ShiftsTableWithData />;
}
