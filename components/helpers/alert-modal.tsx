'use client'

import { useSystemActions } from '@/store/actions/system.actions'
import { useAppSelector } from '@/store/store'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image} from "@nextui-org/react";
import React, { useEffect } from 'react'

export function AlertModal() {
    const { toggleModalAction } = useSystemActions()
    
    const { isModalOpen, modalMsg, isError } = useAppSelector(state => state.systemReducer.modal)
    
    const toggleAlertModal = (ev: Event) => {
        ev.stopPropagation()
        toggleModalAction()
    }

    return ( <>
        <Modal backdrop={'blur'} isOpen={isModalOpen} onClose={toggleModalAction} className="max-h-90vh max-w-70vw overflow-auto rounded-3xl">
           <ModalContent>
             {(onClose) => (
               <>
                 <ModalHeader className="text-small">Attention Please!</ModalHeader>
                 <ModalBody>
                 <h2 className={`text-base font-bold ${isError ? 'text-red-600' : 'text-green-600'}`}>
                      {isError ? `Something didn\'t go right :( \n ${<br />} ${modalMsg}` : modalMsg}
                  </h2>
                 </ModalBody>
                 <ModalFooter>
                   <Button color="danger" variant="light" onPress={() => toggleAlertModal(event)}>
                     close
                   </Button>
                 </ModalFooter>
               </>
             )}
           </ModalContent>
         </Modal>
       </>
    )
}
