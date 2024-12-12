import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { CheckCircleIcon, PencilIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { Employer } from '@/types/class.service';
import RuleEditModal from './rule-edit-modal';
import { useForm } from '@/hooks/useForm';
import RuleMandatory from './rule-mandatory';
import RuleMinDays from './rule-min-days';
import RuleCant from './rule-cant';
import RuleOptional from './rule-optional';


export default function SetApplicationRules({ user }: { user: Employer}) {
  
  const [applicationRules, SetApplicationRules] = useState<ApplicationRules>(user.applicationRules)
  const [chosenRule, setChosenRule] = useState('')
  const [formData, handleFormDataChange, setFields] = useForm(undefined)

  useEffect(()=> {
    console.log({applicationRules})
  },[applicationRules])

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
        current: formatDaysObject(applicationRules.mandatoryShifts),
        name: 'mandatoryShifts'
      });
      rows.push({
        rule: "Minimum Days",
        current: applicationRules.minDays,
        name: 'minDays'
      });
      rows.push({
        rule: "Max number of shifts you can mark as 'cant work'",
        current: applicationRules.numOfCant,
        name: 'numOfCant'
      });
      rows.push({
        rule: `Shifts to choose from, Min # of choices`,
        current: `${formatDaysObject(applicationRules.optionalShifts.shiftsToChoose)}`,
        name: 'optionalShifts'
      });

    return rows as {rule: string, current: any, name: string}[]
  };

  const renderModal = () => {
    switch (chosenRule) {
      case "mandatoryShifts":
        return (
          <RuleEditModal 
            onClose={()=> setChosenRule('')}
            open={Boolean(chosenRule)}
            user={user}
            ModalCmpContent={(props)=> <RuleMandatory {...props} setApplicationRules={SetApplicationRules} />}
            
          />
        );
      case "minDays":
        return (
          <RuleEditModal 
            onClose={()=> setChosenRule('')}
            open={Boolean(chosenRule)}
            user={user}
            ModalCmpContent={(props)=> <RuleMinDays />}
          />
        );
      case "numOfCant":
        return (
          <RuleEditModal 
          onClose={()=> setChosenRule('')}
          open={Boolean(chosenRule)}
          user={user}
          ModalCmpContent={(props)=> <RuleCant />}
        />
        );
      case "optionalShifts":
        return (
          <RuleEditModal 
            onClose={()=> setChosenRule('')}
            open={Boolean(chosenRule)}
            user={user}
            ModalCmpContent={(props)=> <RuleOptional {...props} />}
          />
        );
      default:
        return null
    }
  }



  return (
    <>
    {chosenRule && renderModal()}
    <p className='text-small font-serif'>Shift application rules</p> 
    <Table aria-label="Application Rules Table" className="w-full">
      <TableHeader>
        <TableColumn>Rule</TableColumn>
        <TableColumn>Value</TableColumn>
      </TableHeader>
      <TableBody>
        {generateRows().map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.rule}</TableCell>
            <TableCell className='flex flex-row gap-5 items-center'>
              {(row.current)}
              <Button onClick={()=> setChosenRule(row.name)} isIconOnly className="bg-transparent">
              <PencilIcon width={16} height={16} />
              </Button>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
