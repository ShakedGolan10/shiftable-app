'use client'
import React, { useEffect, useState } from "react";
import { Employer } from "@/types/class.service";
import { useAuth } from "@/providers/UserContextProvider";
import { useAsync } from "@/hooks/useAsync";
import { Input, Button } from "@nextui-org/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";


export default function EditEmployeesMsgs() {
    const { user } = useAuth<Employer>()
    const [ excuteAsyncFunc ] = useAsync()
    const [msgs, setMsgs] = useState<string[]>(null)
    
    
    useEffect(()=> {
        if (!user) return
        setMsgs(user.employerMsg)
    },[user])
  


    return msgs && <section className="flex flex-col gap-8 justify-center items-center">
        {msgs.map((msg, index) => (
            <Input
            // size="lg"
            key={index}
            isRequired
            type="text"
            variant="faded"
            description='Press to edit the msg'
            defaultValue={msg}
            className="max-w-xs"
            onValueChange={(v)=> setMsgs(prev => {
                const updatedMsgs = [...prev];
                updatedMsgs[index] = v;
                return updatedMsgs;
              })}
          />
        ))}
        <Button onClick={()=> setMsgs(prev => [...prev, ''])} isIconOnly className="bg-transparent">
            <PlusCircleIcon />
        </Button>
    </section>;
  }
  