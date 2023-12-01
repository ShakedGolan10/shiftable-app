'use client'

import { toggleModal } from '@/store/reducers/system.reducer'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store';

export const useSystemActions = () => {
    const dispatch = useDispatch<AppDispatch>();


    const toggleModalAction = (modalMsg?: string): any => {
        dispatch(toggleModal(modalMsg))
    }

    return { toggleModalAction }
}

