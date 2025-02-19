'use client'
import React, { useEffect, useState } from "react";
import { Employer } from "@/types/class.service";
import { useAsync } from "@/hooks/useAsync";
import { Input, Button } from "@nextui-org/react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import GeneralTitle from "@/components/helpers/general-title";
import WithDataWrapper from "@/components/helpers/cmp-wrapper";
import { saveOneField } from "@/services/server-services/db.service";


const EditEmployeesMsgs = ({user}: {user: Employer}) => {
    const [ executeAsyncFunc ] = useAsync()
    const [msgs, setMsgs] = useState<string[]>([])
    
    
    useEffect(()=> {
        if (!user) return
        setMsgs((msgs.length) ? msgs : user.employerMsg)
    },[user])
  
    const saveMsgs = async () => {
        await executeAsyncFunc({
            asyncOps: [() => saveOneField(`users/${user.id}` , 'employerMsg', msgs)],
            errorMsg: 'Couldnt save employer messages, please try again',
            successMsg:'Your messages saved succesfuly'
        })
    }


    return msgs && 
    <section className="flex flex-col gap-8 justify-center items-center">
        <GeneralTitle title='Edit your employer messages' />
        {msgs.map((msg, index) => (
            <article key={index} className="flex flex-row gap-3">
            <Button onClick={()=> setMsgs(prev => {
                const newArray = [...prev].filter((_, idx) => idx !== index)
                return newArray
            })} 
            isIconOnly className="bg-transparent">
            <MinusCircleIcon color="red" />
            </Button>
            <Input
            isRequired
            type="text"
            variant="faded"
            description='Press to edit the msg'
            value={msg}
            className="max-w-xs"
            onValueChange={(v)=> setMsgs(prev => {
                const updatedMsgs = [...prev];
                updatedMsgs[index] = v;
                return updatedMsgs;
              })}
          />
        </article>
        ))}
        <Button onClick={()=> setMsgs(prev => [...prev, ''])} isIconOnly className="bg-transparent">
            <PlusCircleIcon />
        </Button>
        <Button onClick={saveMsgs} color="success">
            <span>Save</span>
        </Button>
    </section>;
  }
  

  const EditMsgsPage = WithDataWrapper({
    dataPromises: [],
    Component: (props) => <EditEmployeesMsgs {...props} />, 
    errorMsg: 'Couldnt load user msgs',
    loadingMsg: 'Loading msgs...'
  });

  export default EditMsgsPage