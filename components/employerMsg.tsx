'use client'

import React from 'react'
import { useAuth } from './UserContextProvider'

export default function EmployerMsg() {

  const { user } = useAuth()

  return (
    <>
      <h3>Latest messeges from Wolt {/*user.employer.name*/} </h3>
      <article>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolor eligendi quasi similique possimus recusandae rem ad perferendis nostrum soluta!</p>
      </article>
      <article>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolor eligendi quasi similique possimus recusandae rem ad perferendis nostrum soluta!</p>
      </article>
      <article>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolor eligendi quasi similique possimus recusandae rem ad perferendis nostrum soluta!</p>
      </article>
    </>
  )
}
