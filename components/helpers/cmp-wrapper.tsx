'use client'
import { useState, useEffect } from 'react';
import LoadingElement from './loading-element';
import ErrorElement from './error-element';
import { useAuth } from '@/providers/UserContextProvider';
import { Employee, Employer } from '@/types/class.service';

interface WrapperProps<T extends unknown[]> {
  dataPromises?: ((user: Employee | Employer) => Promise<T[number]>)[]; 
  Component: React.ComponentType<{ user: any; data: T }>
  loadingMsg: string;
  errorMsg: string;
}

export default function WithDataWrapper<T extends unknown[]>({
  dataPromises,
  Component,
  loadingMsg,
  errorMsg,
}: WrapperProps<T>) {
  return function WrappedComponent() {
    const [data, setData] = useState<T>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>(null);
    const { user, isLoadingAuth } = useAuth<Employee | Employer>();
    
    useEffect(() => { 
      if (user) {
      
        if (dataPromises.length) {
          setLoading(true);
          const promises = dataPromises.map((func) => func(user))
          Promise.all(promises)
              .then((result) => {
                setData(result as T);
                setLoading(false);
              })
              .catch((err) => {
                setLoading(false);
                setError(err);
              }) 
            } else setLoading(false)
      }
    }, [user]);

    if (loading && !isLoadingAuth) {
      return <LoadingElement msg={loadingMsg} />;
    }

    if (error) {
      return <ErrorElement message={errorMsg} />;
    }
    
    if (!dataPromises && user || !data && user) {
      return <Component user={user} data={undefined} />;
    }

    if (data && user) {
      return <Component user={user} data={data} />;
    }

  };
}
