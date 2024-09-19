'use client'

import { toggleLoader, toggleModal } from '@/store/reducers/system.reducer'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store';

export const useSystemActions = () => {
    const dispatch = useDispatch<AppDispatch>();


    const toggleModalAction = (modalMsg?: string, isError?: boolean): any => {
        dispatch(toggleModal({modalMsg, isError}))
    }
    const toggleLoaderAction = (): any => {
        dispatch(toggleLoader())
    }

    return { toggleModalAction,toggleLoaderAction }
}

