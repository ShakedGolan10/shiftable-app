import { Modal, Button, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { FC } from 'react';

type ConfirmationModalProps = {
  open: boolean;
  onClose: (confirm: boolean) => void;
  message: string;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({ open, onClose, message }) => {

    return ( 
        <Modal backdrop={'blur'} isOpen={open} onClose={() => onClose(false)} className="z-[1000000000000] max-h-90vh max-w-70vw overflow-auto rounded-3xl">
           <ModalContent>
                 <ModalHeader className="text-small">Attention Please!</ModalHeader>
                 <ModalBody>
                 <p className='text-medium font-bold'>
                 {message}
                  </p>
                 </ModalBody>
                 <ModalFooter>
                    <p className='text-base'>
                        Do you approve continue with this action? 
                    </p>
                    <Button color='danger' onClick={() => onClose(false)}>
                    No
                    </Button>
                    <Button color='success' onClick={() => onClose(true)}>
                    Yes
                    </Button>
                 </ModalFooter>
           </ModalContent>
         </Modal>
    )
};

export default ConfirmationModal;
