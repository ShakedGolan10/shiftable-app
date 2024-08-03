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
                 <ModalHeader className="text-2xl">Attention Please!</ModalHeader>
                 <ModalBody>
                 <h2 className={`text-xl font-bold ${isError ? 'text-red-600' : 'text-green-600'}`}>
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


{/* <div onClick={() => { if (isModalOpen) toggleAlertModal(event) }} className={`back-screen ${isModalOpen ? 'fixed opacity-100 z-5' : 'opacity-0'} inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-out duration-300`}></div>

            <div className="fixed flex z-10 inset-0 overflow-y-auto min-h-fit min-w-fit items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${isModalOpen
                    ? 'opacity-100 translate-y-0 sm:scale-100'
                    : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    } ease-out duration-300`}
                ></div> */}
