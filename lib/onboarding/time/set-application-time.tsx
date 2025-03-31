'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PencilIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { Employer } from '@/types/class.service';
import { useAsync } from '@/hooks/useAsync';
import { saveOneField } from '@/services/server-services/db.service';
import { ApplicationTimeModal } from './set-time-modal';
import { Button, useDisclosure } from '@nextui-org/react';
import { daysOfWeek } from '@/lib/server.utils';


export default function SetApplicationRules({ user, setIsSaved } : { user: Employer, setIsSaved: Dispatch<SetStateAction<boolean>> }) {
  
  const [applicationTime, setApplicationTime] = useState<ApplicationTime>({...user.applicationTime})
  const [ exeuteAsyncFunc ] = useAsync()
  const {isOpen, onOpen, onClose} = useDisclosure();

  const saveApplicationTime = async () => {
    await exeuteAsyncFunc({
      asyncOps: [() => saveOneField(`users/${user.id}`, 'applicationTime', applicationTime)],
      successMsg: 'Application Time saved successfuly!',
      errorMsg: 'Wasnt successful please try again later'
    })
    setIsSaved(true)
  }



  return (
    <>
    {isOpen && <ApplicationTimeModal isOpen={isOpen} onClose={onClose} setTime={(appTime) => setApplicationTime(appTime)} />}
      <span className='text-small font-bold'> Your current application time: </span>
      <article className='flex flex-col gap-2'>
          <p>{daysOfWeek[applicationTime.day].day}</p>
          <p>{applicationTime.time}</p>
      </article>
    <Button className="bg-transparent" onClick={() => onOpen()}>
            <PencilIcon width={50} height={50} />
            <span className='font-semibold w-28 text-left'>Edit Application time</span>
        </Button> 
    <Button color='success' onClick={() => saveApplicationTime()}>
        <span>Save Application time</span>
    </Button> 
    </>
  );
}
