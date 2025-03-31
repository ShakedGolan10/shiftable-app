import { daysOfWeek } from '@/lib/server.utils'
import { Employer } from '@/types/class.service'
import { Button, Chip, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, SharedSelection, TimeInput } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export default function RuleOptional({
  user,
  applicationRulesState,
  setApplicationRules,
  onClose
}: {
  user: Employer,
  setApplicationRules: React.Dispatch<React.SetStateAction<ApplicationRules>>,
  applicationRulesState: ApplicationRules
  onClose: () => void
}) {
  const [selectedDay, setSelectedDay] = useState<string>('')
  const [optionalShifts, setOptionalShiftsRule] = useState<OptionalShifts>({...applicationRulesState.optionalShifts})

  const handleDaySelect = async (day: string) => {
      setSelectedDay(day)
    };
  
  const handleShiftSelect = async (shift: string) => {
      setOptionalShiftsRule(prev => ({...prev, shiftsToChoose: {...prev.shiftsToChoose, [selectedDay]: shift}}))
    };
  
    return (
    <ModalContent aria-label="edit-rule-modal-header">
      <ModalHeader className="text-small">
        Set your OpRuleOptional shifts
      </ModalHeader>
      <ModalBody>
      <Select
        items={daysOfWeek}
        aria-label={`Select Day`}
        label={`Select Day`}
        selectionMode="single"
        className="w-full text-xs"
        >
        {(dayObj) => (
              <SelectItem
                onClick={() => handleDaySelect(dayObj.day.toLocaleLowerCase())}    
                className='my-1'
                key={JSON.stringify(dayObj)}
                textValue={dayObj?.day} 
              >
                {dayObj.day}
              </SelectItem>
            )}
      </Select>
      {user.weeklyWorkflow[selectedDay]?.length ? 
      <Select
        items={user.weeklyWorkflow[selectedDay]}
        aria-label={`Select Shift`}
        label={`Select Shift`}
        selectionMode="single"
        className="w-full text-xs"
        >
        {(shiftObj:ShiftSlot) => (
              <SelectItem  
                onClick={()=>handleShiftSelect(shiftObj.shift)}  
                className='my-1'
                key={JSON.stringify(shiftObj)}
                textValue={shiftObj?.shift} 
              >
                {shiftObj.shift}
              </SelectItem>
            )}
      </Select> :
        (selectedDay) && <p>No shifts this day</p>
      }
        <Input 
            placeholder='Enter a number'
            aria-label={`Number input for setting number of shifts to choose from optional`}
            label={`Number of optional shifts to choose`}
            labelPlacement='outside'
            type='number'
            onValueChange={(v)=> setOptionalShiftsRule(prev => ({...prev, minChoices: Number(v)}))}
          >
        </Input>
      {Object.entries(optionalShifts.shiftsToChoose).map(([day, shift], idx) => (
          <Chip size="sm" key={idx} onClose={() => setOptionalShiftsRule(prev => {
            delete prev.shiftsToChoose[day]
            return {...prev}
          })} className="text-tiny h-fit w-fit">
            {`${day}: ${shift}`}
          </Chip>
        ))}
      </ModalBody>
      
      <ModalFooter>
        <Button
          color="success"
          onPress={() => {setApplicationRules(prev => ({ ...prev, optionalShifts })); onClose()}}
        >
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}