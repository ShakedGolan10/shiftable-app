'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    modal: {
        isModalOpen: false,
        modalMsg: '', 
        isError: false
    }
}

interface ToggleModalPayload {
    modalMsg: string
    isError: boolean
}

export const system = createSlice({
    name: 'system',
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<ToggleModalPayload>) => {
            return { modal: { isModalOpen: !state.modal.isModalOpen, modalMsg: action.payload.modalMsg, isError: action.payload.isError } }
        },

    }
})

export const { toggleModal } = system.actions
export default system.reducer