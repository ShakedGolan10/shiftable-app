
import { MainRouteLayout } from "@/services/exports";
import React from "react";


export default function MainLayout({ children }: { children: React.ReactNode }) {

    return (
        <MainRouteLayout children={children} />
    )
}


