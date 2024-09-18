'use client'
import React from 'react';
import ShiftsApplyTable from './shifts_apply_table';
import { useAuth } from '@/providers/UserContextProvider';
import { Employee } from '@/types/class.service';


export default function Page() {

  const { user } = useAuth<Employee>();
  return user && (
    <>
      <ShiftsApplyTable user={user} />
    </>
  );
}