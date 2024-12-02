'use client';
import { useAuth } from '@/providers/UserContextProvider';
import { useSystemActions } from '@/store/actions/system.actions';
import { useAppSelector } from '@/store/store';
import { Employee, Employer } from '@/types/class.service';

interface AsyncOpArgs<T> {
  asyncOperation: () => Promise<T>
  successMsg?: string
  errorMsg?: string
  isLoaderDisabled?: boolean 
}

export const useAsync = () => {
  const { toggleModalAction, toggleLoaderAction } = useSystemActions()
  const isLoading = useAppSelector(state => state.systemReducer.isLoading)
  const auth = useAuth<Employee | Employer>()
  const executeAsyncFunction = async <T>(args: AsyncOpArgs<T>): Promise<T> => {
    const { asyncOperation, successMsg, errorMsg, isLoaderDisabled } = args
    if (!isLoaderDisabled && !isLoading) toggleLoaderAction()
      try {
        const isLoggedIn = await auth.isUserSessionValid()
        if (!isLoggedIn) return 
        const res = await asyncOperation()
        if (successMsg) toggleModalAction(successMsg)
        return res
    } catch (error) {
      toggleModalAction(errorMsg, true)
      throw new Error(error)
    } finally {
      if (!isLoaderDisabled && isLoading) toggleLoaderAction()
    }
  }

  return [ executeAsyncFunction ]
}
