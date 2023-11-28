'use client'
import React, { PropsWithChildren } from 'react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
const client=new QueryClient()
const ReactQueryProvider = ({children}:PropsWithChildren) => {
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider