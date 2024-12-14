import React from 'react';
import { FaceFrownIcon } from '@heroicons/react/24/outline'; // Importing the icon from @heroicons/react
import { Button } from '@nextui-org/react';

export default function ErrorElement({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-4">
      <h1 className="text-medium font-bold text-red-600 mb-4 text-center">
        Oops... Something went wrong
      </h1>
      <FaceFrownIcon width={100} height={100} />
      
      <h1 className="text-subHeader text-center mb-6">
        We are sorry for the inconvenience. We’re handling this and will return to service shortly.
      </h1>
      
      <Button color="danger" onClick={() => window.location.assign('/main')}>
        Go Back to Main Page
      </Button>
    </div>
  );
}
