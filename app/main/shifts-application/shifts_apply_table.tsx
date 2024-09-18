import { getEmployerWeeklyWorkflow } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { ShiftsTable } from './shifts-table';
import { Employee } from '@/types/class.service';

export default function ShiftsApplyTable({ user }: { user: Employee }) {
  
  const ShiftsTableWithData = WithDataWrapper({
    dataPromise: () => getEmployerWeeklyWorkflow(user.employer.id),
    Component: (props) => <ShiftsTable {...props} user={user}  />, // Passing user prop
    errorMsg: 'Couldnt load shifts',
    loadingMsg: 'Loading Shifts...'
  });

  return <ShiftsTableWithData />;
}
