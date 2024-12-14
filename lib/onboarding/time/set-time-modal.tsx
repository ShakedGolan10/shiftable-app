'use client'

import { daysOfWeek } from "@/lib/server.utils";
import { parseAbsoluteToLocal, Time } from "@internationalized/date";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, TimeInput, TimeInputValue, Select, SelectItem} from "@nextui-org/react";
import { log } from "console";
import React, { useState } from 'react'

interface IapplicationTimeModal {
  setTime: (applicationTime: ApplicationTime) => void  
  isOpen: boolean 
  onClose: () => void
}

    

export function ApplicationTimeModal({ isOpen, onClose, setTime } : IapplicationTimeModal) {
    const [applicationTime, setApplicationTime] = useState<ApplicationTime>({day: 0, time: ''});   

    return (
      <>
        <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} className="max-h-90vh max-w-70vw overflow-auto rounded-3xl">
           <ModalContent>
                 <ModalHeader className="text-small">{`Set shift Time`}</ModalHeader>
                 <ModalBody>
                 <Select
                    items={daysOfWeek}
                    aria-label={`Select Day`}
                    label={`Select Day`}
                    selectionMode="single"
                    className="w-full text-xs"
                    isRequired 
                    >
                    {(dayObj) => (
                        <SelectItem
                            onClick={() => setApplicationTime(prev => ({...prev, day: Number(dayObj.key)}))}    
                            className='my-1'
                            key={JSON.stringify(dayObj)}
                            textValue={dayObj?.day} 
                        >
                            {dayObj.day}
                        </SelectItem>
                        )}
                </Select>
                <TimeInput 
                    onChange={(timeValue) => setApplicationTime(prev => ({...prev, time: `${String(timeValue.hour).padStart(2, '0')}:${String(timeValue.minute).padStart(2, '0')}`}))}
                    label="Select application time"
                    hourCycle={24}
                    labelPlacement="outside"
                    isRequired
                />

                 </ModalBody>
                 <ModalFooter>
                   <Button isDisabled={(applicationTime.day && applicationTime.time) ? false : true} color="success" variant="light" onPress={() => {setTime(applicationTime); onClose()}}>
                     Save
                   </Button>
                 </ModalFooter>
           </ModalContent>
         </Modal>
      </>
    )
}

