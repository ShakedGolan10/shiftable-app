import React from 'react'
import Carousel from './carousel'
import { Employee } from '@/types/class.service'

export default function EmployerMsg({ employee }: { employee: Employee }) {

  return (
    <>
      <h3 className='text-center text-small underline'>Latest messeges from {employee.employer.name} </h3>
      <section className='w-[100%] m-auto pt-11'>
        <Carousel slides={employee.employer.employerMsg} />
      </section>
    </>
  )
}

