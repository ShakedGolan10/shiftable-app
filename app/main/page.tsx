'use client'

import { useAuth } from "@/components/UserContextProvider"
import EmployerMsg from "@/components/employerMsg";
import { EmailGenerator } from "@/types/class.service";

export default function MainPage() {


    const { user } = useAuth()
    let emails = new EmailGenerator('elena', 'gurevich', null, 'abra web')


    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            {/* <h1>Hi {user.username}</h1> */}
            <h4>Your shift today :</h4>
            <h4>Remmeber to apply shifts before {/*user.employer.applyDay*/}</h4>
            <section>
                <EmployerMsg />
            </section>
            {emails.emailList.map((email) => <span key={+email}>{email}</span>)}
        </main>
    )
}
