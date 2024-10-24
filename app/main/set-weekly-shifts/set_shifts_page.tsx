import WithDataWrapper from "@/components/helpers/cmp-wrapper";
import { getDateOfApply } from "@/lib/server.utils";
import { getEmployeesShiftsReqs } from "@/services/server-services/employer.service";
import { Employer } from "@/types/class.service";
import SetShiftsTable from "./set-shifts-table";

export default function SetShiftsPage({ user }: { user: Employer }) {
    const forDate = getDateOfApply(user.applicationTime.day, user.applicationTime.time);

    const ShiftsTableWithData = WithDataWrapper({
      dataPromise: () => getEmployeesShiftsReqs(user.id, 'Sun Sep 29 2024'),
      Component: (props) => <SetShiftsTable {...props} user={user} forDate={'Sun Sep 29 2024'}  />, 
      errorMsg: 'Couldnt load shifts',
      loadingMsg: 'Loading Shifts...'
    });
  
    return <ShiftsTableWithData />;
  }
  