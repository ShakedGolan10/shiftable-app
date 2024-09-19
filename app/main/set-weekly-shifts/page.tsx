'use client'
import React from 'react';
import { useAuth } from '@/providers/UserContextProvider';
import SetShiftsPage from './set_shifts_page';
import { Employer } from '@/types/class.service';


export default function Page() {

  const { user } = useAuth<Employer>();
  return user && (
    <>
      <SetShiftsPage user={user} />
    </>
  );
}