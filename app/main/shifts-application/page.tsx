import ShiftsTable from "./shifts-table";
import { columns, rows } from "./columns_rows";


export default async function page() {
   
    // const shiftsTable = await shiftService.getUserApplicableShifts()
   
 
  return (
    <>
        <ShiftsTable />
    </>
  )
}
