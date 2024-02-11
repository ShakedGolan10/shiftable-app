'use client'

import { useSystemActions } from '@/store/actions/system.actions'
import { toggleModal } from '@/store/reducers/system.reducer'
import { AppDispatch, useAppSelector } from '@/store/store'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export function AlertModal() {
    // Todo: Change it to Store - It has been decided with chatgpt and thoughts on pereformance
    const { toggleModalAction } = useSystemActions()
    const { isModalOpen, modalMsg } = useAppSelector(state => state.systemReducer.modal)
    const toggleAlertModal = (ev: Event) => {
        ev.stopPropagation()
        toggleModalAction()
    }

    // Todo: make this use Effect work
    useEffect(() => {
        console.log(isModalOpen, modalMsg)
        // if (userShiftToday) setIsModalOpen(true)
    }, [])

    return isModalOpen && (
        <section className='alert-modal '>

            <div onClick={() => { if (isModalOpen) toggleAlertModal(event) }} className={`back-screen fixed opacity-100 z-5 inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-out duration-300`}></div>

            <div className="fixed flex max-w-96 mx-auto z-10 inset-0 overflow-y-auto min-h-fit min-w-fit items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg opacity-100 translate-y-0 sm:scale-100 ease-out duration-300`}
                >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Attention Please!</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">{modalMsg}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button onClick={() => toggleAlertModal(event)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-light-green px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green sm:mt-0 sm:w-auto">Great! Tnx</button>
                    </div>
                </div>
            </div>
        </section>
    )
}


{/* <div onClick={() => { if (isModalOpen) toggleAlertModal(event) }} className={`back-screen ${isModalOpen ? 'fixed opacity-100 z-5' : 'opacity-0'} inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-out duration-300`}></div>

            <div className="fixed flex z-10 inset-0 overflow-y-auto min-h-fit min-w-fit items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${isModalOpen
                    ? 'opacity-100 translate-y-0 sm:scale-100'
                    : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    } ease-out duration-300`}
                ></div> */}
