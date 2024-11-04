'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

export default function ErrorElement({ message }: { message: string }) {
  const router = useRouter();

  const handleBackToMain = () => {
    router.push('/main');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-red-50">
      <div className="max-w-md p-6 bg-white shadow-md rounded-lg border border-red-300">
        <h1 className="text-medium font-bold text-red-600 mb-4 text-center">Error Occurred</h1>
        <p className="error-msg text-gray-700 text-center mb-6">{message}</p>
        <Button color="danger" onClick={handleBackToMain} >
          Go Back to Main Page
        </Button>
      </div>
    </div>
  );
}
