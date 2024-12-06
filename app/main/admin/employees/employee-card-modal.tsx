'use client'

import { useForm } from "@/hooks/useForm";
import { Employee } from "@/types/class.service";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import React, { useEffect } from 'react'

interface IEmployeeCardProps {
  user: Employee 
  saveEmployee: (employeeId: string, name: string, email: string, password: string) => void  
  isOpen: boolean 
  onClose: () => void
}

export function EmployeeCardModal({user, isOpen, onClose, saveEmployee} : IEmployeeCardProps) {
    
    const [creds, handleCredChange, setFields] = useForm({email: (user) ? user.email : 'example@example.com', password: '', name: (user) ? user.name: ''})
    
    useEffect(()=>{
      setFields({email: (user) ? user.email : 'example@example.com', password: '', name: (user) ? user.name: ''})
    },[isOpen])
    
    return (
      <>
        <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} className="max-h-90vh max-w-70vw overflow-auto rounded-3xl">
           <ModalContent>
                 <ModalHeader className="text-small">{user ? `Employee: ${user.name}` : `Create new Employee`}</ModalHeader>
                 <ModalBody>
                        <Input
                            type="text"
                            name="name"
                            variant="faded"
                            description={user ? 'Press to edit employee name' : 'Define new employee Name'}                            
                            value={creds.name}
                            className="max-w-xs"
                            onChange={handleCredChange}
                />
                        <Input
                            type="text"
                            variant="faded"
                            description={user ? 'Press to edit employee Email' : 'Define new employee Email' }
                            value={creds.email}
                            className="max-w-xs"
                            name="email"
                            onChange={handleCredChange}
                />
                        <Input
                            type="password"
                            name="password"
                            variant="faded"
                            description='Press to define new password'
                            value={creds.password}
                            className="max-w-xs"
                            onChange={handleCredChange}
                />
                 </ModalBody>
                 <ModalFooter>
                   <Button color="success" variant="light" onPress={() => saveEmployee((user) ? user.id : undefined, creds.name, creds.email, creds.password)}>
                     {(user) ? 'Save' : 'Create'}
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

