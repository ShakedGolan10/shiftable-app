'use client'
import MainNavBar from "@/components/mainNavBar";
import React, { useState } from "react";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <main onClick={() => { if (isMenuOpen) onToggleMenu() }}>

            <section>
                <nav>
                    <MainNavBar onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} />
                </nav>
            </section>
            <section>{children}</section>
        </main>
    )
}


