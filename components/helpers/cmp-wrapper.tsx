'use client'
import { useState, useEffect } from 'react';
import LoadingElement from './loading-element';
import ErrorElement from './error-element';

interface WrapperProps<T> {
  dataPromise: () => Promise<T>;
  Component: React.ComponentType<{ data: T }>;
  loadingMsg: string
  errorMsg: string
}

export default function WithDataWrapper<T>({
  dataPromise,
  Component,
  loadingMsg,
  errorMsg,
}: WrapperProps<T>) {
  return function WrappedComponent() {
    const [data, setData] = useState<T>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
      setLoading(true);
      dataPromise()
        .then((result) => {
          console.log({result})
          setData(result);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, [dataPromise]);

    if (loading) {
      return <LoadingElement msg={loadingMsg} />;
    }

    if (error) {
      return <ErrorElement message={errorMsg} />;
    }

    if (data) {
      return <Component data={data} />;
    }

    return null; // In case there's no data, just return null (optional safeguard)
  };
}
