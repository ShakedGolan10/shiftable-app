'use client';
import { useAuth } from '@/providers/UserContextProvider';
import { useSystemActions } from '@/store/actions/system.actions';
import { Employee, Employer } from '@/types/class.service';

interface AsyncOpArgs<T extends unknown[]> {
  asyncOps: (() => Promise<T[number]>)[]
  successMsg?: string
  errorMsg?: string
  isLoaderDisabled?: boolean 
}

export const useAsync = () => {

  const { toggleModalAction, toggleLoaderAction } = useSystemActions()
  const auth = useAuth<Employee | Employer>()

  const executeAsyncFunction = async <T extends unknown[]>(args: AsyncOpArgs<T>): Promise<T> => {
    const { asyncOps, successMsg, errorMsg, isLoaderDisabled } = args
    if (!isLoaderDisabled) toggleLoaderAction()
      try {
        const isLoggedIn = await auth.isUserSessionValid()
        if (!isLoggedIn) return 
        const promises = asyncOps.map((func) => func())
        const result = await Promise.all(promises)
        if (successMsg) toggleModalAction(successMsg)
        return result as T
    } catch (error) {
      toggleModalAction(errorMsg, true)
    } finally {
      if (!isLoaderDisabled) toggleLoaderAction()
    }
  }

  return [ executeAsyncFunction ]
}
