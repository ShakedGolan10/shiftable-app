import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

interface RulesState {
  mandatoryShiftsRule: boolean
  minDaysRule: number
  numOfCantRule: number
  optionalShiftsRule: number[]
}
export function RulesTable({ applicationRules, rulesState }: { applicationRules: ApplicationRules, rulesState: RulesState }) {
  
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
      need: formatDaysObject(applicationRules.mandatoryShifts),
      current: rulesState.mandatoryShiftsRule
    });
    rows.push({
      rule: "Minimum Days",
      need: applicationRules.minDays,
      current: rulesState.minDaysRule,
    });
    rows.push({
      rule: "Max number of shifts you can mark as 'cant work'",
      need: applicationRules.numOfCant,
      current: rulesState.numOfCantRule,
    });
    applicationRules.optionalShifts.forEach((optionalShift, index) => {
      rows.push({
        rule: `Shifts to choose from: ${formatDaysObject(optionalShift.shiftsToChoose)}`,
        need: optionalShift.minChoices,
        current: rulesState.optionalShiftsRule[index]
      });
    });

    return rows;
  };

  return (
    <>
    <span className='text-2xl font-serif mt-10 mb-5 '>Shift application rules</span> 
    <Table aria-label="Application Rules Table" className="w-full">
      <TableHeader>
        <TableColumn>Rule</TableColumn>
        <TableColumn>Need</TableColumn>
        <TableColumn>Current</TableColumn>
      </TableHeader>
      <TableBody>
        {generateRows().map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.rule}</TableCell>
            <TableCell>{row.need}</TableCell>
            <TableCell>{(row.current === true || row.current >= row.need) ? 
              <CheckCircleIcon className='h-5 w-5' color='green' /> : (typeof row.current === 'boolean' ? 
              <XCircleIcon color='red' className='h-5 w-5' /> : row.current )}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
