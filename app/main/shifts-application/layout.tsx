import React from "react";


export default function ShiftsApplicationLayout({ children }: { children: React.ReactNode }) {

// Todo: Fetch the rows and columns to the table

    return (
        <>
        <main className="mt-24 mx-auto container ">
            {children}
        </main>
        </>
    )
}