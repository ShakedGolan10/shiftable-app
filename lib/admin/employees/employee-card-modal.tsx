'use client'

import { useForm } from "@/hooks/useForm";
import { daysOfWeek } from "@/lib/server.utils";
import { Employee } from "@/types/class.service";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Chip} from "@nextui-org/react";
import React, { useEffect, useState } from 'react'

interface IEmployeeCardProps {
  employee: Employee 
  saveEmployee: (employeeId: string, name: string, email: string, password: string) => void  
  isOpen: boolean 
  onClose: () => void
    employer: Employer
    saveBlockedShifts: (blockedShifts:string[]) => Promise<void>
}

export function EmployeeCardModal({employee, isOpen, onClose, saveEmployee, employer, saveBlockedShifts} : IEmployeeCardProps) {
    
    const [creds, handleCredChange, setFields] = useForm({email: (employee) ? employee.email : 'example@example.com', password: '', name: (employee) ? employee.name: ''})
    const [selectedDay, setSelectedDay] = useState<string>('')
    const [blockedShifts, setBlockedShifts] = useState<{day: string, shift: string, shiftId: string}[]>([])
    
    useEffect(()=>{
      setFields({email: (employee) ? employee.email : 'example@example.com', password: '', name: (employee) ? employee.name: ''})
      if (!employee) return 
      const emptyBlockedShfits = []
      const shifts = employee.blockedShifts
            Object.keys(employer.weeklyWorkflow).map(day => {
                if (!shifts || emptyBlockedShfits.length === shifts.length) return
                Object.values(employer.weeklyWorkflow[day]).forEach((shift: ShiftSlot) => {
                if (shifts.includes(shift.shiftId)) emptyBlockedShfits.push({day, ...shift})
                    })
            })
        setBlockedShifts(emptyBlockedShfits)
    },[isOpen])
    

    const handleDaySelect = async (day: string) => {
      setSelectedDay(day)
    };
  
  const handleShiftSelect = async (shiftObj: ShiftSlot) => {
      setBlockedShifts(prev => [...prev, {day: selectedDay, shift: shiftObj.shift, shiftId: shiftObj.shiftId}])
    };


    return (
      <>
        <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} className="min-w-[50vw] overflow-auto rounded-3xl">
           <ModalContent>
                 <ModalHeader className="text-small">{employee ? `Employee: ${employee.name}` : `Create new Employee`}</ModalHeader>
                 <ModalBody className="flex flex-row justify-around">
                  <section className="flex flex-col gap-2">
                        <Input
                            type="text"
                            name="name"
                            variant="faded"
                            description={employee ? 'Press to edit employee name' : 'Define new employee Name'}                            
                            value={creds.name}
                            onChange={handleCredChange}
                />
                        <Input
                            type="text"
                            variant="faded"
                            description={employee ? 'Press to edit employee Email' : 'Define new employee Email' }
                            value={creds.email}
                            name="email"
                            onChange={handleCredChange}
                />
                        <Input
                            type="password"
                            name="password"
                            variant="faded"
                            description='Press to define new password'
                            value={creds.password}
                            onChange={handleCredChange}
                />
                <Button color="success" variant="light" onClick={() => saveEmployee((employee) ? employee.id : undefined, creds.name, creds.email, creds.password)}>
                     {(employee) ? 'Save employee' : 'Create employee'}
                   </Button>
                </section>
                {employee && <section className="flex flex-col gap-2">
                  <p className="text-small">Edit {employee.name}'s blocked shifts</p>
                  <Select
                      items={daysOfWeek}
                      aria-label={`Select Day`}
                      label={`Select Day`}
                      selectionMode="single"
                      className="w-full text-xs"
                      >
                      {(dayObj) => (
                          <SelectItem
                              onClick={() => handleDaySelect(dayObj.day.toLocaleLowerCase())}    
                              className='my-1'
                              key={JSON.stringify(dayObj)}
                              textValue={dayObj?.day} 
                          >
                              {dayObj.day}
                          </SelectItem>
                          )}
                  </Select>
                  {employer.weeklyWorkflow[selectedDay]?.length ? 
                  <Select
                      items={employer.weeklyWorkflow[selectedDay]}
                      aria-label={`Select Shift`}
                      label={`Select Shift`}
                      selectionMode="single"
                      className="w-full text-xs"
                      >
                      {(shiftObj:ShiftSlot) => (
                          <SelectItem  
                              onClick={()=>handleShiftSelect(shiftObj)}  
                              className='my-1'
                              key={shiftObj.shiftId}
                              textValue={shiftObj?.shift} 
                          >
                              {shiftObj.shift}
                          </SelectItem>
                          )}
                  </Select> :
                      (selectedDay) && <p>No shifts this day</p>
                       }
                    {(blockedShifts.length) ? blockedShifts.map((shiftObj, idx) => (
                    <Chip size="sm" key={idx} onClose={() => setBlockedShifts(prev => [...prev].filter((_, index) => index !== idx))} className="text-tiny h-fit w-fit">
                        <div className="flex gap-1"><span className="font-semibold">Day: </span> <span className="text-red">{shiftObj.day}</span></div>
                        <div className="flex gap-1"><span className="font-semibold">Shift: </span> <span className="text-red">{shiftObj.shift}</span> </div>
                    </Chip>
                    )): ''}
                  <Button color="success" variant="light" onClick={() => saveBlockedShifts(blockedShifts.map(shiftObj => shiftObj.shiftId))}>
                     Save blocked shifts
                   </Button>
                </section>}
                 </ModalBody>
                   
                 
           </ModalContent>
         </Modal>
      </>
    )
}

