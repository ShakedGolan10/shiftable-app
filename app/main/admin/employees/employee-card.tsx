import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import { Employee, Employer } from "@/types/class.service";


interface IEmployeeCardProps {
    user: Employee
    selectUser: (userId: string) => void
    employer: Employer
}
export default function EmployeeCard({user, selectUser, employer} : IEmployeeCardProps) {

    // const blockedShifts = Object.keys(employer.weeklyWorkflow).map((day) => {
    //     const shiftsIdsArray = employer.weeklyWorkflow
    // }) 
    // In order to make it happen, Ill need to change the way weekly work flow is stored, from array in every day to keys of Ids of the shifts.
  return (
    <Card className="max-w-fit">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{user.name}</h4>
            <h5 className="text-small tracking-tight text-default-400">{user.email}</h5>
          </div>
        </div>
        <Button
          color='primary'
          radius="full"
          size="sm"
          onPress={() => selectUser(user.id)}
        >
          {`Edit ${user.name}`}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          {`Id: ${user.id}`}
        </p>
        <p>
          {`Full Name: ${user.name}`}
        </p>
        <p>
          {`Email: ${user.email}`}
        </p>
        
      </CardBody>
    </Card>
  );
}