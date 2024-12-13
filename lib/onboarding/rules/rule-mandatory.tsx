import { daysOfWeek } from '@/lib/server.utils'
import { Employer } from '@/types/class.service'
import { Button, Chip, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, SharedSelection, TimeInput } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export default function RuleMandatory({
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
  const [mandatoryShifts, setMandatoryShifts] = useState<Days>({...applicationRulesState.mandatoryShifts})

  const handleDaySelect = async (day: string) => {
      // const selectedDayObj = [...keys].map((key) => JSON.parse(key as string))[0] as {day: string, key: string}
      setSelectedDay(day)
    };
  
  const handleShiftSelect = async (shift: string) => {
      setMandatoryShifts(prev => ({...prev, [selectedDay]: shift}))
    };
  
    return (
    <ModalContent aria-label="edit-rule-modal-header">
      <ModalHeader className="text-small">
        Set your Mandatory shifts
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
      {Object.entries(mandatoryShifts).map(([day, shift], idx) => (
          <Chip size="sm" key={idx} onClose={() => setMandatoryShifts(prev => {
            delete prev[day]
            return {...prev}
          })} className="text-tiny h-fit w-fit">
            {`${day}: ${shift}`}
          </Chip>
        ))}
      </ModalBody>
      
      <ModalFooter>
        <Button
          color="success"
          onPress={() => {setApplicationRules(prev => ({ ...prev, mandatoryShifts })); onClose()}}
        >
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}
