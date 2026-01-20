'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useComponentProvider } from '@/providers/ComponentProvider'
import { ChevronDown, ChevronRight, FlaskConical } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ComponentLists() {
  const { components_list, setDraggedComponent } = useComponentProvider()
  return (
    <div className="grid min-h-dvh w-[15dvw] shadow-md">
      <div className="fixed w-[15dvw] h-full flex flex-col gap-1 ">
        <label
          className="text-center w-full border-b p-5 font-medium text-lg"
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/test/component-settings-ui"
              className="bg-secondary rounded-full p-2 mt-auto ml-auto m-5 hover:bg-primary group"
            >
              <FlaskConical className="aspect-square h-5 w-auto group-hover:text-secondary" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <span>Test Component UI</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
