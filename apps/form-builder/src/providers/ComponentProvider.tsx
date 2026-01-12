'use client'
import { components_list } from '@/utils/components-list'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type ComponentProviderContext = {
  components_list: { input: string[] }
  dragged_component?: { group: keyof typeof components_list; index: number }
  setDraggedComponent: Dispatch<
    SetStateAction<
      | {
          group: keyof typeof components_list
          index: number
        }
      | undefined
    >
  >
}

const ComponentProviderContext = createContext<ComponentProviderContext>({
  components_list,
  setDraggedComponent: () => {
    return
  },
})

export function useComponentProvider() {
  return useContext(ComponentProviderContext)
}

export default function ComponentProvider({ children }: { children: ReactNode }) {
  const [dragged_component, setDraggedComponent] =
    useState<ComponentProviderContext['dragged_component']>()

  return (
    <ComponentProviderContext.Provider
      value={{ components_list, dragged_component, setDraggedComponent }}
    >
      {children}
    </ComponentProviderContext.Provider>
  )
}
