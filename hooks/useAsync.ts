'use client';
import React, { useEffect, useState } from 'react';
import LoadingElement from '@/components/helpers/loading-element';
import { useSystemActions } from '@/store/actions/system.actions';

interface AsyncOpArgs {
  asyncOperation: (<T>() => Promise<T>); // Array of async functions to execute
  successMsg?: string; // Optional success handler
  errorMsg?: string; // Optional failure handler
}

  export async function WithAsyncWrapper(args: AsyncOpArgs) {
    const { asyncOperation, successMsg, errorMsg } = args;
    const [isLoading, setIsLoading] = useState(false);
    const { toggleModalAction, toggleLoaderAction } = useSystemActions(); // Redux modal actions

        setIsLoading(true);
        try {
          const res = await asyncOperation()
        } catch (error) {
          console.error('Async operation failed:', error);
          toggleModalAction('An error occurred while processing the request.', true); // Show error modal
        } finally {
          setIsLoading(false);
        }
    
}