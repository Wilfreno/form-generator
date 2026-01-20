'use client'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useComponentUIProvider } from '@/providers/ComponentUIProvider'
import { CollapsibleContent } from '@radix-ui/react-collapsible'
import { ChevronDown, ChevronRight, Form, Home } from 'lucide-react'
import Link from 'next/link'
import { createElement, useMemo, useState } from 'react'

export default function page() {
  const [selected, setSelected] = useState<string>()
  const elementsList = useComponentUIProvider()

  const element_map = useMemo(() => {
    const map = new Map()

    for (const [groupName, entries] of Object.entries(elementsList)) {
      for (const [elementName, component] of Object.entries(entries))
        map.set(`${groupName}-${elementName}`, component)
    }

    return map
  }, [elementsList])

  const list = useMemo(() => {
    const entries: Record<string, string[]> = {}

    for (const [key, value] of Object.entries(elementsList)) {
      entries[key] = Object.entries(value).map(([key, _]) => key)
    }
    return entries
  }, [])

  return (
    <ResizablePanelGroup>
      <ResizablePanel defaultSize="15rem ">
        <div className="w-full flex flex-col  h-full gap-1">
          <Label
            htmlFor="settings-component"
            className="w-full justify-center text-xl border-b py-5"
          >
            Components
          </Label>
          <ScrollArea className="h-[85dvh]">
            {Array.from(Object.entries(list)).map(([group_name, entries], index) => {
              const [open, setOpen] = useState(false)

              return (
                <Collapsible key={group_name} open={open} onOpenChange={setOpen}>
                  <CollapsibleTrigger
                    className={cn(
                      'flex w-full p-2 justify-between group cursor-pointer',
                      index > 0 && 'border-t',
                    )}
                  >
                    <span> {group_name}</span>
                    <span className="aspect-square h-1px w-auto group-hover:bg-muted rounded-md">
                      {open ? (
                        <ChevronDown className="h-full w-full" />
                      ) : (
                        <ChevronRight className="h-full w-full" />
                      )}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul
                      id="component-lists"
                      onDragOver={(e) => {
                        e.preventDefault()
                      }}
                    >
                      {entries.map((entry) => (
                        <li key={entry}>
                          <Button
                            onClick={() => setSelected(`${group_name}-${entry}`)}
                            variant="ghost"
                            className="cursor-pointer w-full rounded-none"
                          >
                            {entry}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </ScrollArea>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="bg-secondary rounded-full p-2 mt-auto ml-auto m-5 hover:bg-primary group"
              >
                <Form className="aspect-square h-5 w-auto group-hover:text-secondary" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <span>Form Builder</span>
            </TooltipContent>
          </Tooltip>
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
