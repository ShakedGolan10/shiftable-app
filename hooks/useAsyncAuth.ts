'use client';
import { useSystemActions } from '@/store/actions/system.actions';

interface AsyncOpArgs<T> {
  asyncOperation: () => Promise<T>
  successMsg?: string
  errorMsg?: string
}

export const useAsyncAuth = () => {
  const { toggleModalAction } = useSystemActions()
  const executeAuthFunction = async <T>(args: AsyncOpArgs<T>): Promise<T> => {
    const { asyncOperation, successMsg, errorMsg } = args
      try {
        const res = await asyncOperation()
        if (successMsg) toggleModalAction(successMsg)
        return res
    } catch (error) {
      toggleModalAction(errorMsg, true)
      throw new Error(error)
    } 
  }

  return [ executeAuthFunction ]
}
