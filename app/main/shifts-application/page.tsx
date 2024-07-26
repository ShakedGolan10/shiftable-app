import { ShiftsApplyTable } from "./shifts_apply_table";
import { columns, rows } from "./columns_rows";


export default async function page() {
   
    // const shiftsTable = await shiftService.getUserApplicableShifts()
   
 
  return (
    <>
        <ShiftsApplyTable />
    </>
  )
}
