'use client'

import { useAuth } from "@/components/UserContextProvider"
import EmployeeHomePage from "@/components/employee-home-page";
import EmployerHomePage from "@/components/employer-home-page";
import LoadingElement from "@/components/loading-element";
import { Employee, Employer } from "@/types/class.service";

// Todo: Restructre this component to make it server-component - Take out the useAuth, change the conditnal rendering, move it to the layout?
// Maybe make this page a component instead of a page.tsx?
// But! -> The user eventually is brought throw a hook so..... how can I conditinally bring the user data and render on certain compopnent accordingly? 
// Watch a video on youtube!
export default function MainPage() {
    const { user, isLoadingAuth } = useAuth()

    if (isLoadingAuth) return (<div><LoadingElement /></div>)
    return user instanceof Employee ? (<EmployeeHomePage employeeUser={user} />) : user instanceof Employer && (
        (<EmployerHomePage employerUser={user} />)
    )
}