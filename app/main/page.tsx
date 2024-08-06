'use client'

import { useAuth } from "@/providers/UserContextProvider"
import { Employee, Employer } from "@/types/class.service";
import EmployeeHomePage from "@/components/employee-home-page";
import EmployerHomePage from "@/components/employer-home-page";
// import { EmployeeHomePage, EmployerHomePage } from "@/services/exports";

// Todo: Restructre this component to make it server-component - Take out the useAuth, change the conditnal rendering, move it to the layout?
// Maybe make this page a component instead of a page.tsx?
// Move the useAuth to layout? and move the user as a prop?
// User has a class - it cannot be  
export default function MainPage() {
    const { user } = useAuth<Employee | Employer>()

    return (
        user instanceof Employee ? (<EmployeeHomePage employeeUser={user} />) : user instanceof Employer && (
        (<EmployerHomePage employerUser={user} />)
    ))
}