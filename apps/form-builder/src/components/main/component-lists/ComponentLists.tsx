'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ResizablePanel } from '@/components/ui/resizable'
import { useComponentProvider } from '@/providers/ComponentProvider'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function ComponentLists() {
  const { components_list, setDraggedComponent } = useComponentProvider()
  return (
    <ResizablePanel defaultSize="15dvw">
      <div className="w-full flex flex-col gap-1">
        <label
          className="text-center font-medium text-lg border-b py-5"
          htmlFor="component-lists"
        >
          Components
        </label>
        {Array.from(Object.entries(components_list)).map(([group_name, entries]) => {
          const [open, setOpen] = useState(false)

          return (
            <Collapsible key={group_name} open={open} onOpenChange={setOpen}>
              <CollapsibleTrigger className="flex  w-full p-2 justify-between group cursor-pointer">
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
                  className="p-2"
                  id="component-lists"
                  onDragOver={(e) => {
                    e.preventDefault()
                  }}
                >
                  {entries.map((entry, index) => {
                    const [is_grabbing, setIsGrabbing] = useState(false)

                    const style =
                      'text-center text-primary/80 text-sm font-medium border rounded p-2 border-primary/40'
                    return (
                      <li
                        key={entry}
                        className={style}
                        draggable
                        onDragStart={(e) => {
                          // custom drag component
                          e.dataTransfer.effectAllowed = 'move'
                          const clone = e.currentTarget.cloneNode(true) as HTMLElement
                          clone.style.opacity = '1'
                          clone.style.position = 'absolute'
                          clone.style.top = '-1000px'
                          clone.style.width = '10dvw'
                          clone.style.cursor = 'grabbing'
                          document.body.appendChild(clone)

                          e.dataTransfer.setDragImage(clone, 0, 0)

                          setTimeout(() => document.body.removeChild(clone), 0)

                          setIsGrabbing(true)
                          setDraggedComponent({
                            group: group_name as keyof typeof components_list,
                            index,
                          })
                        }}
                        onDragEnd={(e) => {
                          setIsGrabbing(false)

                          setDraggedComponent(undefined)
                        }}
                      >
                        {entry}
                      </li>
                    )
                  })}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </div>
    </ResizablePanel>
  )
}
