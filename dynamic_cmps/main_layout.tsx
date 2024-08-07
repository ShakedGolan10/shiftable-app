import MainNavBar from "@/components/main-nav-bar";
import React from "react";


export default function MainRouteLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
        <MainNavBar />
        <main className="container p-4 flex flex-col items-center" style={{minHeight: "90vh", minWidth:'100%', justifyContent: 'space-evenly', gap: '2vh'}}>
            {children}
        </main>
        </>
    )
}


