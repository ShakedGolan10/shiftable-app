'use client'
import WithDataWrapper from "@/components/helpers/cmp-wrapper";
import { getEmployeesShiftsReqs } from "@/services/server-services/employer.service";
import { Employer } from "@/types/class.service";
import SetShiftsTable from "./set-shifts-table";
import React, { useState } from "react";

export default function SetShiftsPage() {

  const [forDate, setForDate] = useState('Sun Sep 29 2024')
  

    const ShiftsTableWithData = WithDataWrapper({
      dataPromise: (user: Employer) => getEmployeesShiftsReqs(user.id, forDate),
      Component: (props) => <SetShiftsTable {...props} forDate={forDate} setForDate={setForDate} />, 
      errorMsg: 'Couldnt load shifts',
      loadingMsg: 'Loading Shifts...'
    });
  
    return <ShiftsTableWithData />;
  }
  