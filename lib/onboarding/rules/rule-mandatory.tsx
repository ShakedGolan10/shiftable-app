import { daysOfWeek } from '@/lib/server.utils'
import { Employer } from '@/types/class.service'
import { Button, Chip, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, SharedSelection, TimeInput } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

export default function RuleMandatory({
  user,
  setApplicationRules,
  onClose
}: {
  user: Employer,
  setApplicationRules: React.Dispatch<React.SetStateAction<ApplicationRules>>
  onClose: () => void
}) {
  const [selectedDay, setSelectedDay] = useState<string>('')
  const [mandatoryShifts, setMandatoryShifts] = useState<Days>(user.applicationRules.mandatoryShifts)

  const handleDaySelect = async (keys: SharedSelection) => {
      const selectedDayObj = [...keys].map((key) => JSON.parse(key as string))[0] as {day: string, key: string}
      setSelectedDay(selectedDayObj.day.toLowerCase())
    };
  
  const handleShiftSelect = async (keys: SharedSelection) => {
      const selectedDayObj = [...keys].map((key) => JSON.parse(key as string))[0] as ShiftSlot
      // setSelectedDay(selectedDayObj.day.toLowerCase())
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
        onSelectionChange={(keys) => handleDaySelect(keys)}
        className="w-full text-xs"
        >
        {(dayObj) => (
              <SelectItem    
                className='my-1'
                key={JSON.stringify(dayObj)}
                textValue={dayObj?.day} 
              >
                {dayObj.day}
              </SelectItem>
            )}
      </Select>
      {user.weeklyWorkflow[selectedDay]?.length ? <Select
        items={user.weeklyWorkflow[selectedDay]}
        aria-label={`Select Shift`}
        label={`Select Shift`}
        selectionMode="single"
        onSelectionChange={(keys) => handleShiftSelect(keys)}
        className="w-full text-xs"
        >
        {(shiftObj:ShiftSlot) => (
              <SelectItem    
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
          <Chip size="sm" key={idx} onClose={() => console.log('hi')} className="text-tiny h-fit w-fit">
            {`${day}: ${shift}`}
          </Chip>
        ))}
      </ModalBody>
      
      <ModalFooter>
        <Button
          color="primary"
          onPress={() => {}}
        >
          Add Shift
        </Button>
        <Button
          color="success"
          onPress={() => {setApplicationRules(prev => ({ ...prev })); onClose()}}
        >
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}
