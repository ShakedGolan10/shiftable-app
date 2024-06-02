'use client'


import { Employee, Employer } from "@/types/class.service";
import EmployeeHomePage from "@/components/employee-home-page";
import EmployerHomePage from "@/components/employer-home-page";
// import { EmployeeHomePage, EmployerHomePage } from "@/services/exports";

// Todo: Restructre this component to make it server-component - Take out the useAuth, change the conditnal rendering, move it to the layout?
// Maybe make this page a component instead of a page.tsx?
// Move the useAuth to layout? and move the user as a prop?
// But! -> The user eventually is brought throw a hook so..... how can I conditinally bring the user data and render on certain compopnent accordingly? 
// Watch a video on youtube!
export default function MainPage(user: Employee | Employer) {
console.log('hiiiiiiiiiiiiii', user)
    return (
        user instanceof Employee ? (<EmployeeHomePage employeeUser={user} />) : user instanceof Employer && (
        (<EmployerHomePage employerUser={user} />)
    ))
}