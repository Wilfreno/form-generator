import { componentsList } from '@/utils/components-list'
import { createContext, ReactNode, useContext } from 'react'

type ComponentProviderContext = {
  componentsList: string[][]
}

const ComponentProviderContext = createContext<ComponentProviderContext>({
  componentsList,
})

export function useComponentProvider() {
  return useContext(ComponentProviderContext)
}

export default function ComponentProvider({ children }: { children: ReactNode }) {
  return (
    <ComponentProviderContext.Provider value={{ componentsList }}>
      {children}
    </ComponentProviderContext.Provider>
  )
}
