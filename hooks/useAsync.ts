'use client';
import { useSystemActions } from '@/store/actions/system.actions';

interface AsyncOpArgs<T> {
  asyncOperation: () => Promise<T>
  successMsg?: string
  errorMsg?: string
  isLoaderDisabled?: boolean 
}

export const useAsync = () => {
  const { toggleModalAction, toggleLoaderAction } = useSystemActions()
  
  const executeAsyncFunction = async <T>(args: AsyncOpArgs<T>): Promise<T> => {
    const { asyncOperation, successMsg, errorMsg, isLoaderDisabled } = args;
    if (!isLoaderDisabled) toggleLoaderAction();
    try {
      const res = await asyncOperation()
      if (successMsg) toggleModalAction(successMsg)
      return res
    } catch (error) {
      toggleModalAction(errorMsg, true)
      throw new Error(error)
    } finally {
      if (!isLoaderDisabled) toggleLoaderAction();
    }
  };

  return [executeAsyncFunction]
};
