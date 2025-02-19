import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import { Employee, Employer } from "@/types/class.service";
import { IdentificationIcon, UserIcon, EnvelopeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
interface IEmployeeCardProps {
    user: Employee
    selectUser: (userId: string) => void
    employer: Employer
}

type BlockedShifts = {
  day: string
  shift: string
  shiftId: string
}
export default function EmployeeCard({user, selectUser, employer} : IEmployeeCardProps) {

  const blockedShifts: BlockedShifts[] = []
      Object.keys(employer.weeklyWorkflow).map(day => {
        if (blockedShifts.length === user.blockedShifts.length) return
        Object.values(employer.weeklyWorkflow[day]).forEach((shift: ShiftSlot) => {
           if (user.blockedShifts.includes(shift.shiftId)) blockedShifts.push({day, ...shift})
      })}
    )
      
   
  return (
    <Card className="max-w-fit">
        <CardHeader className="justify-between gap-5">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
              <div className="flex flex-col gap-1 items-start justify-center">
               <p className="text-small font-semibold leading-none text-default-600">{user.name}</p>
               <p className="text-small tracking-tight text-default-400">{user.email}</p>
             </div>
          </div>
            <Button
              color='primary'
              radius="full"
              size="sm"
              onPress={() => selectUser(user.id)}
            >
              Edit employee
            </Button>
        </CardHeader>
        <CardBody className="px-4 py-4 bg-default-100 text-small rounded-md shadow-md">
            <p className="text-lg font-bold text-default-900 mb-4">User Information</p>

            <p className="text-default-600 font-semibold flex items-center">
              <IdentificationIcon className="h-5 w-5 text-default-700 mr-2" />
              <span className="mr-1">ID:</span>
              <span className="font-normal text-default-900 bg-default-200 px-2 py-1 rounded-lg">{user.id}</span>
            </p>

            <p className="text-default-600 font-semibold flex items-center mt-2">
              <UserIcon className="h-5 w-5 text-default-700 mr-2" />
              <span className="mr-1">Full Name:</span>
              <span className="font-normal text-default-900 bg-default-200 px-2 py-1 rounded-lg">{user.name}</span>
            </p>

            <p className="text-default-600 font-semibold flex items-center mt-2">
              <EnvelopeIcon className="h-5 w-5 text-default-700 mr-2" />
              <span className="mr-1">Email:</span>
              <span className="font-normal text-default-900 bg-default-200 px-2 py-1 rounded-lg">{user.email}</span>
            </p>

            <p className="text-lg font-bold text-default-900 mt-4 flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
              Blocked Shifts
            </p>
            {blockedShifts.length ? (
              <article className="flex flex-col gap-1 bg-default-50 p-3 rounded-md mt-2 shadow-sm">
                {blockedShifts.map((shiftElement, idx) => (
                  <article key={idx} className="bg-default-200 px-2 py-1 rounded-md flex flex-col">
                    <div><span className="font-semibold">Day: </span> <span className="text-red">{shiftElement.day}</span></div>
                    <div><span className="font-semibold">Shift: </span> <span className="text-red">{shiftElement.shift}</span> </div>
                  </article>
                ))}
              </article>
            ) : (
              <p className="text-default-500 italic mt-2">There are no blocked shifts</p>
            )}
      </CardBody>
    </Card>
  );
}