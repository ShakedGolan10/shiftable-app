'use client'

import { useForm } from "@/hooks/useForm";
import { Employee } from "@/types/class.service";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import React, { useEffect } from 'react'

export function EmployeeCrudModal({user} : {user: Employee}) {
    
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const [name, setName] = useForm(user.name)
    const saveEmployee = () => {
        onClose()
    }
    useEffect(()=>{

    },[user])
    
    return (
        <Modal backdrop={'blur'} isOpen={isOpen} onClose={saveEmployee} className="max-h-90vh max-w-70vw overflow-auto rounded-3xl">
           <ModalContent>
                 <ModalHeader className="text-small">Employee: "{name}"</ModalHeader>
                 <ModalBody>
                        <Input
                            isRequired
                            type="text"
                            variant="faded"
                            description='Press to edit employee name'
                            value={user.name}
                            className="max-w-xs"
                            onValueChange={(v)=> setMsgs(prev => {
                                const updatedMsgs = [...prev];
                                updatedMsgs[index] = v;
                                return updatedMsgs;
                            })}
                />
                 </ModalBody>
                 <ModalFooter>
                   <Button color="danger" variant="light" onPress={saveEmployee}>
                     close
                   </Button>
                 </ModalFooter>
           </ModalContent>
         </Modal>
      
    )
}

