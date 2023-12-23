'use client'

import { useAuth } from "@/components/UserContextProvider"
import EmployeeHomePage from "@/components/employee-home-page";
import EmployerHomePage from "@/components/employer-home-page";
import LoadingElement from "@/components/loading-element";
import { Employee, Employer } from "@/types/class.service";

export default function MainPage() {
    const { user, isLoadingAuth } = useAuth()

    if (isLoadingAuth) return (<div><p><LoadingElement /></p></div>)
    return user instanceof Employee ? (<EmployeeHomePage employeeUser={user} />) : user instanceof Employer && (
        (<EmployerHomePage employerUser={user} />)
    )
}
