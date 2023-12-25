'use client'
import MainNavBar from "@/components/main-nav-bar";
import React, { useState } from "react";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <main onClick={() => { if (isMenuOpen) onToggleMenu() }}>
            <MainNavBar onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} />
            <section>{children}</section>
        </main>
    )
}


