
import { MainPageLayout } from "@/services/exports";
import React, { useState } from "react";


export default function MainLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
        <MainPageLayout children={children} /> 
        </>
    )
}


