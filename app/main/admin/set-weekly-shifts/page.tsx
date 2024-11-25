'use client'
import React, { useEffect, useState } from "react";
import WithDataWrapper from "@/components/helpers/cmp-wrapper";
import { getEmployeesByFilter, getEmployeesShiftsReqs } from "@/services/server-services/employer.service";
import { Employer } from "@/types/class.service";
import SetShiftsTable from "./set-shifts-table";
import { getDateOfApply } from "@/lib/server.utils";
import { ShiftReqsOOP } from "@/types/user/types.server";

export default function SetShiftsPage() {
  const [forDate, setForDate] = useState<string>(null)

    return WithDataWrapper<[ShiftReqsOOP]>({
      dataPromises: [(user: Employer) => getEmployeesShiftsReqs(user.id, (forDate) ? forDate : getDateOfApply(user.applicationTime.day, user.applicationTime.time))],
      Component: (props) => <SetShiftsTable {...props} forDate={forDate} setForDate={setForDate} />, 
      errorMsg: 'Couldnt load shifts',
      loadingMsg: 'Loading Shifts...'
    });
  
  }
  