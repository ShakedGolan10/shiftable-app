'use client'

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";


export let queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 900000 // 15 minutes
        }
    }
});


export const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClientAttribute] = useState(queryClient)
    return (
        <QueryClientProvider client={queryClientAttribute}>
            {children}
        </QueryClientProvider>
    )
}