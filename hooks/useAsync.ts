'use client';
import { useSystemActions } from '@/store/actions/system.actions';

interface AsyncOpArgs<T> {
  asyncOperation: () => Promise<T>
  successMsg?: string
  errorMsg?: string
}

export const useAsync = () => {
  const { toggleModalAction, toggleLoaderAction } = useSystemActions()
  
  const executeAsyncFunction = async <T>(args: AsyncOpArgs<T>): Promise<T> => {
    const { asyncOperation, successMsg, errorMsg } = args;
    toggleLoaderAction();
    try {
      const res = await asyncOperation()
      toggleModalAction(successMsg)
      return res
    } catch (error) {
      toggleModalAction(errorMsg, true)
    } finally {
      toggleLoaderAction();
    }
  };

  return [executeAsyncFunction]
};
