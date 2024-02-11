'use client'

import MainNavBar from "@/components/main-nav-bar";
import React, { useState } from "react";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
        <MainNavBar onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} />
        <main className="mt-24 mx-auto container p-4 bg-gradient-to-r from-app-blue to-app-red border-4 rounded-3xl" onClick={() => { if (isMenuOpen) onToggleMenu() }}>
            {children}
        </main>
        </>
    )
}


