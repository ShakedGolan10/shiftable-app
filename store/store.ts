'use client'

import { configureStore } from '@reduxjs/toolkit'
import systemReducer from './reducers/system.reducer'
import { TypedUseSelectorHook, useSelector } from 'react-redux'






export const store = configureStore({
    reducer: {
        systemReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector