'use client'
import { settingsUI } from '@/components/settings-modal-ui'
import { createContext, JSX, ReactNode, useContext } from 'react'
import { useComponentProvider } from './ComponentProvider'

export type ComponentUIProviderContext = Record<string, Record<string, () => JSX.Element>>

export const ComponentUIProviderContext = createContext<ComponentUIProviderContext>({
  settings: {},
})

export function useComponentUIProvider() {
  return useContext(ComponentUIProviderContext)
}

export default function ComponentUIProvider({ children }: { children: ReactNode }) {
  const {} = useComponentProvider()

  return (
    <ComponentUIProviderContext.Provider
      value={{
        Settings: settingsUI,
      }}
    >
      {children}
    </ComponentUIProviderContext.Provider>
  )
}
