import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

interface RulesState {
  mandatoryShiftsRule: boolean
  minDaysRule: number
  numOfCantRule: number
  optionalShiftsRule: number[]
}
export function ApplicationRules({ applicationRules, rulesState }: { applicationRules: ApplicationRules, rulesState: RulesState }) {
  
  const formatDaysObject = (days: Days): string => {
    const capitalizeFirstLetter =(string: string): string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return Object.entries(days)
      .map(([day, time]) => `${capitalizeFirstLetter(day)}: ${time}`)
      .join(' \n ');
  }
  const generateRows = () => {
    const rows = [];
    rows.push({
      rule: "Mandatory Shifts",
      need: formatDaysObject(applicationRules.mandatoryShifts),
      current: JSON.stringify(rulesState.mandatoryShiftsRule),
    });
    rows.push({
      rule: "Minimum Days",
      need: applicationRules.minDays,
      current: rulesState.minDaysRule,
    });
    rows.push({
      rule: "Number of Can't Do Shifts",
      need: applicationRules.numOfCant,
      current: rulesState.numOfCantRule,
    });
    applicationRules.optionalShifts.forEach((optionalShift, index) => {
      rows.push({
        rule: formatDaysObject(optionalShift.shiftsToChoose),
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
            <TableCell>{row.current}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
