'use client'
import { Employer } from '@/types/class.service'
import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'

export default function RuleNumOfCant({
  applicationRulesState,
  setApplicationRules,
  onClose
}: {
  user: Employer,
  setApplicationRules: React.Dispatch<React.SetStateAction<ApplicationRules>>,
  applicationRulesState: ApplicationRules
  onClose: () => void
}) {

  const [numOfCant, setNumOfCant] = useState({...applicationRulesState}.numOfCant)
  return (
    <ModalContent>
                 <ModalHeader className="text-small">Set the max shifts that employees can mark as cant work</ModalHeader>
                 <ModalBody>
                  <Input 
                    placeholder='Enter a number'
                    aria-label={`Number input for setting num of cant rule`}
                    type='number'
                    onValueChange={(v)=> setNumOfCant(Number(v))}
                  >
                  </Input>
                 </ModalBody>
                 <ModalFooter>
                 <Button
                          color="success"
                          onPress={() => {setApplicationRules(prev => ({ ...prev, numOfCant })); onClose()}}
                        >
                          Save
                        </Button>
                 </ModalFooter>
           </ModalContent>
  )
}
