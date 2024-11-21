import { useState } from 'react';

export const useConfirm = () => {

  const [isConfirmModalOpen, setIsModalOpen] = useState(false)
  const [msg, setMsg] = useState('')  
  const [confirmPromise, setConfirmPromise] = useState<{
    resolve: (value: boolean) => void;
    reject: (reason?: any) => void;
  }>(undefined)

  const askConfirmation = (confirmMsg: string): Promise<boolean> => {
    setIsModalOpen(true)
    setMsg(confirmMsg)
    return new Promise((resolve, reject) => {
      setConfirmPromise({ resolve, reject });
    });
  };

  const handleModalClose = (confirmed: boolean) => {
    setIsModalOpen(false)
    if (confirmPromise) {
      confirmPromise.resolve(confirmed)
    }
  };

  return {isConfirmModalOpen, handleModalClose, askConfirmation, msg}
};

