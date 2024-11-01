import { Employer } from '@/types/class.service'
import { DayOrientedObject } from '@/types/user/types.server'
import React from 'react'


interface IWorkWeekTableProps {
  data: DayOrientedObject<{[key: string]: boolean}>
  user: Employer
}

export function WorkWeekTable({ data, user }: IWorkWeekTableProps) {
  return (
    <div>WorkWeekTable</div>
  )
}
