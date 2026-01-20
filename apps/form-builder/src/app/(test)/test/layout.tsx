'use client'
import ComponentUIProvider from '@/providers/ComponentUIProvider'
import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return <ComponentUIProvider>{children}</ComponentUIProvider>
}
