'use client'
import MainNavBar from "@/components/main-nav-bar";
import { useAuth } from "@/providers/UserContextProvider";
import { MainPageLayout } from "@/services/exports";
import { ChildProps } from "postcss";
import React, { useState } from "react";


export default function MainLayout({ children }: { children: React.ReactNode }) {
    // Pass props only to the first child

    const { user, isLoadingAuth } = useAuth()
    const childrenArray = React.Children.toArray(children);

  // Clone the first child and pass props to it
  const childrenWithProps = childrenArray.map((child, index) => {
    if (React.isValidElement<ChildProps>(child) && index === 0) {
        console.log('user', user)
      return React.cloneElement<ChildProps>(child, {value: user} ) 
    }
    return child;
  });

    return (
        <>
        {/* border-4 rounded-3xl */}
        {/* bg-gradient-to-r from-app-blue to-app-red  */}
        <MainNavBar />
        <main className="mt-24 mx-auto container p-4">
            {user && childrenWithProps as React.ReactNode}
        </main>
        </>
    )
    
}


