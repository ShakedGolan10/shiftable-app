'use client'
import WithDataWrapper from "@/components/helpers/cmp-wrapper";
import { getEmployeesShiftsReqs } from "@/services/server-services/employer.service";
import { Employer } from "@/types/class.service";
import SetShiftsTable from "./set-shifts-table";

export default function SetShiftsPage() {

    const ShiftsTableWithData = WithDataWrapper({
      dataPromise: (user: Employer) => getEmployeesShiftsReqs(user.id, 'Sun Sep 29 2024'),
      Component: (props) => <SetShiftsTable {...props} />, 
      errorMsg: 'Couldnt load shifts',
      loadingMsg: 'Loading Shifts...'
    });
  
    return <ShiftsTableWithData />;
  }
  