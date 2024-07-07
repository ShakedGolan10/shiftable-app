import { shiftService } from "@/services/server-services/shifts.service";
import ShiftsTable from "./shifts-table";

// import { rows } from './rows';
// import { columns } from './columns';

export default async function page() {
   
    const shiftsTable = await shiftService.getUserApplicableShifts()
    // console.log(shiftsTable)
      const rows =  [
        {
          key: "1",
          name: "Tony Reichert",
          role: "CEO",
          status: "Active",
        },
        {
          key: "2",
          name: "Zoey Lang",
          role: "Technical Lead",
          status: "Paused",
        },
        {
          key: "3",
          name: "Jane Fisher",
          role: "Senior Developer",
          status: "Active",
        },
        {
          key: "4",
          name: "William Howard",
          role: "Community Manager",
          status: "Vacation",
        },
      ];

      const columns = [
        {
          key: "name",
          label: "NAME",
        },
        {
          key: "role",
          label: "ROLE",
        },
        {
          key: "status",
          label: "STATUS",
        },
      ];
      
 
  return (
    <>
        <ShiftsTable rows={rows} columns={columns} />
    </>
  )
}
