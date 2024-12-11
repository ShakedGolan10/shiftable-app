import { Employer } from '@/types/class.service'
import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader, TimeInput } from '@nextui-org/react'
import React from 'react'

export default function RuleMandatory({user}:{user: Employer}) {
  return (
    <ModalContent>
                 <ModalHeader className="text-small">Set your Mandatory shifts</ModalHeader>
                 <ModalBody>
                    <TimeInput />
                 </ModalBody>
                 <ModalFooter>
                    <h4 className='text-base'>
                        Do you approve continue with this action? 
                    </h4>
                    <Button color='danger' onClick={() => console.log(false)}>
                    No
                    </Button>
                    <Button color='success' onClick={() => console.log(true)}>
                    Yes
                    </Button>
                 </ModalFooter>
           </ModalContent>
  )
}
