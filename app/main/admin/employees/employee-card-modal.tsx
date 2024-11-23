'use client'

import ConfirmationModal from "@/components/helpers/confirm-modal";
import { useAsync } from "@/hooks/useAsync";
import { useConfirm } from "@/hooks/useConfirm";
import { useForm } from "@/hooks/useForm";
import { updateUserCredentials, updateUserData } from "@/services/admin.service";
import { Employee } from "@/types/class.service";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import React, { useEffect, useState } from 'react'

export function EmployeeCardModal({user, isOpen, onClose} : {user: Employee, isOpen: boolean, onClose: () => void}) {
    

    const [creds, handleCredChange] = useForm({email: user.email, password: ''})
    const [name, setName] = useState(user.name)
    const [ executeAsyncFunc ] = useAsync()

    const { askConfirmation, handleModalClose, isConfirmModalOpen, msg } = useConfirm()

    const updateCreds = async () => {
      await executeAsyncFunc({
        asyncOperation: () => updateUserCredentials({ userId: user.id, newCreds: {email: (user.email !== creds.email) &&  creds.email, password: creds.password}}),
        errorMsg: 'Couldnt save new credentials please try again later...',
        successMsg: 'Saved new creds has been successful'
      })
    }

    const updateUserName = async () => {
      await executeAsyncFunc({
        asyncOperation: () => updateUserData(user.id, name),
        errorMsg: 'Couldnt save new name please try again later...',
        successMsg: 'Saved new name has been successful'
      })
    }

    const saveEmployee = async () => {
        const isApproved = await askConfirmation(`Youre about to change Employee's private information`)
        if (isApproved) {
          await updateCreds()
          await updateUserName()
          onClose()
        }
    }
  
    useEffect(()=>{

    },[user])
    
    return (
      <>
        <ConfirmationModal message={msg} onClose={handleModalClose} open={isConfirmModalOpen} />
        <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} className="max-h-90vh max-w-70vw overflow-auto rounded-3xl">
           <ModalContent>
                 <ModalHeader className="text-small">Employee: "{user.name}"</ModalHeader>
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
                        <Input
                            isRequired
                            type="text"
                            variant="faded"
                            description='Press to edit employee Email'
                            value={creds.email}
                            className="max-w-xs"
                            name="email"
                            onChange={handleCredChange}
                />
                        <Input
                            isRequired
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
                   <Button color="success" variant="light" onPress={saveEmployee}>
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

