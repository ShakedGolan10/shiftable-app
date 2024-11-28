'use client'
import WithDataWrapper from '@/components/helpers/cmp-wrapper';
import { Employee, Employer } from '@/types/class.service';
import { getEmployeesByFilter } from '@/services/server-services/employer.service';
import ManageEmployeesPage from './manage-employees';

export default function ShiftsApplyPage() {
  const ManageEmployees = WithDataWrapper<[Employee[]]>({
    dataPromises: [(user: Employer) => getEmployeesByFilter({}, user.id)],
    Component: (props) => <ManageEmployeesPage {...props} />, 
    errorMsg: 'Couldnt load employees',
    loadingMsg: 'Loading employees...'
  });

  return <ManageEmployees />;
}
