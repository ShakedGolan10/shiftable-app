import NavigationBtn from "@/components/helpers/navigation-btn";
import MainNavBar from "@/components/main-nav-bar";
import React from "react";


export default function MainRouteLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
        <MainNavBar />
        <NavigationBtn />
        <main className="container p-4 pt-20 flex flex-col items-center" style={{minHeight: "90vh", minWidth:'100%', justifyContent: 'flex-start', gap: '2vh'}}>
            {children}
        </main>
        </>
    )
}


