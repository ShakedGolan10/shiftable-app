'use client'

import { useAuth } from "@/providers/UserContextProvider"
import { Employee, Employer } from "@/types/class.service";
import EmployeeHomePage from "@/components/employee-home-page";
import EmployerHomePage from "@/components/employer-home-page";

export default function MainPage() {
    const { user } = useAuth<Employee | Employer>()
    
    return (
        user instanceof Employee ? (<EmployeeHomePage employeeUser={user} />) : user instanceof Employer && (
        (<EmployerHomePage />)
    ))
}