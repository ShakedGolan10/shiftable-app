import { getWeeklySchedule } from '@/services/server-services/shifts.service';
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { WorkWeekTable } from './work_week_table';
import { Employee } from '@/types/class.service';

export default function ShiftsApplyPage() {
  
  const WorkWeekTableWithData = WithDataWrapper({
    dataPromise: (user: Employee) => getWeeklySchedule(user.employer.id, 'd'),
    Component: (props) => <WorkWeekTable {...props} />, 
    errorMsg: 'Couldnt load weekly schedule',
    loadingMsg: 'Loading weekly schedule...'
  });

  return <WorkWeekTableWithData />;
}
