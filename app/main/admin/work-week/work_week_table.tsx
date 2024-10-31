import { Employer } from '@/types/class.service'
import { DayOrientedObject } from '@/types/user/types.server'
import React from 'react'


interface IWorWeekTableProps {
  data: DayOrientedObject<{[key: string]: boolean}>
  user: Employer
}
export function WorkWeekTable({ data, user }: IWorWeekTableProps) {
  return (
    <div>WorkWeekTable</div>
  )
}
