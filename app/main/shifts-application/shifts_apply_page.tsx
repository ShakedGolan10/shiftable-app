import { getEmployerWeeklyWorkflow } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { ShiftsTable } from './shifts-apply-table';
import { Employee } from '@/types/class.service';

export default function ShiftsApplyPage({ user }: { user: Employee }) {
  
  const ShiftsTableWithData = WithDataWrapper({
    dataPromise: () => getEmployerWeeklyWorkflow(user.employer.id),
    Component: (props) => <ShiftsTable {...props} user={user}  />, 
    errorMsg: 'Couldnt load employees applications',
    loadingMsg: 'Loading Shifts requests...'
  });

  return <ShiftsTableWithData />;
}
