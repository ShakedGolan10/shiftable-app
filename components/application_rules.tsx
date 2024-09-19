import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

interface RulesState {
  mandatoryShiftsRule: boolean
  minDaysRule: number
  numOfCantRule: number
  optionalShiftsRule: number[]
}
export function RulesTable({ applicationRules, rulesState, applyShifts,  }: { applicationRules: ApplicationRules, 
  rulesState: RulesState, applyShifts: () => Promise<void>,}) {
  
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

  const rows = generateRows()

  const isRulesMet = () => {
    let isOptionalRuleMet = true
    for (let i = 0; i < rulesState.optionalShiftsRule.length; i++)
      if (rulesState.optionalShiftsRule[i] < applicationRules.optionalShifts[i].minChoices) isOptionalRuleMet = false

    if (rulesState.mandatoryShiftsRule && rulesState.minDaysRule >= applicationRules.minDays && isOptionalRuleMet) return false
    else return true
  }


  return (
    <>
    <span className='text-small font-serif'>Shift application rules</span> 
    <Table aria-label="Application Rules Table" className="w-full">
      <TableHeader>
        <TableColumn>Rule</TableColumn>
        <TableColumn>Need</TableColumn>
        <TableColumn>Current</TableColumn>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
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
    <Button color='success' isDisabled={isRulesMet()} onClick={applyShifts}>Click to apply shifts</Button>

    </>
  );
}
