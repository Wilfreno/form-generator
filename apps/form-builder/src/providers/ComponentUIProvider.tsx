'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createContext, JSX, ReactNode, useContext, useState } from 'react'
import { useComponentProvider } from './ComponentProvider'

type ComponentUIProviderContext = Record<string, () => JSX.Element>

export const ComponentUIProviderContext = createContext<ComponentUIProviderContext>({})

export function useComponentUIProvider() {
  return useContext(ComponentUIProviderContext)
}

export default function ComponentUIProvider({ children }: { children: ReactNode }) {
  const {} = useComponentProvider()

  function InputLabel() {
    const [input_label, setInputLabel] = useState()

    return (
      <div>
        <Label htmlFor=''>Label</Label>
        <Input />
      </div>
    )
  }

  return (
    <ComponentUIProviderContext.Provider
      value={{
        InputLabel,
      }}
    >
      {children}
    </ComponentUIProviderContext.Provider>
  )
}
