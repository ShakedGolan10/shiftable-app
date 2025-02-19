import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { CheckCircleIcon, PencilIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { Employer } from '@/types/class.service';
import RuleEditModal from './rule-edit-modal';
import RuleMandatory from './rule-mandatory';
import RuleMinDays from './rule-min-days';
import RuleCant from './rule-cant';
import RuleOptional from './rule-optional';
import { useAsync } from '@/hooks/useAsync';
import { saveOneField } from '@/services/server-services/db.service';


export default function SetApplicationRules({ user, setIsSaved } : { user: Employer, setIsSaved: Dispatch<SetStateAction<boolean>> }) {
  
  const [applicationRules, setApplicationRules] = useState<ApplicationRules>({...user.applicationRules})
  const [chosenRule, setChosenRule] = useState('')
  const [ exeuteAsyncFunc ] = useAsync()

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
        current: `${formatDaysObject(applicationRules.optionalShifts.shiftsToChoose)} (Must choose at least ${applicationRules.optionalShifts.minChoices})`,
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
            ModalCmpContent={(props)=> <RuleMandatory {...props} applicationRulesState={applicationRules} setApplicationRules={setApplicationRules} />}
            
          />
        );
      case "minDays":
        return (
          <RuleEditModal 
            onClose={()=> setChosenRule('')}
            open={Boolean(chosenRule)}
            user={user}
            ModalCmpContent={(props)=> <RuleMinDays {...props} applicationRulesState={applicationRules} setApplicationRules={setApplicationRules} />}
          />
        );
      case "numOfCant":
        return (
          <RuleEditModal 
          onClose={()=> setChosenRule('')}
          open={Boolean(chosenRule)}
          user={user}
          ModalCmpContent={(props)=> <RuleCant {...props} applicationRulesState={applicationRules} setApplicationRules={setApplicationRules} />}
        />
        );
      case "optionalShifts":
        return (
          <RuleEditModal 
            onClose={()=> setChosenRule('')}
            open={Boolean(chosenRule)}
            user={user}
            ModalCmpContent={(props)=> <RuleOptional {...props} applicationRulesState={applicationRules} setApplicationRules={setApplicationRules} />}
          />
        );
      default:
        return null
    }
  }

  const saveApplicationRules = async () => {
    await exeuteAsyncFunc({
      asyncOps: [() => saveOneField(`users/${user.id}`, 'applicationRules', applicationRules)],
      successMsg: 'Application Rules saved successfuly!',
      errorMsg: 'Wasnt successful please try again later'
    })
    setIsSaved(true)
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
    <Button color='success' onClick={() => saveApplicationRules()}>
        <span>Save Application rules</span>
    </Button> 
    </>
  );
}
