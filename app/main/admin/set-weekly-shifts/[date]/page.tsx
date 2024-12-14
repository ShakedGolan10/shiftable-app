'use client'
import React from "react";
import WithDataWrapper from "@/components/helpers/cmp-wrapper";
import { getEmployeesByFilter, getEmployeesShiftsReqs } from "@/services/server-services/employer.service";
import { Employee, Employer } from "@/types/class.service";
import SetShiftsTable from "@/lib/admin/set-weekly-shifts/set-shifts-table";
import { getWeeklySchedule } from "@/services/server-services/shifts.service";
import { useParams } from "next/navigation";

export default function SetShiftsPage() {
  const params = useParams()
  const forDate = decodeURIComponent(params.date as string)
    const SetShiftsTableWrapper = WithDataWrapper<[ShiftReqsOOP, DayOrientedObject<{[key: string]: string}>, Employee[]]>({
      dataPromises: [
        (user: Employer) => getEmployeesShiftsReqs(user.id, forDate),
        (user: Employer) => getWeeklySchedule(user.id, forDate),
        (user: Employer) => getEmployeesByFilter({}, user.id)
      ],
      Component: (props) => <SetShiftsTable {...props} forDate={forDate} />, 
      errorMsg: 'Couldnt load shifts',
      loadingMsg: 'Loading Shifts...'
    });
    return <SetShiftsTableWrapper />
  }
  