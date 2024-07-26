import MainNavBar from "@/components/main-nav-bar";
import React from "react";


export default function MainRouteLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
        <MainNavBar />
        <main className="mt-24 mx-auto container p-4 flex flex-col items-center">
            {children}
        </main>
        </>
    )
}


