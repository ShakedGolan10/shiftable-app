'use client'

import React from 'react'
import { useAuth } from './UserContextProvider'
import Carousel from './carousel'

export default function EmployerMsg() {

  const { user } = useAuth()
  console.log(user.employer.employerMsg)
  return (
    <>
      <h3 className='text-center text-2xl underline'>Latest messeges from Wolt {/*user.employer.name*/} </h3>
      <section className='w-[100%] m-auto pt-11'>
      <Carousel slides={user.employer.employerMsg} />
      </section>
    </>
  )
}

// <section className='flex flex-col-reverse h-96 border p-4 overflow-hidden'>
//         <div className='flex flex-col animate-scrollMsg'>
//           {/* Install Swiper - swipe library I can use to swipe between msgs */}
          
//           {user.employer.employerMsg.map((message: String, index: number) => (
//             <article key={index} className="p-2 border mb-2">
//               {message}
//             </article>
//           ))}
//         </div>
//       </section>
