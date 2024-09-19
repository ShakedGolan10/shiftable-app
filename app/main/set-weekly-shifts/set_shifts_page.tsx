import WithDataWrapper from "@/components/helpers/cmp-wrapper";
import { getNextSunday } from "@/lib/server.utils";
import { getEmployeesShiftsReqs } from "@/services/server-services/employer.service";
import { Employer } from "@/types/class.service";
import SetShiftsTable from "./set-shifts-table";

export default function SetShiftsPage({ user }: { user: Employer }) {
    const forDate = getNextSunday();

    const ShiftsTableWithData = WithDataWrapper({
      dataPromise: () => getEmployeesShiftsReqs(user.id, 'Sun Aug 18 2024'),
      Component: (props) => <SetShiftsTable {...props} user={user}  />, 
      errorMsg: 'Couldnt load shifts',
      loadingMsg: 'Loading Shifts...'
    });
  
    return <ShiftsTableWithData />;
  }
  