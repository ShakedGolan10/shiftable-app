import { Employer } from '@/types/class.service';
import { Modal } from '@nextui-org/react';
import React from 'react';

type ConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  user: Employer
  ModalCmpContent: React.ComponentType<{ user: Employer, onClose: () => void }>
};

export default function RuleEditModal({ open, onClose, ModalCmpContent, user }: ConfirmationModalProps) {

    return (
        <Modal aria-label='Edit Rule modal' backdrop={'blur'} isOpen={open} onClose={() => onClose()} className="max-h-90vh max-w-70vw overflow-auto rounded-3xl">
            <ModalCmpContent onClose={onClose} user={user} />
        </Modal>
    )
};

