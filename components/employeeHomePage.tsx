'use client'

import { EmailGenerator, Employee } from '@/types/class.service'
import React, { useEffect, useState } from 'react'
import EmployerMsg from './employerMsg'
import { useSystemActions } from '@/store/actions/system.actions'

export default function EmployeeHomePage({ employeeUser }) {
    // Todo: Modal opens if the user has a shift today
    const { toggleModalAction } = useSystemActions()
    const toggleAlertModal = () => {
        toggleModalAction('You have a shift today!')
    }
    let emails = new EmailGenerator('kevin', 'botero', null, 'swap')
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let userShiftToday: Object = null




    return (
        <main className="flex min-h-screen flex-col items-center p-20">
            <span className='text-5xl font-serif mt-10 mb-5'>Hi {employeeUser.name}, how are you today?</span>
            {/* Todo: Design the header of the name */}
            <div className='my-7'>
                <h4 className='text-3xl text-center'>Your next shift:</h4>
                <p className='text-xl my-3 font-semibold text-center'>Sunday - Noon: 15:00-23:00{/* Todo: Design the sift today */}</p>
            </div>
            <h4 className='font-bold text-orange-700'>Remmeber to apply shifts before {daysOfWeek[employeeUser.employer.applicationDay]}!</h4>
            {/* Todo: Design the apply shifts alert */}
            {/* Design a button for checking whos working with you this week ! (nice feacture) */}
            <section className='my-10 h-fit'>
                <EmployerMsg />
            </section>
            <div className='flex flex-col gap-2 my-2'>
                <button className='rounded-md bg-emerald-400 px-3 py-1.5 hover:bg-emerald-600'>Apply Shifts</button>
                <button className='rounded-md bg-teal-400 px-3 py-1.5 hover:bg-teal-600'>Check who's working with you today</button>
                <button className='rounded-md bg-cyan-500 px-3 py-1.5 hover:bg-cyan-700'>My Shifts</button>
                <button onClick={() => toggleAlertModal()} className='open-modal-button flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Toggle Modal</button>
            </div>
            {/* <div className='flex flex-col'>
                {emails.emailList.map((email, idx) => <span key={idx}>{email}</span>)}
            </div> */}
            {/* <div className='modal-container'>
                {isModalOpen && <AlertModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userShiftToday={userShiftToday} />}
            </div> */}
        </main>
    )
}
