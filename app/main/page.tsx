'use client'

import { useAuth } from "@/components/UserContextProvider"
import EmployeeHomePage from "@/components/employeeHomePage";
import EmployerHomePage from "@/components/employerHomePage";
import { EmailGenerator, Employee } from "@/types/class.service";

export default function MainPage() {


    const { user, isLoadingAuth } = useAuth()
    if (isLoadingAuth) return (<div><p>Loading........</p></div>)
    return user instanceof Employee ? (<EmployeeHomePage employeeUser={user} />) : (
        (<EmployerHomePage />)
    )
}
