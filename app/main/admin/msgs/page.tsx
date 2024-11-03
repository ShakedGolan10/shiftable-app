'use client'
import React, { useEffect, useState } from "react";
import { Employer } from "@/types/class.service";
import { useAuth } from "@/providers/UserContextProvider";
import { useAsync } from "@/hooks/useAsync";
import { useForm } from "@/hooks/useForm";
import { Input } from "@nextui-org/react";


export default function EditEmployeesMsgs() {
    const { user } = useAuth<Employer>()
    const [ excuteAsyncFunc ] = useAsync()
    const [msgs, setMsgs] = useState<string[]>(null)
    const [inputMsgs, handleInputChange] = useForm<string[]>(undefined)
    
    
    useEffect(()=> {
        if (!user) return
        setMsgs(user.employerMsg)
    },[user])
  


    return msgs && <section>
        {msgs.map((msg, index) => (
            <Input
            isRequired
            type="text"
            // label="Email"
            defaultValue={msg}
            className="max-w-xs"
            onValueChange={(v)=> setMsgs(prev => {
                const updatedMsgs = [...prev];
                updatedMsgs[index] = v;
                return updatedMsgs;
              })}
          />
        ))}
    </section>;
  }
  