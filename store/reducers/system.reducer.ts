'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    modal: {
        isModalOpen: false,
        modalMsg: ''
    }
}

export const system = createSlice({
    name: 'system',
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<string>) => {
            return { modal: { isModalOpen: !state.modal.isModalOpen, modalMsg: action.payload } }
        },

    }
})

export const { toggleModal } = system.actions
export default system.reducer