'use client'


import { ChangeEvent, useState } from "react"


type EventHandler = (event: ChangeEvent<HTMLInputElement>) => void;

export const useForm = <T>(initialState: T): [T, EventHandler, (fields: T) => void] => {

    const [fields, setFields] = useState<T>(initialState)

    const handleInputChange: EventHandler = ({ target }: any) => {
        let { value, name: field, type, checked } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = checked
            default:
                break;
        }
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }


    return [fields, handleInputChange, setFields]


}