'use client'

import MainNavBar from "@/components/main-nav-bar";
import React, { useState } from "react";


export default function MainPageLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
        {/* border-4 rounded-3xl */}
        {/* bg-gradient-to-r from-app-blue to-app-red  */}
        <MainNavBar />
        <main className="mt-24 mx-auto container p-4">
            {children}
        </main>
        </>
    )
}


