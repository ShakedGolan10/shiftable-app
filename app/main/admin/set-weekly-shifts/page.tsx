'use client'
import React, { useEffect, useState } from "react";
import WithDataWrapper from "@/components/helpers/cmp-wrapper";
import { getEmployeesByFilter, getEmployeesShiftsReqs } from "@/services/server-services/employer.service";
import { Employee, Employer } from "@/types/class.service";
import SetShiftsTable from "./set-shifts-table";
import { getDateOfApply } from "@/lib/server.utils";
import { DayOrientedObject, ShiftReqsOOP } from "@/types/user/types.server";
import { getWeeklySchedule } from "@/services/server-services/shifts.service";

export default function SetShiftsPage() {
  const [forDate, setForDate] = useState<string>(null)

    const SetShiftsTableWrapper = WithDataWrapper<[ShiftReqsOOP, DayOrientedObject<{[key: string]: string}>, Employee[]]>({
      dataPromises: [
        (user: Employer) => getEmployeesShiftsReqs(user.id, (forDate) ? forDate : getDateOfApply(user.applicationTime.day, user.applicationTime.time)),
        (user: Employer) => getWeeklySchedule(user.id, (forDate) ? forDate : getDateOfApply(user.applicationTime.day, user.applicationTime.time)),
        (user: Employer) => getEmployeesByFilter({}, user.id)
      ],
      Component: (props) => <SetShiftsTable {...props} forDate={forDate} setForDate={setForDate} />, 
      errorMsg: 'Couldnt load shifts',
      loadingMsg: 'Loading Shifts...'
    });
    return <SetShiftsTableWrapper />
  }
  