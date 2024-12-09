'use client'

import { parseAbsoluteToLocal, Time } from "@internationalized/date";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, TimeInput, TimeInputValue} from "@nextui-org/react";
import { log } from "console";
import React, { useState } from 'react'

interface ITimeInputModal {
  setTime: (startTime: TimeInputValue, endTime: TimeInputValue) => void  
  isOpen: boolean 
  onClose: () => void
  shiftSlot?: ShiftSlot
}

const extractTimes = (str:string) => str.split("-").map(time => time.split(":").map(num => Number(String(num).padStart(2, '0'))));
    

export function TimeInputModal({ isOpen, onClose, setTime, shiftSlot } : ITimeInputModal) {
    const [value, setValue] = useState<{startTime: TimeInputValue, endTime: TimeInputValue}>(
        {
            startTime: (shiftSlot) ? new Time(...extractTimes(shiftSlot.shift)[0]) : new Time(12,0), 
            endTime: (shiftSlot) ? new Time(...extractTimes(shiftSlot.shift)[1]) : new Time(18,0)
        }
    );   
    
    return (
      <>
        <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} className="max-h-90vh max-w-70vw overflow-auto rounded-3xl">
           <ModalContent>
                 <ModalHeader className="text-small">{`Set shift Time`}</ModalHeader>
                 <ModalBody>
             
                <TimeInput 
                    value={value.startTime} 
                    name="startTime"
                    onChange={(timeValue) => setValue(prev => ({...prev, startTime: timeValue}))}
                    description="From"
                    label="Start Time"
                    hourCycle={24}
                    labelPlacement="outside"
                />
                <TimeInput 
                    value={value.endTime} 
                    name="endTime"
                    onChange={(timeValue) => setValue(prev => ({...prev, endTime: timeValue}))}
                    description="To"
                    label="End Time"
                    hourCycle={24}
                    labelPlacement="outside"
                />

                 </ModalBody>
                 <ModalFooter>
                   <Button color="success" variant="light" onPress={() => setTime(value.startTime, value.endTime)}>
                     Save
                   </Button>
                   <Button color="danger" variant="light" onPress={onClose}>
                     close
                   </Button>
                 </ModalFooter>
           </ModalContent>
         </Modal>
      </>
    )
}

