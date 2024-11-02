'use client'
import React, { useEffect, useState } from "react";
import WithDataWrapper from "@/components/helpers/cmp-wrapper";
import { getEmployeesByFilter, getEmployeesShiftsReqs } from "@/services/server-services/employer.service";
import { Employer } from "@/types/class.service";
import SetShiftsTable from "./set-shifts-table";

export default function SetShiftsPage() {
  // getDateOfApply(user.applicationTime.day, user.applicationTime.time);

  const [forDate, setForDate] = useState('Sun Sep 29 2024')

    const ShiftsTableWithData = WithDataWrapper({
      dataPromise: (user: Employer) => getEmployeesShiftsReqs(user.id, forDate),
      Component: (props) => <SetShiftsTable {...props} forDate={forDate} setForDate={setForDate} />, 
      errorMsg: 'Couldnt load shifts',
      loadingMsg: 'Loading Shifts...'
    });
  
    return <ShiftsTableWithData />;
  }
  