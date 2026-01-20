'use client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useComponentUIProvider } from '@/providers/ComponentUIProvider'
import { createElement, useMemo, useState } from 'react'

export default function page() {
  const [selected, setSelected] = useState<string>()
  const elements = useComponentUIProvider()

  const element_map = useMemo(() => {
    const map = new Map()

    for (const [key, value] of Object.entries(elements)) {
      map.set(key, value)
    }

    return map
  }, [elements])

  const list = useMemo(() => {
    return Array.from(Object.entries(elements)).map(([key, _]) => key)
  }, [])

  return (
    <ResizablePanelGroup>
      <ResizablePanel defaultSize="15rem">
        <div className="w-full flex flex-col">
          <Label
            htmlFor="settings-component"
            className="w-full justify-center text-xl border-b py-5"
          >
            Components
          </Label>
          <ul id="settings-component" className="py-2">
            {list.map((item) => (
              <li key={item} className="">
                <Button
                  variant={selected === item ? 'secondary' : 'ghost'}
                  className="w-full rounded"
                  onClick={() => setSelected(item)}
                >
                  {item}&#40;&#41;
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </ResizablePanel>
      <ResizableHandle className="min-h-dvh" />
      <ResizablePanel>
        <div className="w-full min-h-dvh place-content-center">
          {element_map.get(selected) ? createElement(element_map.get(selected)) : <></>}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
