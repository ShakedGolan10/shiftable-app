import { shiftService } from "@/services/server-services/shifts.service";
import ShiftsTable from "./shifts-table";
import { columns, rows } from "./columns_rows";


export default async function page() {
   
    // const shiftsTable = await shiftService.getUserApplicableShifts()
   
 
  return (
    <>
        <ShiftsTable rows={rows} columns={columns} />
    </>
  )
}
