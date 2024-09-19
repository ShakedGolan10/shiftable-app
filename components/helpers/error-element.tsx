'use client'

import React from 'react'

export default function ErrorElement({message}:{message: string}) {
  return (
    <div>
        <p className="error-msg">{ message }</p>
    </div>
  )
}
