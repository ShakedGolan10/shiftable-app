'use client'

import { useForm } from "@/hooks/useForm";
import { updateUserCredentials } from "@/services/server-services/employer.service";
import { Employee } from "@/types/class.service";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import React, { useEffect, useState } from 'react'

export function EmployeeCrudModal({user} : {user: Employee}) {
    
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const [creds, handleCredChange] = useForm({email: user.email, password: ''})
    const [name, setName] = useState(user.name)
    const updateCred = async () => {

    }
    const updateCreds = async () => {
        
        updateUserCredentials(creds.email, creds.password, user.id)
    }
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
                            value={name}
                            className="max-w-xs"
                            onValueChange={(v)=> setName(v)}
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

