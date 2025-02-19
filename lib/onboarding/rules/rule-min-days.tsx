'use client'
import { Employer } from '@/types/class.service'
import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'

export default function RuleMinDays({
  applicationRulesState,
  setApplicationRules,
  onClose
}: {
  user: Employer,
  setApplicationRules: React.Dispatch<React.SetStateAction<ApplicationRules>>,
  applicationRulesState: ApplicationRules
  onClose: () => void
}) {

  const [minDays, setMinDays] = useState({...applicationRulesState}.minDays)
  return (
    <ModalContent>
                 <ModalHeader className="text-small">Set the minumum days employees will have to mark shift at</ModalHeader>
                 <ModalBody>
                  <Input 
                    placeholder='Enter a number'
                    aria-label={`Number input for setting min days rule`}
                    type='number'
                    onValueChange={(v)=> setMinDays(Number(v))}
                  >
                  </Input>
                 </ModalBody>
                 <ModalFooter>
                 <Button
                          color="success"
                          onPress={() => {setApplicationRules(prev => ({ ...prev, minDays })); onClose()}}
                        >
                          Save
                        </Button>
                 </ModalFooter>
           </ModalContent>
  )
}
