import React, { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { Employer } from '@/types/class.service';


export default function SetApplicationRules({ user }: { user: Employer}) {
  
  const [applicationRules, SetApplicationRules] = useState<ApplicationRules>(user.applicationRules)

  const formatDaysObject = (days: Days): string => {
    const capitalizeFirstLetter = (string: string): string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  
    return Object.entries(days)
      .map(([day, time]) => `${capitalizeFirstLetter(day)}: ${time}`)
      .join(', ');
  }
  const generateRows = () => {
    const rows = [];
    rows.push({
      rule: "Mandatory Shifts",
      current: applicationRules.mandatoryShifts
    });
    rows.push({
      rule: "Minimum Days",
      current: applicationRules.minDays,
    });
    rows.push({
      rule: "Max number of shifts you can mark as 'cant work'",
      current: applicationRules.numOfCant,
    });
    applicationRules.optionalShifts.forEach((optionalShift, index) => {
      rows.push({
        rule: `Shifts to choose from: ${formatDaysObject(optionalShift.shiftsToChoose)}`,
        current: applicationRules.optionalShifts[index]
      });
    });

    return rows as {rule: string, current: any}[]
  };

  const rows = generateRows()


  return (
    <>
    <p className='text-small font-serif'>Shift application rules</p> 
    <Table aria-label="Application Rules Table" className="w-full">
      <TableHeader>
        <TableColumn>Rule</TableColumn>
        <TableColumn>Value</TableColumn>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.rule}</TableCell>
            <TableCell>{JSON.stringify(row.current)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
